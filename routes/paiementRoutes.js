const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementscontroller'); 

// Ajouter un paiement
router.post('/ajouter', paiementController.ajouterPaiement);

// Obtenir tous les paiements
router.get('/', paiementController.getAllPaiements);

// Supprimer un paiement
router.delete('/:id', paiementController.deletePaiement);

// Signaler un problème
router.post('/probleme/:id', paiementController.signalerProbleme);

// Marquer comme résolu
router.put('/resoudre/:id', paiementController.marquerCommeResolue);

module.exports = router;
