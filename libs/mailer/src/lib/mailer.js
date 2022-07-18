import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @typedef {Object} MailerOptions
 * @property {string} to The email address to send the email to
 * @property {string} subject The subject of the email
 * @property {string} text The text of the email
 * @property {string} html The html of the email
 */

/**
 * @description Sends an email
 * @param {MailerOptions} param
 * @returns {Promise<void>}
 */
export async function sendMail({ to, subject, text, html }) {
  return sgMail.send({
    to,
    from: '3kezoh@gmail.com',
    subject,
    text,
    html,
  });
}
