import express from "express";
import Knowledge from "../models/knowledge.js";

const router = express.Router();

// 1. Add knowledge entry
router.post('/', async (req, res) => {
  try {
    const knowledge = new Knowledge(req.body);
    await knowledge.save();
    res.status(201).send(knowledge);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2. Get all knowledge
router.get('/', async (req, res) => {
  try {
    const knowledge = await Knowledge.find();
    res.send(knowledge);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 3. Get knowledge by filters (category, crop, region)
router.get('/search', async (req, res) => {
  try {
    const { category, crop, region } = req.query;
    const query = {};

    if (category) query.category = category;
    if (crop) query.crop = crop;
    if (region) query.region = region;

    const knowledge = await Knowledge.find(query);
    res.send(knowledge);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;