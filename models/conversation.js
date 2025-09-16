const mongoose = require('mongoose');

// Store conversation history (Malayalam/English)
const conversationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  query_text: { type: String, required: true },   // Malayalam / English
  response_text: { type: String },                // Bot’s reply
  query_type: { type: String, enum: ["text", "voice"], default: "text" },
  created_at: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
