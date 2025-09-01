import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProfileForm from "./ProfileForm";

export default function ProfileTab() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get("/api/profile").then(res => setProfile(res.data));
  }, []);

  const deleteProfile = async () => {
    await axios.delete("/api/profile");
    setProfile(null);  // clears profile
    window.location.reload(); // optional: refresh UI to clear skills/projects
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
      {profile && !editing ? (
        <motion.div
          className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-purple-500/30 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-300">{profile.email}</p>
          <div className="flex gap-3 mt-3">
            {profile.links?.github && <a href={profile.links.github} className="text-purple-400 hover:underline">GitHub</a>}
            {profile.links?.linkedin && <a href={profile.links.linkedin} className="text-blue-400 hover:underline">LinkedIn</a>}
            {profile.links?.portfolio && <a href={profile.links.portfolio} className="text-green-400 hover:underline">Portfolio</a>}
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setEditing(true)} className="bg-purple-600 px-4 py-2 rounded">Edit</button>
            <button onClick={deleteProfile} className="bg-red-600 px-4 py-2 rounded">Delete</button>
          </div>
        </motion.div>
      ) : (
        <ProfileForm onProfileCreated={setProfile} existing={profile} onCancel={() => setEditing(false)} />
      )}
    </div>
  );
}
