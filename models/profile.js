import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  crop: String,
  soilType: String,
  irrigation: String,
});

export default mongoose.model("Profile", profileSchema);