const Paiement = require('../models/paiement');

// Ajouter un paiement
exports.ajouterPaiement = async (req, res) => {
  try {
    const { numeroPaiement, client, type, montant, statut, moyenPaiement } = req.body;
    if (!numeroPaiement || !client || !type || !montant || !moyenPaiement) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const paiement = new Paiement({
      numeroPaiement,
      client,
      type,
      montant,
      statut: statut || 'En attente',
      moyenPaiement
    });

    await paiement.save();
    res.status(201).json(paiement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout', error });
  }
};

// Lister tous les paiements
exports.getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find();
    res.status(200).json(paiements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// Supprimer un paiement
exports.deletePaiement = async (req, res) => {
  try {
    await Paiement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Paiement supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};

// Signaler un problème
exports.signalerProbleme = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, action } = req.body;

    const paiement = await Paiement.findById(id);
    if (!paiement) return res.status(404).json({ message: 'Paiement introuvable' });

    paiement.probleme = {
      description,
      action,
      dateSignalement: new Date(),
      resolu: false
    };

    await paiement.save();
    res.status(200).json({ message: 'Problème enregistré', paiement });
  } catch (error) {
    res.status(500).json({ message: 'Erreur signalement', error });
  }
};

// Marquer un problème comme résolu
exports.marquerCommeResolue = async (req, res) => {
  try {
    const { id } = req.params;

    const paiement = await Paiement.findById(id);
    if (!paiement || !paiement.probleme) {
      return res.status(404).json({ message: 'Paiement ou problème non trouvé' });
    }

    paiement.probleme.resolu = true;

    await paiement.save();
    res.status(200).json({ message: 'Problème marqué comme résolu', paiement });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du problème', error });
  }
};
