const mongoose = require('mongoose');

// Knowledge base schema (crop calendars, pests, practices)
const knowledgeSchema = new mongoose.Schema({
  category: { type: String, required: true },   // e.g., "crop_calendar", "pest", "best_practice"
  crop: { type: String },                       // e.g., "Wheat", "Rice"
  region: { type: String },                     // e.g., "Punjab"
  data: { type: mongoose.Schema.Types.Mixed },  // flexible JSON field
  created_at: { type: Date, default: Date.now }
});

const Knowledge = mongoose.model('Knowledge', knowledgeSchema);

module.exports = Knowledge;
