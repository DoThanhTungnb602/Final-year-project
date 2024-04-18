import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const html = `
    <h1>Reset your password</h1>
    <p>Click the link below to reset your password.</p>
    <a href="${resetLink}">Reset password</a>
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verification?token=${token}`;

  const html = `
    <h1>Verify your email</h1>
    <p>Click the link below to verify your email address.</p>
    <a href="${confirmLink}">Verify email</a>
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html,
  });
};
