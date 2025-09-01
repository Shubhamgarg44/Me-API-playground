import { useEffect, useState } from "react";
import axios from "axios";
import ProfileForm from "./ProfileForm";

export default function ProfileTab() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/api/profile").then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
      {profile ? (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-purple-500/30 shadow-lg">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-300">{profile.email}</p>
          <div className="flex gap-3 mt-3">
            {profile.links?.github && <a href={profile.links.github} className="text-purple-400 hover:underline">GitHub</a>}
            {profile.links?.linkedin && <a href={profile.links.linkedin} className="text-blue-400 hover:underline">LinkedIn</a>}
            {profile.links?.portfolio && <a href={profile.links.portfolio} className="text-green-400 hover:underline">Portfolio</a>}
          </div>
        </div>
      ) : (
        <ProfileForm onProfileCreated={setProfile} />
      )}
    </div>
  );
}
