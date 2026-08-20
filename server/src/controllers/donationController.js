/**
 * Donation Controller
 * Handles donation creation, payment gateway verification, and financial reporting
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const crypto = require('crypto');

/**
 * POST /api/donations/create (Public)
 * Creates a donation record and returns payment order info
 */
async function createDonation(req, res, next) {
  try {
    const { donor_name, email, phone, amount, currency = 'INR', purpose = 'general' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid donation amount' });
    }

    // Insert pending donation record
    const result = await query(
      `INSERT INTO donations (donor_name, email, phone, amount, currency, purpose, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [donor_name, email, phone || null, amount, currency, purpose]
    );

    const donationId = result.insertId;
    let gatewayOrderId = `order_mock_${donationId}_${Date.now()}`;

    // Razorpay Integration (if keys are provided in env)
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const Razorpay = require('razorpay');
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const order = await instance.orders.create({
          amount: Math.round(amount * 100), // Amount in paise
          currency: currency || 'INR',
          receipt: `tcong_donation_${donationId}`,
          notes: { donor_name, purpose }
        });

        gatewayOrderId = order.id;
      } catch (rzpErr) {
        console.error('Razorpay Order Creation Warning:', rzpErr.message);
      }
    }

    // Save gateway order ID
    await query('UPDATE donations SET gateway_order_id = ? WHERE id = ?', [gatewayOrderId, donationId]);

    return created(res, {
      donation_id: donationId,
      order_id: gatewayOrderId,
      amount,
      currency,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock'
    }, 'Donation initiated');

  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/donations/verify (Public)
 * Verifies Razorpay payment signature
 */
async function verifyDonation(req, res, next) {
  try {
    const { donation_id, gateway_payment_id, gateway_order_id, gateway_signature } = req.body;

    const donations = await query('SELECT * FROM donations WHERE id = ?', [donation_id]);
    if (donations.length === 0) {
      return notFound(res, 'Donation record not found');
    }

    let isValid = true;

    // Verify HMAC signature if Razorpay Secret is available
    if (process.env.RAZORPAY_KEY_SECRET && gateway_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${gateway_order_id}|${gateway_payment_id}`)
        .digest('hex');

      isValid = generatedSignature === gateway_signature;
    }

    const status = isValid ? 'success' : 'failed';

    // Update donation status
    await query(
      `UPDATE donations SET gateway_payment_id = ?, gateway_signature = ?, payment_status = ? WHERE id = ?`,
      [gateway_payment_id || null, gateway_signature || null, status, donation_id]
    );

    // Record transaction audit
    await query(
      `INSERT INTO payment_transactions (donation_id, gateway, transaction_id, amount, status, raw_response)
       VALUES (?, 'razorpay', ?, ?, ?, ?)`,
      [donation_id, gateway_payment_id || 'mock_tx', donations[0].amount, status, JSON.stringify(req.body)]
    );

    // Create admin notification
    if (isValid) {
      try {
        await query(
          `INSERT INTO notifications (type, title, message, data)
           VALUES ('donation', 'New Donation Received', ?, ?)`,
          [
            `Received ₹${donations[0].amount} from ${donations[0].donor_name} (${donations[0].purpose})`,
            JSON.stringify({ donation_id, amount: donations[0].amount })
          ]
        );
      } catch (e) {}
    }

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    return success(res, { donation_id, status: 'success' }, 'Donation completed successfully. Thank you for your generosity!');

  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/donations (Admin — Authorized Only)
 */
async function getAdminDonations(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, purpose, search } = req.query;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status) {
      whereClause += " AND d.payment_status = ?";
      params.push(status);
    }
    if (purpose) {
      whereClause += " AND d.purpose = ?";
      params.push(purpose);
    }
    if (search) {
      whereClause += " AND (d.donor_name LIKE ? OR d.email LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM donations d ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    // Get total sum for success donations
    const sumResult = await query("SELECT SUM(amount) as total_amount FROM donations WHERE payment_status = 'success'");
    const totalDonationsAmount = sumResult[0]?.total_amount || 0;

    const sql = `
      SELECT d.* FROM donations d
      ${whereClause}
      ORDER BY d.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const donations = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return res.status(200).json({
      success: true,
      message: 'Donations fetched',
      data: donations,
      summary: {
        total_amount_collected: totalDonationsAmount
      },
      pagination
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDonation,
  verifyDonation,
  getAdminDonations
};
