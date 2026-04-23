import nodemailer from 'nodemailer';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for email sending`);
  }
  return value;
}

export function createMailer() {
  return nodemailer.createTransport({
    host: required('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: required('SMTP_USER'),
      pass: required('SMTP_PASS')
    }
  });
}

export async function sendManagedEmail({ to, subject, html }) {
  const mailer = createMailer();
  return mailer.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html
  });
}

export async function sendBulkEmail({ recipients, subject, html }) {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return { accepted: 0, failed: 0 };
  }

  const mailer = createMailer();
  const chunks = [];
  for (let i = 0; i < recipients.length; i += 50) {
    chunks.push(recipients.slice(i, i + 50));
  }

  let accepted = 0;
  let failed = 0;

  for (const batch of chunks) {
    const result = await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      bcc: batch,
      subject,
      html
    });

    accepted += result.accepted?.length || 0;
    failed += result.rejected?.length || 0;
  }

  return { accepted, failed };
}
