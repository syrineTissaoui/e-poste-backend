const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateur'); 
const JWT_SECRET = process.env.JWT_SECRET;

// Inscription
exports.signup = async (req, res) => {
  try {
    console.log('req.body',v=req.body);
    
    const { nom, email, phone, codePostal, password , role } = req.body
    const imageFile = req.file // the uploaded file from multer
    console.log("imageFile?.filename",imageFile?.filename)
    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      nom: nom,
      email,
      phone,
      codePostal,
      password: hashedPassword,
      image: imageFile?.filename || '', // save image file name (or URL if uploaded to cloud)
      role: role,
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Mot de passe manquant dans le compte utilisateur." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
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
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclure le mot de passe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur dans /me :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.logoutUser = (req, res) => {
  // If you're using cookies with JWT
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  return res.json({ message: 'Logged out successfully' })
}