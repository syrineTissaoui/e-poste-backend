const mongoose = require('mongoose');

const courrierSchema = new mongoose.Schema({
  numeroSuivi: { type: String, required: true, unique: true },
  expediteur: { type: String, required: true },
  destinataire: { type: String, required: true },
  adresseExp: { type: String, required: true },
  adresseDest: { type: String, required: true },
  codePostal: { type: String, required: true },
  tel: { type: String, required: true },
  contenu: { type: String },            // texte libre
  nombrepages: { type: Number },        // ex: 3
  prix: { type: Number },               // prix calculé
  statut: { type: String, default: 'En attente' }, // En attente, Traité, Livré
  dateEnvoi: { type: Date, default: Date.now },    // remplacé "date"
  dateTraitement: { type: Date },                 // optionnel
  dateLivraison: { type: Date },                  // optionnel
  historique: { type: String },                    // texte libre
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur', default: null }

});

module.exports = mongoose.model('Courrier', courrierSchema);


