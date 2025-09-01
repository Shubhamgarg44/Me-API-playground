import express from "express";
import Skill from "../models/Skills.js";

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    console.log("GET /skills");
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET top skills
router.get("/top", async (req, res) => {
  try {
    console.log("GET /skills/top");
    const skills = await Skill.find().sort({ level: -1 }).limit(3);
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new skill
router.post("/", async (req, res) => {
  try {
    console.log("POST /skills", req.body);
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
