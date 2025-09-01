import express from "express";
import Profile from "../models/Profile.js";

const router  = express.Router();

// --------- get profile ---------------
router.get("/profile", async (req, res) =>{
    const profile =  await Profile.findOne();
    res.json(profile);
});

// -------------- put profile --------------

router.post("/", async (req, res) =>{
    const profile = new Profile(req.body);
      await Profile.save();
})
