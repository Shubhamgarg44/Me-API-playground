import express from "express";
import Skill from "../models/Skills.js";

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
    console.log('hit skill');
    
  const skills = await Skill.find();
  res.json(skills);
});

// GET top skills
router.get("/top", async (req, res) => {
    console.log('hit /top skill');
    
  const skills = await Skill.find().sort({ level: -1 }).limit(3);
  res.json(skills);
});

export default router;
