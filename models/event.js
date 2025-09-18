import mongoose from "mongoose";

// Define schema + model
const eventSchema = new mongoose.Schema({
  event_type: { type: String, required: true },   // e.g., user_message, bot_reply
  user_id: { type: String },                      // user identifier
  message: { type: String },                      // user input
  response: { type: String },                     // bot reply
  timestamp: { type: Date, default: Date.now }    // auto timestamp
});

const Event = mongoose.model('Event', eventSchema);

export default Event;