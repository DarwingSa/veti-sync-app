// server/routes/auth.js (CORREGIDO)
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// --- RUTA DE REGISTRO ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    // ¡AHORA ESTÁ EN EL LUGAR CORRECTO!
    console.error('*** ERROR EN /register ***:', error);
    res.status(500).send('Error en el servidor');
  }
});

// --- RUTA DE LOGIN ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    // Arreglado: mensaje de depuración para login y una sola respuesta.
    console.error('*** ERROR EN /login ***:', error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;