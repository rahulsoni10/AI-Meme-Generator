const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  text: { type: String },
  customizations: {
    font: { type: String },
    color: { type: String },
    // ... other customization options
  },
  imageUrl: { type: String }, // URL of the generated meme image
}, { timestamps: true });

module.exports = mongoose.model('Meme', MemeSchema);