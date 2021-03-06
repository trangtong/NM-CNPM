const express = require('express');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/all', viewController.getAllConference);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/:slugWithID', viewController.getConferenceDetail);

router.get(
 '/user/profile',
 authController.isLoggedIn,
 viewController.getUserProfile
);
router.get(
 '/user/updatePassword',
 authController.isLoggedIn,
 viewController.getChangePassword
);

module.exports = router;
