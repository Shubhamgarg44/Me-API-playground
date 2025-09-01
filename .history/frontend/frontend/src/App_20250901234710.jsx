import ProfileTab from "./components/ProfileTab";
import SkillsTab from "./components/SkillsTab";
import ProjectsTab from "./components/ProjectsTab";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [tab, setTab] = useState("profile");
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Greeting logic
  const hour = time.getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = " Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = " Good Evening";

  return (
    <div className="relative min-h-screen text-white">
      {/* Futuristic gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex h-screen">
        {/* Sidebar (unchanged) */}
        <aside className="w-64 bg-black/40 backdrop-blur-lg border-r border-purple-500/30 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-10 tracking-wide">Shubham Garg</h1>
            <nav className="space-y-4">
              <button
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                  tab === "profile" ? "bg-purple-600/70" : "hover:bg-purple-500/20"
                }`}
                onClick={() => setTab("profile")}
              >
                👤 Profile
              </button>
              <button
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                  tab === "skills" ? "bg-purple-600/70" : "hover:bg-purple-500/20"
                }`}
                onClick={() => setTab("skills")}
              >
                💡 Skills
              </button>
              <button
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                  tab === "projects" ? "bg-purple-600/70" : "hover:bg-purple-500/20"
                }`}
                onClick={() => setTab("projects")}
              >
                📂 Projects
              </button>
            </nav>
          </div>
          <p className="text-sm text-gray-400">Made with ❤️ using MERN</p>
        </aside>

        {/* Main Content with Header */}
        <div className="flex-1 flex flex-col">
          {/* Header Bar */}
          <header className="flex justify-between items-center px-6 py-4 bg-black/20 border-b border-purple-500/30 backdrop-blur-md">
  
  {/* Tagline in center */}
  <div className="flex-1 text-center">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-gradient">
      👋 Welcome, Shubham Garg 
    </h2>
  </div>

  {/* Profile Photo on right */}
  <motion.img
    src="https://i.pravatar.cc/100?img=12" // replace with your actual photo
    alt="Profile"
    className="w-12 h-12 rounded-full border-2 border-purple-400 shadow-lg"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 200 }}
  />
</header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-10">
            {tab === "profile" && <ProfileTab />}
            {tab === "skills" && <SkillsTab />}
            {tab === "projects" && <ProjectsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
