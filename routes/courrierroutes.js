const express = require('express');
const router = express.Router(); 
const courriercontroller = require('../controllers/courriercontroller');

// Ajouter un courrier
router.post('/envoyer', courriercontroller.ajouterCourrier);

// Obtenir tous les courriers
router.get('/', courriercontroller.getAllCourriers);
router.get('/get',courriercontroller.getAllCourrierClient);


// Obtenir un courrier par ID
router.get('/:id', courriercontroller.getCourrierById);

// Modifier un courrier
router.put('/:id', courriercontroller.updateCourrier);

// Supprimer un courrier
router.delete('/:id', courriercontroller.deleteCourrier);

// Affecter un livreur
router.put('/affecter/:id', courriercontroller.affecterCourrier);

module.exports = router;
