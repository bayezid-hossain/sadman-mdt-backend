const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');

// Define a route to store person information
router.post('/person', citizenController.storePersonInfo);
router.get('/all', citizenController.getAllCitizen);

router.get('/person/:name', citizenController.getPersonByName);
module.exports = router;
