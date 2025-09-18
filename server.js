import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import profileRoutes from "./routes/profileRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adviceRoutes from "./routes/adviceRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import knowledgeRoutes from "./routes/knowledgeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/farmerDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1); // Exit process on DB connection failure
  }
}

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/chat", conversationRoutes);
app.use("/api/activity", eventRoutes);
app.use("/api/advice", adviceRoutes);
app.use("/api/alerts", reminderRoutes);
app.use("/api/knowledge", knowledgeRoutes);

// Base Route
app.get("/", (req, res) => {
  try {
    res.send("🌱 Farmer API is running...");
  } catch (err) {
    console.error("❌ Error in base route:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server Startup Error:", err);
    process.exit(1);
  }
}

startServer();