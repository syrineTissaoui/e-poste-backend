const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploads')
const authController = require('../controllers/authController');
const User = require('../models/utilisateur');
const sendResetEmail = require('../middlewares/sendemailReset');
const bcrypt = require('bcryptjs');
// Inscription 
router.post('/signup',upload.single('image'), authController.signup);

// Connexion 
router.get('/me', verifyToken, authController.getCurrentUser);
router.post('/login', authController.login);

router.get('/logout', authController.logoutUser);

const jwt = require('jsonwebtoken');

// Exemple avec token sécurisé + sauvegarde dans base
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

  try {
    await sendResetEmail(email, resetLink);
    res.json({ message: 'Email envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur envoi email :', error);
    res.status(500).json({ message: "Échec d'envoi de l'email." });
  }
});
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    // vérifier date d'expiration si stockée
    // if (user.resetToken !== token || user.resetTokenExpiry < Date.now()) ...

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Lien invalide ou expiré" });
  }
});

module.exports = router;
