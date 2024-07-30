// controllers/newRemissionController.js
const Factura = require('../models/newRemission.js');
const DetalleFactura = require('../models/detailsNewRemission.js');
const User = require('../models/usuarios.js');

const getRemissionByCC = async (req, res) => {
  try {
    const user = await User.findOne({ cc: req.params.userCC });
    if (!user) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }
    
    const facturas = await Factura.find({ userCC: user._id }).populate('articulos');
    res.status(200).json(facturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener las remisiones' });
  }
};

const getAllRemission = async (req, res) => {
  try {
    const facturas = await Factura.find().populate('articulos');
    res.status(200).json(facturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener las remisiones' });
  }
};

const createRemission = async (req, res) => {
  try {
    const { ciudad, transportador, ccTransportador, direccion, placa, despachado, recibido, totalPeso, empresa, userCC, articulos } = req.body;

    const user = await User.findOne({ cc: userCC });
    if (!user) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    const nuevaFactura = new Factura({
      ciudad,
      transportador,
      ccTransportador,
      direccion,
      placa,
      despachado,
      recibido,
      totalPeso,
      empresa,
      userCC: user._id
    });

    const savedFactura = await nuevaFactura.save();

    const detalles = await Promise.all(articulos.map(async (articulo) => {
      const { descripcion, cantidad, material } = articulo;
      const nuevoDetalle = new DetalleFactura({
        descripcion,
        cantidad,
        material,
        newRemissionId: savedFactura._id
      });
      return await nuevoDetalle.save();
    }));

    savedFactura.articulos = detalles.map(detalle => detalle._id);
    await savedFactura.save();

    res.status(201).json(savedFactura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear la remisión' });
  }
};

const deleteRemission = async (req, res) => {
  try {
    await Factura.findByIdAndDelete(req.params.id);
    res.send('Remisión eliminada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la remisión' });
  }
};

module.exports = {
  getAllRemission,
  getRemissionByCC,
  createRemission,
  deleteRemission,
};
