const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../e-poste-backend/models/utilisateur'); // adapte le chemin selon ton projet

const createAdminIfNotExists = async () => {
  const adminEmail = "rihem@gmail.com";

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const adminUser = new User({
        nom: "rihem",
        email: adminEmail,
        motDePasse: hashedPassword,
        role: "admin",
        status: "actif"
      });

      await adminUser.save();
      console.log("✅ Admin créé avec succès.");
    } else {
      console.log("ℹ️ Un admin existe déjà.");
    }
  } catch (err) {
    console.error("❌ Erreur lors de la vérification/création de l'admin :", err);
  }
};

module.exports = createAdminIfNotExists;
