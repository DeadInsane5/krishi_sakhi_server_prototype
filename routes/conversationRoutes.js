import express from "express";
import multer from "multer";
import Conversation from "../models/conversation.js";

const router = express.Router();

// Multer setup for voice files
const upload = multer({ dest: "uploads/" });

// 1. Handle text query
router.post("/text", async (req, res) => {
  try {
    const { user_id, query } = req.body;

    // Call Ollama
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:270m",
        prompt: query,
        format: "json",
        stream: false,
        options: { seed: 123 },
      }),
    });

    const data = await response.json();

    // ✅ Parse Ollama’s escaped JSON string
    const parsed = JSON.parse(data.response);

    // ✅ Remove outer braces and format display
    const displayText = Object.entries(parsed)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    console.log("📝 Bot reply:", displayText);

    // Save to DB
    const convo = new Conversation({
      user_id,
      query_text: query,
      response_text: displayText, // already cleaned
      query_type: "text",
    });
    await convo.save();

    // ✅ Return clean text back to frontend
    res.json({ reply: displayText });
  } catch (err) {
    console.error("❌ Chat API error:", err);
    res.status(500).json({ error: "Chat processing failed", details: err.message });
  }
});

// 2. Handle voice query (upload audio file)
router.post("/voice", upload.single("voice"), async (req, res) => {
  try {
    const { user_id } = req.body;
    const voiceFile = req.file;

    // ✅ TODO: Integrate Speech-to-Text API for Malayalam
    const transcribed = "ഇത് ഒരു ഡെമോ വോയ്സ് ഇൻപുട്ടാണ്"; // "This is a demo voice input"
    const response = { answer: `വോയ്സ് പ്രോസസ്സ് ചെയതു: ${transcribed}` };

    const convo = new Conversation({
      user_id,
      query_text: transcribed,
      response_text: JSON.stringify(response),
      query_type: "voice",
    });
    await convo.save();

    res.json({ transcript: transcribed, reply: response });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 3. Get conversation history
router.get("/:user_id", async (req, res) => {
  try {
    const history = await Conversation.find({ user_id: req.params.user_id });
    res.send(history);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
