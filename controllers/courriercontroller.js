const Courrier = require('../models/courrier');

// Ajouter un nouveau courrier
exports.ajouterCourrier = async (req, res) => {
  try {
    const {
      numeroSuivi,
      expediteur,
      destinataire,
      adresseExp,
      adresseDest,
      codePostal,
      tel,
      contenu,
      nombrepages,
      dateTraitement,
      dateLivraison,
      historique
    } = req.body;

    if (
      !numeroSuivi || !expediteur || !destinataire ||
      !adresseExp || !adresseDest || !codePostal || !tel
    ) {
      return res.status(400).json({ message: 'Tous les champs obligatoires ne sont pas remplis' });
    }

    const prix = nombrepages * 1 + 0.5;

    const courrier = new Courrier({
      numeroSuivi,
      expediteur,
      destinataire,
      adresseExp,
      adresseDest,
      codePostal,
      tel,
      contenu,
      nombrepages,
      prix,
      statut: 'En attente',
      dateEnvoi: new Date(),
      dateTraitement,
      dateLivraison,
      historique
    });

    await courrier.save();
    res.status(201).json({ message: 'Courrier enregistré avec succès', courrier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement", error });
  }
};

// Obtenir tous les courriers
exports.getAllCourriers = async (req, res) => {
  try {
    const courriers = await Courrier.find().sort({ dateEnvoi: -1 });
    res.status(200).json(courriers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des courriers", error });
  }
};

// Obtenir un courrier par ID
exports.getCourrierById = async (req, res) => {
  try {
    const courrier = await Courrier.findById(req.params.id);
    if (!courrier) {
      return res.status(404).json({ message: "Courrier non trouvé" });
    }
    res.status(200).json(courrier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du courrier", error });
  }
};

// Mettre à jour un courrier
exports.updateCourrier = async (req, res) => {
  try {
    const courrier = await Courrier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!courrier) {
      return res.status(404).json({ message: "Courrier introuvable" });
    }
    res.status(200).json(courrier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// Supprimer un courrier
exports.deleteCourrier = async (req, res) => {
  try {
    const courrier = await Courrier.findByIdAndDelete(req.params.id);
    if (!courrier) {
      return res.status(404).json({ message: "Courrier introuvable" });
    }
    res.status(200).json({ message: "Courrier supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// Affecter un livreur à un courrier
exports.affecterCourrier = async (req, res) => {
  try {
    const { id } = req.params;
    const { livreur } = req.body;

    const courrier = await Courrier.findByIdAndUpdate(id, { livreur }, { new: true });
    if (!courrier) {
      return res.status(404).json({ message: "Courrier non trouvé pour l'affectation" });
    }

    res.status(200).json({ message: "Livreur affecté au courrier avec succès", courrier });
  } catch (err) {
    res.status(500).json({ message: "Erreur d'affectation du courrier", err });
  }
};


