const mongoose = require('mongoose');

// User Preferences Schema
const userPrefSchema = new mongoose.Schema({
  user_id: { type: String, required: true },   // link to chatbot user
  receive_operations: { type: Boolean, default: false }, // farm ops alerts
  receive_deadlines: { type: Boolean, default: false },  // deadlines
  receive_price_trends: { type: Boolean, default: false }, // price updates
  preferred_time: { type: String, default: "09:00" },   // daily reminder time (HH:mm)
  created_at: { type: Date, default: Date.now }
});

const UserPref = mongoose.model('UserPref', userPrefSchema);

module.exports = UserPref;
