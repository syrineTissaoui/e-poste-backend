const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurController');
const User = require('../models/utilisateur');

// Routes pour la gestion des utilisateurs (Admin)
router.get('/', utilisateurCtrl.getUtilisateurs);
router.post('/', utilisateurCtrl.ajouterUtilisateur);
router.get('/get-clients', utilisateurCtrl.getClient);
router.get('/get-livreurs', utilisateurCtrl.getLivreurs);

router.put('/:id', utilisateurCtrl.modifierUtilisateur);
router.delete('/:id', utilisateurCtrl.supprimerUtilisateur);
router.get('/:id', utilisateurCtrl.getUtilisateurById);
// PUT /api/users/:id/preferences
router.put('/:id/preferences', async (req, res) => {
  const { email } = req.body;
console.log('email',email)
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { notificationPreferences: { email } },
    { new: true }
  );

  res.json({ message: "Préférences mises à jour", preferences: updated.notificationPreferences });
});

module.exports = router;

