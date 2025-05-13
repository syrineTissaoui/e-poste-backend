const Colis = require('../models/colis');

//  Créer un nouveau colis
exports.envoyerColis = async (req, res) => {
  try {
    const {
      numeroSuivi,
      expediteur,
      destinataire,
      adresseExp,
      adresseDest,
      codePostal,
      tel,
      type,
      poids,
      prix,
      dateExpedition,
      dateLivraison,
      historique,
      clientId
    } = req.body;
    console.log('req.body',req.body)

    // Vérification des champs obligatoires
    if (
      !numeroSuivi || !expediteur || !destinataire ||
      !adresseExp || !adresseDest || !codePostal || !tel || !prix 
    ) {
      return res.status(400).json({ message: 'Tous les champs requis ne sont pas remplis' });
    }
    const nouveauColis = new Colis({
      numeroSuivi,
      expediteur,
      destinataire,
      adresseExp,
      adresseDest,
      codePostal,
      tel,
      type,
      poids,
      prix:prix,
      dateExpedition,
      dateLivraison,
      historique,
      statut: 'En attente', // Valeur par défaut
      date: new Date(),
      Client: clientId,
      
      
      
      
    });

    await nouveauColis.save();
    res.status(201).json({ message: 'Colis enregistré avec succès', colis: nouveauColis });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi du colis", error });
  }
};

// Récupérer tous les colis

exports.getAllColisLivreur = async (req, res) => {
  const mongoose = require('mongoose');
  const LivreurId = req.query.livreurId;
  console.log('---------',LivreurId)
  try {
    
    const colis = await Colis.find({ Livreur:LivreurId});
    res.status(200).json(colis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des colis", error });
  }
};
exports.getAllColisClient = async (req, res) => {
        const mongoose = require('mongoose');
        const clientId = req.query.clientId;
        console.log('clientId',clientId)
        try {
          
          const colis = await Colis.find({ Client:clientId});
          res.status(200).json(colis);
        } catch (error) {
          res.status(500).json({ message: "Erreur lors de la récupération des colis", error });
        }
      };
exports.getAllColis = async (req, res) => {
  try {
    const colis = await Colis.find();
    res.status(200).json(colis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des colis", error });
  }
};

// Récupérer un colis par ID
exports.getColisById = async (req, res) => {
  try {
    const colis = await Colis.findById(req.params.id);
    if (!colis) {
      return res.status(404).json({ message: "Colis non trouvé" });
    }
    res.status(200).json(colis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du colis", error });
  }
};

// Mettre à jour un colis
exports.updateColis = async (req, res) => {
  try {
    const updated = await Colis.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Colis non trouvé pour la mise à jour" });
    }
    res.status(200).json({ message: "Colis mis à jour avec succès", colis: updated });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// 🔹 Supprimer un colis
exports.deleteColis = async (req, res) => {
  try {
    const deleted = await Colis.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Colis non trouvé pour la suppression" });
    }
    res.status(200).json({ message: "Colis supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// Affecter un livreur à un colis
const mongoose = require('mongoose');


exports.affecterColis = async (req, res) => {
  try {
    const { id } = req.params;
    const { livreur, dateLivraison, statut } = req.body;

    console.log('✅ Requête body reçue :', req.body);
    console.log('🔍 Validation livreur ID :', !livreur || !mongoose.Types.ObjectId.isValid(livreur));

    if (!livreur || !mongoose.Types.ObjectId.isValid(livreur)) {
      return res.status(400).json({ message: 'Valid Livreur ID is required' });
    }

    const colis = await Colis.findByIdAndUpdate(
      id,
      { Livreur:livreur, dateLivraison:dateLivraison, statut:statut },
      { new: true }
    );

    if (!colis) {
      return res.status(404).json({ message: "Colis non trouvé pour l'affectation" });
    }

    res.status(200).json({
      message: "✅ Livreur affecté au colis avec succès",
      colis
    });

  } catch (err) {
    console.error('❌ Erreur serveur pendant l’affectation :', err);
    res.status(500).json({
      message: "Erreur d'affectation du colis",
      error: err.message || err
    });
  }
};

