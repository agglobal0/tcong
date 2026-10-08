/**
 * Dashboard & Analytics Controller
 * Aggregates statistics, charts data, and notification streams for admin panel
 */
const { query } = require('../config/database');
const { success } = require('../utils/responseHandler');

/**
 * GET /api/admin/dashboard
 */
async function getDashboardData(req, res, next) {
  try {
    // Safe query wrapper helper
    const safeQuery = async (sql, params = [], fallback = []) => {
      try {
        return await query(sql, params);
      } catch (err) {
        console.warn(`Dashboard query fallback triggered for: ${sql}`, err.message);
        return fallback;
      }
    };

    // 1. Total & New Prayer Requests (General vs Lay Hand)
    const layHandTotal = await safeQuery("SELECT COUNT(*) as cnt FROM prayer_requests WHERE type = 'lay_hand' OR request_text LIKE '%[LAYING ON OF HANDS REQUEST]%'", [], [{ cnt: 0 }]);
    const layHandPending = await safeQuery("SELECT COUNT(*) as cnt FROM prayer_requests WHERE (type = 'lay_hand' OR request_text LIKE '%[LAYING ON OF HANDS REQUEST]%') AND (status = 'new' OR status = 'pending')", [], [{ cnt: 0 }]);
    
    const generalPrayerTotal = await safeQuery("SELECT COUNT(*) as cnt FROM prayer_requests WHERE (type IS NULL OR type != 'lay_hand') AND (request_text NOT LIKE '%[LAYING ON OF HANDS REQUEST]%')", [], [{ cnt: 0 }]);
    const generalPrayerPending = await safeQuery("SELECT COUNT(*) as cnt FROM prayer_requests WHERE (type IS NULL OR type != 'lay_hand') AND (request_text NOT LIKE '%[LAYING ON OF HANDS REQUEST]%') AND (status = 'new' OR status = 'pending')", [], [{ cnt: 0 }]);

    // 2. Upcoming Events
    const eventsUpcoming = await safeQuery("SELECT COUNT(*) as cnt FROM events WHERE status = 'published'", [], [{ cnt: 0 }]);

    // 3. Published Blogs
    const blogsPublished = await safeQuery("SELECT COUNT(*) as cnt FROM blogs WHERE status = 'published'", [], [{ cnt: 0 }]);

    // 4. Published Sermons
    const sermonsPublished = await safeQuery("SELECT COUNT(*) as cnt FROM sermons WHERE status = 'published'", [], [{ cnt: 0 }]);

    // 5. Testimonials
    const testimonialsCount = await safeQuery("SELECT COUNT(*) as cnt FROM testimonials WHERE status = 'published'", [], [{ cnt: 0 }]);

    // 6. Gallery Images
    const galleryCount = await safeQuery('SELECT COUNT(*) as cnt FROM gallery_images', [], [{ cnt: 0 }]);

    // 7. Donation Amount Total & Monthly Breakdown for Chart
    const donationTotal = await safeQuery("SELECT SUM(amount) as sum FROM donations WHERE payment_status = 'success' OR status = 'completed'", [], [{ sum: 0 }]);

    const monthlyDonations = await safeQuery(
      `SELECT DATE_FORMAT(created_at, '%b') as month_name, MONTH(created_at) as month_num, SUM(amount) as total
       FROM donations
       WHERE payment_status = 'success' OR status = 'completed'
       GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
       ORDER BY month_num ASC`,
      [],
      []
    );

    // 8. Unread Contact Messages
    const messagesUnread = await safeQuery('SELECT COUNT(*) as cnt FROM contact_messages WHERE is_read = 0 AND is_archived = 0', [], [{ cnt: 0 }]);

    // 9. Recent Activity
    const recentActivity = await safeQuery(
      `SELECT al.*, CONCAT(COALESCE(u.first_name, 'User'), ' ', COALESCE(u.last_name, '')) as user_name
       FROM activity_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT 10`,
      [],
      []
    );

    // 10. Notifications count
    const unreadNotifications = await safeQuery('SELECT COUNT(*) as cnt FROM notifications WHERE is_read = 0', [], [{ cnt: 0 }]);

    const totalDonationsVal = donationTotal[0]?.sum || 0;
    const pendingPrayersVal = generalPrayerPending[0]?.cnt || 0;
    const pendingLayHandVal = layHandPending[0]?.cnt || 0;
    const totalBlogsVal = blogsPublished[0]?.cnt || 0;
    const unreadMessagesVal = messagesUnread[0]?.cnt || 0;

    return success(res, {
      stats: {
        total_donations: totalDonationsVal,
        donation_amount: totalDonationsVal,
        pending_prayers: pendingPrayersVal,
        new_prayer_requests: pendingPrayersVal,
        total_prayer_requests: generalPrayerTotal[0]?.cnt || 0,
        pending_lay_hand: pendingLayHandVal,
        total_lay_hand: layHandTotal[0]?.cnt || 0,
        upcoming_events: eventsUpcoming[0]?.cnt || 0,
        total_blogs: totalBlogsVal,
        published_blogs: totalBlogsVal,
        published_sermons: sermonsPublished[0]?.cnt || 0,
        published_testimonials: testimonialsCount[0]?.cnt || 0,
        gallery_images: galleryCount[0]?.cnt || 0,
        unread_messages: unreadMessagesVal,
        unread_notifications: unreadNotifications[0]?.cnt || 0
      },
      chart_data: monthlyDonations,
      recent_activity: recentActivity
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/notifications
 */
async function getNotifications(req, res, next) {
  try {
    const notifications = await query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 20');
    return success(res, notifications);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/notifications/:id
 */
async function markNotificationRead(req, res, next) {
  try {
    const { id } = req.params;
    await query('UPDATE notifications SET is_read = 1 WHERE id = ?', [id]);
    return success(res, null, 'Notification marked as read');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/activity-logs
 */
async function getActivityLogs(req, res, next) {
  try {
    const logs = await query(
      `SELECT al.*, CONCAT(u.first_name, ' ', u.last_name) as user_name, u.email as user_email
       FROM activity_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT 100`
    );
    return success(res, logs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboardData,
  getNotifications,
  markNotificationRead,
  getActivityLogs
};
