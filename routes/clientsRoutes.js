

const express = require('express');
const router = express.Router();
const clientcontroller = require('../controllers/clientcontroller');

// Ajouter un nouveau client
router.post('/', clientcontroller.ajouterClient);

//Récupérer tous les clients
router.get('/', clientcontroller.getClients);

//Récupérer un client par ID
router.get('/:id', clientcontroller.getClientById);

// Modifier un client
router.put('/:id', clientcontroller.modifierClient);

//Supprimer un client
router.delete('/:id', clientcontroller.supprimerClient);

module.exports = router;
