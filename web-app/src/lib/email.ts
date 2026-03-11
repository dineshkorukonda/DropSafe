import "server-only";

import nodemailer from "nodemailer";

const appUrl = process.env.APP_URL ?? "http://localhost:3000";

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const transport = getTransport();

  if (!transport) {
    console.info("Email transport not configured. Message preview:", {
      to: input.to,
      subject: input.subject,
      text: input.text,
    });
    return { delivered: false };
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM ?? "DropSafe <no-reply@dropsafe.app>",
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  return { delivered: true };
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${appUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;

  return sendEmail({
    to: email,
    subject: "Verify your DropSafe account",
    text: `Verify your DropSafe account: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b">
        <h2>Verify your DropSafe account</h2>
        <p>Confirm your email to activate sign-in and continue onboarding.</p>
        <p><a href="${verificationUrl}" style="display:inline-block;padding:12px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:12px">Verify email</a></p>
        <p>If the button does not work, open this link:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${appUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;

  return sendEmail({
    to: email,
    subject: "Reset your DropSafe password",
    text: `Reset your DropSafe password: ${resetUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b">
        <h2>Reset your password</h2>
        <p>Use the link below to choose a new password for your DropSafe account.</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:12px">Reset password</a></p>
        <p>If the button does not work, open this link:</p>
        <p>${resetUrl}</p>
      </div>
    `,
  });
}
