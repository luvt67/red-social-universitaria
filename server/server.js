// Importaciones
const { verifyConnectionAndRelations } = require('./models');
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());
app.use(cors());

// =================================== RUTAS ==================================
app.use('/api/users', userRoutes);
app.use('/api/publications',postRoutes);
app.use('/api/comments', commentRoutes);
// ============================================================================
// ================================ RUTAS ESTATICAS ===========================
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
// ============================================================================

// ============================== INICIO DEL SERVIDOR =========================
async function startServer() {
  try {
    const isReady = await verifyConnectionAndRelations(); // Verificar base de datos

    if (isReady) {
      app.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
      });
    } else {
      console.log('Hubo un problema con la base de datos, no se pudo iniciar el servidor.');
    }
  } catch (error) {
    console.error('Error al verificar la conexión y relaciones:', error);
  }
}
// Iniciar el servidor
startServer();
// ===========================================================================
