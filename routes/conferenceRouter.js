const express = require('express');
const conferenceController = require('../controller/conferenceController');
const authController = require('./../controller/authController');
const router = express.Router();

router.get('/', conferenceController.getConferences);

module.exports = router;
