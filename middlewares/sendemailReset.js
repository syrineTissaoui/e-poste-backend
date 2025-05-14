// utils/sendResetEmail.js
const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"E-Poste" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Réinitialisation du mot de passe",
    html: `
      <h2>Réinitialisation de votre mot de passe</h2>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="${resetLink}" style="padding:10px 20px; background:#f59e0b; color:#fff; text-decoration:none;">Réinitialiser</a>
      <p>Ce lien expirera dans 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
