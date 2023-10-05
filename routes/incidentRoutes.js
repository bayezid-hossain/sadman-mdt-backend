const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// Define a route to store person information
router.post('/create', incidentController.storeIncidentInfo);
router.get('/all', incidentController.getAllIncidents);

module.exports = router;
