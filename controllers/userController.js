// controllers/userController.js
const User = require('../models/usuarios.js');

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ cc: req.params.cc });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al buscar el usuario');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      cc: req.body.cc,
      name: req.body.name,
      pass: req.body.pass,
      userType: req.body.userType,
    });
    await newUser.save();
    res.send('Usuario creado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al crear el usuario');
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { cc: req.params.cc },
      {
        name: req.body.name,
        pass: req.body.pass,
        userType: req.body.userType,
      },
      { new: true }
    );
    if (updatedUser) {
      res.send('Usuario actualizado correctamente');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al actualizar el usuario');
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ cc: req.params.cc });
    if (deletedUser) {
      res.send('Usuario eliminado correctamente');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al eliminar el usuario');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
