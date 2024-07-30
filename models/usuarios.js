// models/usuarios.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  cc: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['admin', 'proveedor'],
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
