import nodemailer from "nodemailer"

// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider

//  Create the "delivery truck" (transporter)
// This connects to your email post office (SMTP server)
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // WHERE is the post office?
  port: 587,  // WHICH door of post office?
  secure: false,   // HOW to enter the door?
  auth: {
    user: process.env.SMTP_USER,  // WHO are you?
    pass: process.env.SMTP_PASS, // WHAT is your password?
  }
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendEmail(
    email,
    "Verify your email",
    `<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`,
  );
};
const sendResetPasswordEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`
  await sendEmail(
    email,
    "reset your password",
    `<h2>Password Reset</h2><p>click <a href="${url}"> here</a> to reset your password. This link expires in 15 minutes.</p>`,
  )
}


export { sendVerificationEmail, sendResetPasswordEmail };