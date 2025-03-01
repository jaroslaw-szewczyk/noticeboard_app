const express = require('express');
const router = express.Router();
const NoticeController = require('../controllers/notices.conroller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.route('/').get(NoticeController.getAll);

router.route('/:id').get(NoticeController.getById);

router.route('/search/:searchPhrase').get(NoticeController.search);

router.route('/').post(authMiddleware, imageUpload.single('image'), NoticeController.addOne);

router.route('/:id').put(authMiddleware, imageUpload.single('image'), NoticeController.updateOne);

router.route('/:id').delete(authMiddleware, NoticeController.delete);

module.exports = router;