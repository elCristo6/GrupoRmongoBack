// controllers/newRemissionController.js

const Factura = require('../models/newRemission.js');
const DetalleFactura = require('../models/detailsNewRemission.js');
const User = require('../models/usuarios.js');
const Counter = require('../models/counter');

// Obtiene el siguiente valor de secuencia para el ID
const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};


const createRemission = async (req, res) => {
  try {
    const { ciudad, transportador, ccTransportador, direccion, placa, despachado, recibido, totalPeso, empresa, userCC, articulos } = req.body;

    // Extraer el valor de 'cc' de 'userCC'
    const userCCValue = userCC?.cc;

    if (!userCCValue) {
      return res.status(400).json({ mensaje: 'El campo userCC.cc es requerido' });
    }

    // Buscar el usuario con el cc proporcionado
    const user = await User.findOne({ cc: userCCValue });
    if (!user) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    // Obtener el siguiente ID secuencial
    const newId = await getNextSequenceValue('remissionId');

    // Crear una nueva remisión
    const nuevaFactura = new Factura({
      id: newId,
      ciudad,
      transportador,
      ccTransportador,
      direccion,
      placa,
      despachado,
      recibido,
      totalPeso,
      empresa,
      userCC: userCCValue // Guardar el valor extraído de 'userCC'
    });

    const savedFactura = await nuevaFactura.save();

    // Verificar que articulos esté definido y sea un array
    let detalles = [];
    if (Array.isArray(articulos)) {
      detalles = await Promise.all(articulos.map(async (articulo) => {
        const { descripcion, cantidad, material } = articulo;
        const nuevoDetalle = new DetalleFactura({
          descripcion,
          cantidad,
          material,
          newRemissionId: savedFactura._id
        });
        return await nuevoDetalle.save();
      }));
    }

    savedFactura.detailsNewRemissions = detalles.map(detalle => detalle._id);
    await savedFactura.save();

    res.status(201).json(savedFactura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear la remisión' });
  }
};



// Obtener remisiones por CC de usuario
const getRemissionByCC = async (req, res) => {
  try {
    const user = await User.findOne({ cc: req.params.userCC });
    if (!user) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    const facturas = await Factura.find({ userCC: user.cc }).populate('detailsNewRemissions');

    const response = {
      facturas: facturas.map(factura => ({
        id: factura.id,
        ciudad: factura.ciudad,
        transportador: factura.transportador,
        ccTransportador: factura.ccTransportador,
        direccion: factura.direccion,
        placa: factura.placa,
        despachado: factura.despachado,
        recibido: factura.recibido,
        totalPeso: factura.totalPeso,
        userCC: factura.userCC,
        empresa: factura.empresa,
        createdAt: factura.createdAt ? factura.createdAt.toISOString() : null,
        updatedAt: factura.updatedAt ? factura.updatedAt.toISOString() : null,
        detailsNewRemissions: factura.detailsNewRemissions.map(detalle => ({
          id: detalle._id.toString(),
          material: detalle.material,
          descripcion: detalle.descripcion,
          cantidad: detalle.cantidad,
          createdAt: detalle.createdAt ? detalle.createdAt.toISOString() : null,
          updatedAt: detalle.updatedAt ? detalle.updatedAt.toISOString() : null,
          newRemissionId: factura.id
        }))
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener las remisiones' });
  }
};

// Obtener todas las remisiones
const getAllRemission = async (req, res) => {
  try {
    const facturas = await Factura.find().populate('detailsNewRemissions');

    const response = facturas.map(factura => ({
      id: factura.id,
      ciudad: factura.ciudad,
      transportador: factura.transportador,
      ccTransportador: factura.ccTransportador,
      direccion: factura.direccion,
      placa: factura.placa,
      despachado: factura.despachado,
      recibido: factura.recibido,
      totalPeso: factura.totalPeso.toString(), // Convertir a cadena
      userCC: factura.userCC,
      empresa: factura.empresa,
      createdAt: factura.createdAt ? factura.createdAt.toISOString() : null,
      updatedAt: factura.updatedAt ? factura.updatedAt.toISOString() : null,
      detailsNewRemissions: factura.detailsNewRemissions.map(detalle => ({
        id: detalle._id.toString(),
        material: detalle.material,
        descripcion: detalle.descripcion,
        cantidad: detalle.cantidad,
        createdAt: detalle.createdAt ? detalle.createdAt.toISOString() : null,
        updatedAt: detalle.updatedAt ? detalle.updatedAt.toISOString() : null,
        newRemissionId: factura.id
      }))
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener las remisiones' });
  }
};


// Eliminar una remisión
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

