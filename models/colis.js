// backend/models/colis.js

const mongoose = require('mongoose');

const colisSchema = new mongoose.Schema({
  numeroSuivi: { type: String, required: true, unique: true },
  expediteur: { type: String, required: true },
  destinataire: { type: String, required: true },
  adresseExp: { type: String, required: true },
  adresseDest: { type: String, required: true },
  codePostal: { type: String, required: true },
  tel: { type: String, required: true },
  statut: { type: String, enum: ["En attente", "En cours", "Livré"], default: "En attente" },
  type: { type: String, default: "Standard" }, // Ex : "Document", "Objet", etc.
  poids: { type: String }, // Ex : "1kg", "500g"
  date: { type: Date, default: Date.now },
  dateExpedition: { type: String }, // Ex : "2025-04-20"
  dateLivraison: { type: String }, // Ex : "2025-04-25"
  historique: { type: String }, // Description libre ou tableau si besoin
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: 'Livreur', default: null }


});

module.exports = mongoose.model('Colis', colisSchema);

