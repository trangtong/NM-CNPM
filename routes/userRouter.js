const express = require('express');
const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/forgot', authController.forgotPassword);
router.patch('/reset/:token', authController.resetPassword);
router.patch('/updatePassword', authController.updatePassword);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.updateMe
);

router.get(
  '/currentUser',
  authController.isLoggedIn,
  userController.getCurrentUser
);

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getUsers
);

router
  .use(authController.protect, authController.restrictTo('admin'))
  .route('/:id')
  .get(userController.getUserByID)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
