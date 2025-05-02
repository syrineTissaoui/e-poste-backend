const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  sujet: { type: String, required: true },
  description: { type: String, required: true },
  statut: { type: String, enum: ['En attente', 'En cours', 'Résolu'], default: 'En attente' },
  dateCreation: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);