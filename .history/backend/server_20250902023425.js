import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
  }));

// health check 
app.get("/health", (req,res) =>{
    res.status(200).json({message:"ok"});
});

// Routes
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/project.js";
import skillRoutes from "./routes/skill.js";

app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);


const PORT = process.env.PORT || 4000;   // ✅ dynamic for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));