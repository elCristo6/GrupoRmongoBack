// controllers/usersController.js

const User = require('../models/usuarios.js');


// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Mapea los usuarios para asegurar que cc sea un número y agregar las fechas
    const usersResponse = users.map(user => ({
      cc: parseInt(user.cc, 10), // Convertir cc a número
      name: user.name,
      pass: user.pass,
      userType: user.userType,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null, // Verificar que createdAt esté definido
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null, // Verificar que updatedAt esté definido
    }));

    res.status(200).json(usersResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener los usuarios' });
  }
};


const getUserByCC = async (req, res) => {
  try {
    const { cc } = req.params;
    const user = await User.findOne({ cc });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Construir la respuesta con cc como número
    const userResponse = {
      cc: parseInt(user.cc, 10), // Asegurar que cc se devuelva como número
      name: user.name,
      pass: user.pass,
      userType: user.userType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al buscar el usuario' });
  }
};




// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { cc, name, pass, userType } = req.body;

    const existingUser = await User.findOne({ cc });
    if (existingUser) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const newUser = new User({
      cc,
      name,
      pass,
      userType
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear el usuario' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { cc, name, pass, userType } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { cc, name, pass, userType },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al actualizar el usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { cc } = req.params; // Cambiado de 'id' a 'cc'

    // Buscar y eliminar el usuario basado en el cc
    const deletedUser = await User.findOneAndDelete({ cc });
    if (!deletedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el usuario' });
  }
};
module.exports = {
  getAllUsers,
  getUserByCC,
  createUser,
  updateUser,
  deleteUser
};
