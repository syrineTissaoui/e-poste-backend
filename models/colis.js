// backend/models/colis.js

const mongoose = require('mongoose');

const colisSchema = new mongoose.Schema({
  numeroSuivi: { type: String },
  expediteur: { type: String },
  destinataire: { type: String },
  adresseExp: { type: String},
  adresseDest: { type: String },
  codePostal: { type: String },
  tel: { type: String },
  statut: { type: String, enum: ["En attente", "En cours", "Livré"], default: "En attente" },
  type: { type: String, default: "Standard" }, // Ex : "Document", "Objet", etc.
  poids: { type: String }, // Ex : "1kg", "500g"
  date: { type: Date, default: Date.now },
  dateExpedition: { type: String }, // Ex : "2025-04-20"
  dateLivraison: { type: String }, // Ex : "2025-04-25"
  description: { type: String , default: "" },
  action: { type: String , default: ""  },
  historique: { type: String }, // Description libre ou tableau si besoin
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  Livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur' }



});

module.exports = mongoose.model('Colis', colisSchema);

