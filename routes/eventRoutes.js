const express = require('express');
const Event = require('../models/event');

const router = express.Router();

// POST → add new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET → fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: 1 });
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;