// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.use(express.json());

// Ruta para obtener un usuario por su ID
router.get('/users/:cc', userController.getUserByCC);
// Ruta para obtener todos los usuarios
router.get('/users/', userController.getAllUsers);
// Ruta para crear un nuevo usuario
router.post('/users/', userController.createUser);
// Ruta para actualizar un usuario existente
router.put('/users/:cc', userController.updateUser);
// Ruta para eliminar un usuario existente
router.delete('/users/:cc', userController.deleteUser);

module.exports = router;
