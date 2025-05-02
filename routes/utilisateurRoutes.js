const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurController');

// Routes pour la gestion des utilisateurs (Admin)
router.get('/', utilisateurCtrl.getUtilisateurs);
router.post('/', utilisateurCtrl.ajouterUtilisateur);
router.get('/get-clients', utilisateurCtrl.getClient);
router.get('/get-livreurs', utilisateurCtrl.getLivreurs);

router.put('/:id', utilisateurCtrl.modifierUtilisateur);
router.delete('/:id', utilisateurCtrl.supprimerUtilisateur);
router.get('/:id', utilisateurCtrl.getUtilisateurById);
module.exports = router;

