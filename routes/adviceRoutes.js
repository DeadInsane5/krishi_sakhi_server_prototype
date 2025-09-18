import express from "express";
import Rule from "../models/rule.js";

const router = express.Router();

// 1. Add new rule
router.post('/api/rules', async (req, res) => {
  try {
    const rule = new Rule(req.body);
    await rule.save();
    res.status(201).send(rule);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2. Get all rules
router.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.send(rules);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 3. Generate advice based on condition (simple lookup)
router.post('/api/advice', async (req, res) => {
  try {
    const { condition } = req.body;  // e.g., { "condition": "soil_type=loamy" }
    const rule = await Rule.findOne({ condition });

    if (rule) {
      res.send({ advice: rule.advice });
    } else {
      res.send({ advice: "No advice available for this condition." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;