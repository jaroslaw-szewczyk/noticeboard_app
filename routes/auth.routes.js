const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.route('/user').get(AuthController.getUser);
router.route('/user').post(AuthController.newUser);
router.route('/user').post(AuthController.loginUser);

module.exports = router;