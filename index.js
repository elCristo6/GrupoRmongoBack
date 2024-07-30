const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); // Archivo que maneja la conexión a la base de datos
const userRoutes = require('./routes/userRoutes'); // Importa las rutas del usuario
const newRemissionRoutes = require('./routes/newRemissionRoutes'); // Importa las rutas de nuevas remisiones
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api', userRoutes);
app.use('/api', newRemissionRoutes);

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
