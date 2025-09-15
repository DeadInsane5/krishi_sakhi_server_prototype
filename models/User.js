import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

export default User;
