const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/farmerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routes
app.use("/api/profile", profileRoutes);

// Base Route (optional)
app.get("/", (req, res) => {
  res.send("🌱 Farmer API is running...");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
