// models/newRemission.js
const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
  ciudad: {
    type: String,
    required: true,
  },
  transportador: {
    type: String,
    required: true,
  },
  ccTransportador: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  placa: {
    type: String,
    required: true,
  },
  despachado: {
    type: String,
    required: true,
  },
  recibido: {
    type: String,
    required: true,
  },
  totalPeso: {
    type: Number,
    required: true,
  },
  userCC: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  articulos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DetalleFactura'
  }]
});

const Factura = mongoose.model('Factura', FacturaSchema);
module.exports = Factura;
