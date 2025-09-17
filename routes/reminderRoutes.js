import express from "express";
import schedule from "node-schedule";
import UserPref from "../models/userPref.js";

const router = express.Router();

// Store scheduled jobs in memory
const scheduledJobs = {};

// 1. Save user preferences
router.post('/prefs', async (req, res) => {
  try {
    const pref = new UserPref(req.body);
    await pref.save();
    res.status(201).send(pref);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 2. Get user preferences
router.get('/prefs/:user_id', async (req, res) => {
  try {
    const pref = await UserPref.findOne({ user_id: req.params.user_id });
    res.send(pref || { message: "No preferences found" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 3. Schedule a reminder for a user
router.post('/schedule', async (req, res) => {
  try {
    const { user_id, message, date } = req.body; // date = "2025-09-20T09:00:00Z"

    const reminderDate = new Date(date);
    if (isNaN(reminderDate)) {
      return res.status(400).send({ error: "Invalid date format" });
    }

    // Cancel old job if exists
    if (scheduledJobs[user_id]) {
      scheduledJobs[user_id].cancel();
    }

    // Schedule new job
    const job = schedule.scheduleJob(reminderDate, function () {
      console.log(`Reminder for user ${user_id}: ${message}`);
      // In real system → push notification / SMS / email / chatbot message
    });

    scheduledJobs[user_id] = job;
    res.send({ status: "Scheduled", user_id, date, message });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;