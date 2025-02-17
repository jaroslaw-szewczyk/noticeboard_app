const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true, minlength: 10, maxlength: 50 },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  location: {type: String, required: true },
  image: { type: String, required: true },
  // author: {type: String, required: true, ref: 'Author' }
})

module.exports = mongoose.model('Notice', noticeSchema);