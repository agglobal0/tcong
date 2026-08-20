/**
 * Nodemailer Email Configuration
 */
const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return transporter;
}

/**
 * Send an email
 * @param {Object} options - { to, subject, html, text }
 */
async function sendEmail({ to, subject, html, text }) {
  try {
    const info = await getTransporter().sendMail({
      from: process.env.EMAIL_FROM || '"TCONG" <noreply@tcong.org>',
      to,
      subject,
      html,
      text
    });
    console.log('📧 Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    // Don't throw — email failure shouldn't crash the request
    return null;
  }
}

module.exports = { getTransporter, sendEmail };
