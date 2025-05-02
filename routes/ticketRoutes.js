const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket);
router.get('/getAll', ticketController.getAllTicketsWithUsers);
router.put('/:id', ticketController.updateTicketStatus);
module.exports = router;