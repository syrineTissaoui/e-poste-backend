const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  codePostal: { type: String, required: true },
  image: { type: String }, // URL de la photo de profil
}, {
  timestamps: true
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client