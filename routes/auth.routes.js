const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.route('/user').get(AuthController.getUser);
router.route('/register').post(AuthController.newUser);
router.route('/login').post(AuthController.loginUser);

module.exports = router;