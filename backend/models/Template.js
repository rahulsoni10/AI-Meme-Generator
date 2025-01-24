const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  // Add other fields if needed (e.g., width, height, default text areas)
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);