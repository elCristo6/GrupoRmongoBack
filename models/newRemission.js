// models/newRemission.js
/*
const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
  id: { // Número secuencial
    type: Number,
    required: true,
    unique: true,
  },
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
    type: String,
    required: true,
  },
  userCC: {
    type:String,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  detailsNewRemissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DetalleFactura'
  }]
});

const Factura = mongoose.model('Factura', FacturaSchema);
module.exports = Factura;

*/
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RemissionSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true 
  },
  ciudad: { 
    type: String, 
    required: false ,
    default: ''
  },
  transportador: { 
    type: String, 
    required: false ,
    default: ''
  },
  ccTransportador: { 
    type: String, 
    required: false ,
    default: ''
  },
  direccion: { 
    type: String, 
    required: false,
    default: ''
  },
  placa: { 
    type: String, 
    required: false,
    default: ''
  },
  despachado: { 
    type: String, 
    required: false ,
    default: ''
  },
  recibido: { 
    type: String, 
    required: false,
    default: ''
  },
  totalPeso: { 
    type: String, 
    required: false,
    default: ''
  },
  userCC: { 
    type: String, 
    required: true 
  },
  empresa: { 
    type: String, 
    required: false ,
    default: ''
  },
  detailsNewRemissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'detailsNewRemission',
      required: false 
    }
  ]
}, { timestamps: true }); // Incluye createdAt y updatedAt

// Auto increment plugin
RemissionSchema.plugin(AutoIncrement, { id: 'remission_seq', inc_field: 'id' });

module.exports = mongoose.model('Remission', RemissionSchema);
