const express = require('express');
const router = express.Router();
const NoticeController = require('../controllers/notices.conroller');

router.route('/').get(NoticeController.getAll);

router.route('/:id').get(NoticeController.getById);

router.route('/search/:searchPhrase').get(NoticeController.search);

router.route('/').post(NoticeController.addOne);

router.route('/:id').put(NoticeController.updateOne);

router.route('/:id').delete(NoticeController.delete);

module.exports = router;