const express = require('express');
const router = express.Router();
const coliscontroller = require('../controllers/coliscontroller');

// Envoyer un nouveau colis
router.post('/envoyer', coliscontroller.envoyerColis);

// Récupérer tous les colis
router.get('/', coliscontroller.getAllColis);

// Récupérer un colis par ID
router.get('/:id', coliscontroller.getColisById);

// Modifier un colis
router.put('/:id', coliscontroller.updateColis);

// Supprimer un colis
router.delete('/:id', coliscontroller.deleteColis);

// Affecter un livreur à un colis
router.put('/affecter/:id', coliscontroller.affecterColis);

module.exports = router;

