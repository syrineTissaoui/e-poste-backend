const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads')
const authController = require('../controllers/authController');

// Inscription 
router.post('/signup',upload.single('image'), authController.signup);

// Connexion 
router.get('/me', authController.getCurrentUser);
router.post('/login', authController.login);

router.get('/logout', authController.logoutUser);

module.exports = router;
