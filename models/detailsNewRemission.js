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
    ref: 'Factura',
    required: true,
  }
});

const DetalleFactura = mongoose.model('DetalleFactura', DetalleFacturaSchema);
module.exports = DetalleFactura;
