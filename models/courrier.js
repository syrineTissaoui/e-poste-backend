const mongoose = require('mongoose');

const courrierSchema = new mongoose.Schema({
  numeroSuivi: { type: String, required: true, unique: true },
  expediteur: { type: String, required: true },
  destinataire: { type: String, required: true },
  adresseExp: { type: String, },
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
  historique: { type: String }, 
  description: { type: String , default: "" },
  action: { type: String , default: ""  },                   // texte libre
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur', default: null },
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // change to 'User' if your model is named differently
    required: true
  }
});

module.exports = mongoose.model('Courrier', courrierSchema);


