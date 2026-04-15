import nodemailer from "nodemailer"


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

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_EMAIL}`,
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async (email, token) => {
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_EMAIL}`,
    email,
    subject,
    html,
  });
};


export { sendMail, sendVerificationEmail };