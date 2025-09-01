import express from "express";
import Profile from "../models/Profile.js";

const router  = express.Router();

// --------- get profile ---------------
router.get("/profile", async (req, res) =>{
    const profile =  await Profile.findOne();
    res.json(profile);
});

// -------------- post  profile --------------

router.post("/", async (req, res) =>{
    const profile = new Profile(req.body);
      await Profile.save();
      res.json(profile);
})

// ---------------- put profile or update ------------------
router.get("/", async(req, res) =>{
    const updated = await Profile.findOneAndUpdate({}, req.body, {new: true});
    Profile 
})
