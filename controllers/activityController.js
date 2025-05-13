// controllers/activityController.js
const Colis = require('../models/colis');
const Courrier = require('../models/courrier');
const Livreur = require('../models/livreur');
const Client = require('../models/client');
const mongoose = require('mongoose');

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
// Helper to format "time ago"
const formatTimeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "aujourd'hui";
  if (days === 1) return "1 jour";
  if (days < 7) return `${days} jours`;
  return "1 semaine";
};

exports.getRecentActivities = async (req, res) => {
  try {
    const colis = await Colis.find().sort({ createdAt: -1 }).limit(5);
    const courriers = await Courrier.find().sort({ dateEnvoi: -1 }).limit(5);
    const livreurs = await Livreur.find();

    const activities = [];

    colis.forEach(c => {
      activities.push({
        message: `Client ${c.expediteur} a envoyé un colis`,
        date: new Date(c.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        timeAgo: formatTimeAgo(c.createdAt)
      });

      if (c.livreur) {
        const livreur = livreurs.find(l => l._id.equals(c.livreur));
        if (livreur) {
          activities.push({
            message: `Livreur ${livreur.nom} a livré un colis`,
            date: new Date(c.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
            timeAgo: formatTimeAgo(c.updatedAt)
          });
        }
      }
    });

    courriers.forEach(courrier => {
      activities.push({
        message: `Nouveau courrier ajouté par ${courrier.expediteur}`,
        date: new Date(courrier.dateEnvoi).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        timeAgo: formatTimeAgo(courrier.dateEnvoi)
      });
    });

    res.json(activities.slice(0, 10));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du chargement des activités" });
  }
};
exports.getRecentActivitiesClient = async (req, res) => {
    const clientId = req.query.clientId; // GET /api/recent-activities?clientId=xxx

  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }
    try {
      const objectId = new mongoose.Types.ObjectId(clientId);

      const colis = await Colis.find({ Client: objectId});
      const courriers = await Courrier.find({ Client: objectId});
  console.log('colis',colis);
    console.log('courriers',courriers)

      const activities = [
        ...colis.map(c => ({
         c,
          type: 'colis',
          
        })),
        ...courriers.map(c => ({
          c,
          type: 'courrier',
         
        })),
      ];
  
      activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(activities.slice(0, 5));
    } catch (err) {
      res.status(500).json({ message: "Erreur lors du chargement des activités" });
    }
  };

  exports.getRecentActivitiesLivreur = async (req, res) => {
    const mongoose = require('mongoose');
    const livreurId = req.query.livreurId;
   
    if (!livreurId || !mongoose.Types.ObjectId.isValid(livreurId)) {
      return res.status(400).json({ message: 'Valid Livreur ID is required' });
    }
  
    try {
      const objectId = new mongoose.Types.ObjectId(livreurId);
      const colis = await Colis.find({ Livreur: objectId });
      const courriers = await Courrier.find({ Livreur: objectId });
  


  const activities = [
    ...colis.map(c => ({
      id: c._id,
      type: 'colis',
      statut: c.statut,
      createdAt: c.date,
    })),
    ...courriers.map(c => ({
      id: c._id,
      type: 'courrier',
      statut: c.statut,
      createdAt: c.dateEnvoi,
    })),
  ];
  
  
      activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      // ✅ Aggregated summary
      const colisLivres = colis.filter(c => c.statut === 'Livré').length;
      const colisEnAttente = colis.filter(c => c.statut === 'En attente').length;
      const courriersLivres = courriers.filter(c => c.statut === 'Livré').length;
      const courriersEnAttente = courriers.filter(c => c.statut === 'En attente').length;
  
      res.json({
        recent: activities.slice(0, 5),
        stats: {
          colisLivres,
          colisEnAttente,
          courriersLivres,
          courriersEnAttente
        }
      });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors du chargement des activités", error: err.message });
    }
  };
  