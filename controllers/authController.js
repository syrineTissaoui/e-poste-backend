const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateur'); 
const JWT_SECRET = process.env.JWT_SECRET;

// Inscription
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, codePostal, password } = req.body
    const imageFile = req.file // the uploaded file from multer

    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      nom: name,
      email,
      phone,
      codePostal,
      password: hashedPassword,
      image: imageFile?.filename || '', // save image file name (or URL if uploaded to cloud)
      role: 'client',
      statut: 'actif',
    })

    await newUser.save()

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur lors de l'inscription." })
  }
}

//  Connexion
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      utilisateur: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statut: user.statut,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
exports.getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  res.json({ user: req.user })
}

exports.logoutUser = (req, res) => {
  // If you're using cookies with JWT
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  return res.json({ message: 'Logged out successfully' })
}