const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://grupoEmpresarialRV3:91120152349.@cluster0.jxbxqu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log("Base de datos GrupoEmpresarialR conectada");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Detiene la aplicación si hay un error
    }
};
module.exports = connectDB; 