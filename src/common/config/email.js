import nodemailer from "nodemailer"

// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider

//  Create the "delivery truck" (transporter)
// This connects to your email post office (SMTP server)
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // WHERE is the post office?
  port:  Number(process.env.SMTP_PORT) || 587, // WHICH door of post office?
  // secure: false,   // HOW to enter the door?
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

// const sendVerificationEmail = async (email, token) => {
//   const url = `${process.env.CLIENT_URL}api/auth/verify-email?token=${token}`;
//   await sendEmail(
//     email,
//     "Verify your email",
//     // `<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`,
//     <a href="http://127.0.0.1:4000/auth/verify-email?token=abc123" target="_blank">
//   Verify Email
// </a>
//   );
// };

const sendVerificationEmail = async (email, token) => {
  const url = `http://127.0.0.1:4000/auth/verify-email?token=${token}`;

  await sendEmail(
    email,
    "Verify your email",
    `
      <h2>Welcome!</h2>
      <p>Click below to verify your email:</p>
      <a href="${url}" target="_blank">Verify Email</a>
    `
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

const sendOrderConformationEmail = async (email, order) => {
  const items = order.items.map((item)=>`<li>${item.title} x${item.quantity} -₹${item.price} </li>`).join("");
  await sendEmail(
    email,
    `order confirmed - ${order.orderNumber}`,
    `<h2>>Order Confirmed!</h2>
     <p>Order: ${order.orderNumber}</p>
     <ul>${items}</ul>
     <p><strong>Total: ₹${order.totalAmount}</strong></p>`,
  )
}


export { sendVerificationEmail, sendResetPasswordEmail , sendOrderConformationEmail};