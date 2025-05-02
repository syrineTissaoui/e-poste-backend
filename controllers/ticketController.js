const Ticket = require('../models//tickets');

exports.createTicket = async (req, res) => {
  const { sujet, description , utilisateur } = req.body;
   // supposons que req.userId est injecté depuis le middleware d'authentification
console.log(' req.body', req.body)
  try {
    const ticket = await Ticket.create({ sujet, description, utilisateur });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du ticket", error: err });
  }
};


exports.getAllTicketsWithUsers = async (req, res) => {
    try {
      const tickets = await Ticket.find().populate('utilisateur', 'nom email tel statut');
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération des tickets", error: err });
    }
  };
  exports.updateTicketStatus = async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;
  
    try {
      const updated = await Ticket.findByIdAndUpdate(
        id,
        { statut },
        { new: true }
      ).populate('utilisateur');
  
      if (!updated) {
        return res.status(404).json({ message: 'Ticket non trouvé' });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du ticket" });
    }
  };