// server/routes/patients.js (VERSIÓN COMPLETA)

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// --- GET /api/patients ---
// OBTENER TODOS LOS PACIENTES
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 }); // Ordenar por más reciente
    res.json(patients);
  } catch (err) {
    console.error('Error al obtener pacientes:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// --- GET /api/patients/count ---
// (Esta ya la teníamos, la dejamos como está)
router.get('/count', async (req, res) => {
    try {
        const count = await Patient.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error('Error al contar pacientes:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
// --- POST /api/patients ---
// CREAR UN NUEVO PACIENTE
router.post('/', async (req, res) => {
  const { name, species, breed, ownerName, ownerPhone } = req.body;

  // Validación simple
  if (!name || !species || !ownerName) {
    return res.status(400).json({ msg: 'Por favor, incluye nombre, especie y nombre del propietario.' });
  }

  try {
    const newPatient = new Patient({
      name,
      species,
      breed,
      ownerName,
      ownerPhone
    });
    const patient = await newPatient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error('Error al crear paciente:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Aquí irían las rutas para Actualizar (PUT) y Eliminar (DELETE) un paciente por su ID,
// pero con GET y POST ya podemos construir la página.

module.exports = router;