// models/detailsNewRemission.js
const mongoose = require('mongoose');

const DetalleFacturaSchema = new mongoose.Schema({
  material: {
    type: String,
    required: false,
  },
  descripcion: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: false,
  },
  newRemissionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'newRemission',
    required: false 
  }
},{ timestamps: true }); // Incluye createdAt y updatedAt

module.exports = mongoose.model('detailsNewRemission', DetalleFacturaSchema);
