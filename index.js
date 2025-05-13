// Charger les variables d’environnement
require('dotenv').config()
const createAdminIfNotExists = require('./initAdmin');

// Importer les modules nécessaires
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
// Vérifier la présence de la variable MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("[MongoDB] MONGO_URI n'est pas défini dans le fichier .env !")
  process.exit(1)
}

// Initialiser Express
const app = express()

// Middlewares globaux
app.use(cors())
app.use(express.json())

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then( async() =>{
    await createAdminIfNotExists();
     console.log('[MongoDB] Connexion réussie à MongoDB')
  }).catch((err) => {
    console.error('[MongoDB] Échec de la connexion :', err)
    process.exit(1)
  })

// Route de test
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenue sur e-Poste, votre plateforme de gestion des courriers et colis '
  })
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) 
// Routes colis
const colisRoutes = require('./routes/colisRoutes')
app.use('/api/colis', colisRoutes)

// Routes courriers
const courrierRoutes = require('./routes/courrierroutes') 
app.use('/api/courriers', courrierRoutes) 

// Routes livreurs
const livreurRoutes = require('./routes/livreurRoutes')
app.use('/api/livreurs', livreurRoutes)

const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes)
// Routes clients
const clientRoutes = require('./routes/clientsRoutes');
app.use('/api/clients', clientRoutes)

// Routes paiements
const paiementRoutes = require('./routes/paiementRoutes')
app.use('/api/paiements', paiementRoutes)

// Routes utilisateurs (Admin : liste, ajout, modification, suppression)
const utilisateurRoutes = require('./routes/utilisateurRoutes')
app.use('/api/utilisateurs', utilisateurRoutes)
const ticketsRoutes = require('./routes/ticketRoutes')
app.use('/api/tickets', ticketsRoutes)
// Routes d'authentification (signup / login client)
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// Lancer le serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[Serveur] Serveur lancé sur http://localhost:${PORT}`)
})




 