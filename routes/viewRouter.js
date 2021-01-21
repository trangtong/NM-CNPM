const express = require('express');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get(
 '/user/profile',
 authController.isLoggedIn,
 viewController.getUserProfile
);
module.exports = router;
