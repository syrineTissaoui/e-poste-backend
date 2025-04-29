const express = require('express');
const router = express.Router();
const Livreur = require('../models/livreur.js'); // 
const Utilisateur = require('../models/utilisateur'); // Important pour chercher les utilisateurs ayant le rôle "livreur"

// Route GET pour récupérer les meilleurs livreurs
router.get('/top', async (req, res) => {
  try {
    const topLivreurs = await Livreur.find().sort({ averageRating: -1 }).limit(3);
    res.json(topLivreurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des meilleurs livreurs", error });
  }
});

//  Route GET pour récupérer tous les utilisateurs ayant le rôle "livreur"
// (utile dans ton interface d'affectation côté admin)
router.get('/', async (req, res) => {
  try {
    const livreurs = await Utilisateur.find({ role: 'livreur' });
    res.status(200).json(livreurs);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des livreurs", err });
  }
});

module.exports = router;

