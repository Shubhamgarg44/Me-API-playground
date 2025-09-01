import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: String,
    links:{
        github: String,
        linkdin: String,
        portfolio: String,
    }
})

export default mongoose.models("profile")