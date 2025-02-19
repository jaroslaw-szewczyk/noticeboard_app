const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Author', authorSchema);