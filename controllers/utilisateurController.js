const Utilisateur = require('../models/utilisateur');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Connexion
exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (utilisateur.statut === 'inactif') {
      return res.status(403).json({ message: 'Compte inactif, veuillez contacter l’administrateur' });
    }

    const estValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!estValide) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role },
      process.env.JWT_SECRET || 'SECRET123',
      { expiresIn: '1d' }
    );

    const { motDePasse, ...safeUser } = utilisateur._doc;
    res.json({ token, utilisateur: safeUser });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

// Tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter un utilisateur
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
    const newUser = new Utilisateur({ ...req.body, motDePasse: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Modifier
exports.modifierUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer
exports.supprimerUtilisateur = async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Par ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Livreurs uniquement
exports.getLivreurs = async (req, res) => {
  try {
    const livreurs = await Utilisateur.find({ role: 'livreur' });
    res.json(livreurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
