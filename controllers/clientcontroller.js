

const Client = require('../models/client'); 

// Ajouter un client
exports.ajouterClient = async (req, res) => {
  try {
    const nouveauClient = new Client(req.body);
    await nouveauClient.save();
    res.status(201).json(nouveauClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Tous les clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Un client par ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client non trouvé" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier un client
exports.modifierClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un client
exports.supprimerClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
