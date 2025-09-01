import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// GET profile
router.get("/", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// POST profile (create if none exists)
router.post("/", async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      return res.status(400).json({ error: "Profile already exists. Use PUT to update." });
    }
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT profile (update existing)
router.put("/", async (req, res) => {
  const updated = await Profile.findOneAndUpdate({}, req.body, { new: true });
  res.json(updated);
});

export default router;
