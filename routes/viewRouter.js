const express = require('express');
const viewController = require('../controller/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/login', viewController.getLogin);
router.get('/user/profile', viewController.getUserProfile);
module.exports = router;
