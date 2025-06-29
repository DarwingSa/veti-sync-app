const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true }, // Perro, Gato, etc.
  breed: { type: String }, // Labrador, Persa, etc.
  ownerName: { type: String, required: true },
  ownerPhone: { type: String },
  // ... más campos como historial médico, etc.
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);