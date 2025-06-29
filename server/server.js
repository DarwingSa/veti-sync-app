// server/server.js (VERSIÓN FINAL DE DEPURACIÓN CON ESPÍA)

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares Globales ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =================================================================
// ===================== MIDDLEWARE ESPÍA ==========================
// Este middleware se ejecutará en CADA petición, después de body-parser
// pero antes de que llegue a nuestras rutas.
app.use((req, res, next) => {
  console.log('---------------------------------');
  console.log('¡NUEVA PETICIÓN RECIBIDA!');
  console.log('MÉTODO:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('REQ.BODY ANTES DE LAS RUTAS:', req.body);
  console.log('---------------------------------');
  next(); // <-- ¡Muy importante! Pasa la petición al siguiente middleware o ruta.
});
// =================================================================
// =================================================================


// --- Conexión a la Base de Datos ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// --- Definición de Rutas ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', authMiddleware, require('./routes/patients'));

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});