import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
    console.log('hit get project');
    
  const { skill, q } = req.query;

  let filter = {};
  if (skill) filter.skills = skill;
  if (q) filter.title = { $regex: q, $options: "i" };

  const projects = await Project.find(filter);
  res.json(projects);
});

// POST new project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

export default router;
