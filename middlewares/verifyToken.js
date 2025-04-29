// Dans ton projet, les utilisateurs (clients, livreurs, etc.) se connectent et reçoivent un token JWT. Ce token sert de preuve qu’ils sont authentifiés.
// middlewares/verifyToken.js
const jwt = require('jsonwebtoken')

// Remplace cette clé secrète par celle de ton fichier .env
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  // Vérifie si le token est présent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    // Ajoute les infos de l’utilisateur dans la requête
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Accès refusé. Token invalide.' })
  }
}

module.exports = verifyToken