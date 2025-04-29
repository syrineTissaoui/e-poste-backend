const mongoose = require('mongoose');

const livreurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String },
  statut: { type: String, enum: ['actif', 'inactif'], default: 'actif' }
});

module.exports = mongoose.model('Livreur', livreurSchema);

  