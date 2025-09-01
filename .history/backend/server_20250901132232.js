import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

// health check 
app.get("/health", (req,res) =>{
    res.status(200).json({message:"ok"});
});

// Routes
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/project.js";
import skillRoutes from "./routes/skill.js";

app.use("/profile", profileRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);

// DB + Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.error(err));