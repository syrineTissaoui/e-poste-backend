
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploads');
const activityController = require('../controllers/activityController')


router.get('/activities', activityController.getRecentActivities);
router.get('/recent-activities', activityController.getRecentActivitiesClient);
router.get('/recent-activities-livreur', activityController.getRecentActivitiesLivreur);


module.exports = router;