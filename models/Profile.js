const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  crop: String,
  soilType: String,
  irrigation: String,
});

module.exports = mongoose.model("Profile", profileSchema);
