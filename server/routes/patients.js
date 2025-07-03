// server/routes/patients.js (CÓDIGO FINAL MÁS ROBUSTO)

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// --- GET /api/patients ---
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error('Error al obtener pacientes:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// --- GET /api/patients/count ---
router.get('/count', async (req, res) => {
    try {
        const count = await Patient.countDocuments({ user: req.user.id });
        res.json({ count });
    } catch (err) {
        console.error('Error al contar pacientes:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// --- GET /api/patients/:id ---
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }
    
    // CORRECCIÓN DE ROBUSTEZ:
    // 1. Verificar si el paciente tiene un dueño asignado.
    // 2. Si lo tiene, verificar que coincida con el usuario logueado.
    if (!patient.user || patient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    res.json(patient);
  } catch (err) {
    console.error('Error al obtener paciente:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Paciente no encontrado (ID inválido)' });
    }
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// --- POST /api/patients ---
router.post('/', async (req, res) => {
  const { name, species, breed, ownerName, ownerPhone } = req.body;
  if (!name || !species || !ownerName) {
    return res.status(400).json({ msg: 'Por favor, incluye nombre, especie y nombre del propietario.' });
  }
  try {
    const newPatient = new Patient({
      user: req.user.id,
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

// --- POST /api/patients/:id/medical-records ---
router.post('/:id/medical-records', async (req, res) => {
  const { diagnosis, treatment, notes } = req.body;
  if (!diagnosis || !treatment) {
    return res.status(400).json({ msg: 'Por favor, incluye diagnóstico y tratamiento.' });
  }
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }
    
    // CORRECCIÓN DE ROBUSTEZ (aplicada también aquí):
    if (!patient.user || patient.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    const newMedicalRecord = { diagnosis, treatment, notes: notes || '' };
    patient.medicalHistory.unshift(newMedicalRecord);
    await patient.save();
    res.status(201).json(patient.medicalHistory[0]);
  } catch (err) {
    console.error('Error al añadir registro médico:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
