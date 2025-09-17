import mongoose from "mongoose";

// Rules for generating advice
const ruleSchema = new mongoose.Schema({
  condition: { type: String, required: true },   // e.g., "soil_type=loamy"
  advice: { type: String, required: true },      // e.g., "Grow wheat and pulses"
  created_at: { type: Date, default: Date.now }
});

const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;