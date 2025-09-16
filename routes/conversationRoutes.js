const express = require('express');
const multer = require('multer');   // for voice uploads
const path = require('path');
const fs = require('fs');
const Conversation = require('../models/conversation');

const router = express.Router();

// Multer setup for voice files
const upload = multer({ dest: 'uploads/' });

// 1. Handle text query
router.post('/text', async (req, res) => {
  try {
    const { user_id, query } = req.body;

    // Here you can plug in ML/NLP logic (Malayalam processing)
    const response = "നിങ്ങൾ പറഞ്ഞത്: ${query}"; // Simple echo in Malayalam

    const convo = new Conversation({
      user_id,
      query_text: query,
      response_text: response,
      query_type: "text"
    });

    await convo.save();

    res.send({ reply: response });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2. Handle voice query (upload audio file)
router.post('/voice', upload.single('voice'), async (req, res) => {
  try {
    const { user_id } = req.body;
    const voiceFile = req.file;

    // ✅ TODO: Integrate Speech-to-Text API for Malayalam
    // For now, just fake a response
    const transcribed = "ഇത് ഒരു ഡെമോ വോയ്സ് ഇൻപുട്ടാണ്"; // "This is a demo voice input"
    const response = "വോയ്സ് പ്രോസസ്സ് ചെയതു: ${transcribed}";

    const convo = new Conversation({
      user_id,
      query_text: transcribed,
      response_text: response,
      query_type: "voice"
    });

    await convo.save();

    res.send({ transcript: transcribed, reply: response });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 3. Get conversation history
router.get('/:user_id', async (req, res) => {
  try {
    const history = await Conversation.find({ user_id: req.params.user_id });
    res.send(history);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;