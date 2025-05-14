// utils/sendResetEmail.js
const nodemailer = require("nodemailer");

const sendResetEmail = async (to, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"E-Poste" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Notification - Livraison confirmée",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #f59e0b;">📦 Votre colis est livré</h2>
        <p>${message}</p>
        <p style="color: #999;">Merci de faire confiance à E-Poste.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
