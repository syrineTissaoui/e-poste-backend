const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  numeroPaiement: { type: String, required: true, unique: true },
  client: { type: String, required: true },
  type: { type: String, enum: ['Colis', 'Courrier'], required: true },
  montant: { type: Number, required: true },
  datePaiement: { type: Date, default: Date.now },
  statut: { type: String, default: 'En attente' },
  moyenPaiement: { type: String, enum: ['Espèces', 'Carte D17'], required: true },

  probleme: {
    description: { type: String },
    action: { type: String, enum: ['rembourser', 'annuler'] },
    dateSignalement: { type: Date },
    resolu: { type: Boolean, default: false }  //   pour suivi

  }
});

module.exports = mongoose.model('Paiement', paiementSchema);

