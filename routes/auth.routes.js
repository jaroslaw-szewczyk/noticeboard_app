const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');

router.route('/user').get(authMiddleware, AuthController.getUser);
router.route('/register').post(imageUpload.single('avatar'), AuthController.newUser);
router.route('/login').post(AuthController.loginUser);
router.route('/logout').post(AuthController.logOut);

module.exports = router;