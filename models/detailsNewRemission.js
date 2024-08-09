// models/detailsNewRemission.js
const mongoose = require('mongoose');

const DetalleFacturaSchema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  newRemissionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'newRemission',
    required: true 
  }
},{ timestamps: true }); // Incluye createdAt y updatedAt

module.exports = mongoose.model('detailsNewRemission', DetalleFacturaSchema);
