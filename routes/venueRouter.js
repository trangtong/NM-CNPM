const express = require('express');
const venueController = require('../controller/venueController');
const authController = require('./../controller/authController');
const router = express.Router();

router.get('/', venueController.getVenues);

module.exports = router;
