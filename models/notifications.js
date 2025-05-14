// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  statut: { type: String, enum: ['Lu', 'Non lu'], default: 'Non lu' }
});

module.exports = mongoose.model('Notification', notificationSchema);
