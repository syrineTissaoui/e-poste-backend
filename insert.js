require('dotenv').config(); // Charge les variables d’environnement
const mongoose = require('mongoose');
const Courrier = require('models\courrier.js'); // Import du modèle

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion réussie à MongoDB"))
    .catch(err => console.error("Erreur de connexion :", err));

// Insérer un nouveau courrier
const nouveauCourrier = new Courrier({
    expediteur: "Jean Dupont",
    destinataire: "Sophie Martin",
    adresse: "10 rue de Paris, 75001 Paris",
    contenu: "Lettre importante",
    nombrepages: 3,
    prix: 3.5
});

nouveauCourrier.save()
    .then(doc => {
        console.log("Courrier inséré :", doc);
        mongoose.connection.close(); // Fermer la connexion après l'insertion
    })
    .catch(err => console.error("Erreur lors de l’insertion :", err));
    const mongoose = require('mongoose');
require('dotenv').config();
const Courrier = require('./models/courrier');  // Import du modèle

// Connexion à la base MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion réussie à MongoDB"))
.catch(err => console.error("Erreur de connexion :", err));

// Ajouter un courrier
const ajouterCourrier = async () => {
    try {
        const nouveauCourrier = new Courrier({
            expediteur: "Alice",
            destinataire: "Bob",
            adresse: "123 Rue du Courrier",
            contenu: "Lettre urgente.",
            nombrepages: 2,
            prix: 2.5
        });

        await nouveauCourrier.save();
        console.log("Courrier ajouté avec succès !");
        mongoose.connection.close(); // Fermer la connexion après l'insertion
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
    }
};

// Exécuter l'ajout
ajouterCourrier();