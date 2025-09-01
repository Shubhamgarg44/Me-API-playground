import { useState } from "react";
import ProfileTab from "./components/ProfileTab";
import SkillsTab from "./components/SkillsTab";
import ProjectsTab from "./components/ProjectsTab";

export default function App() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="relative min-h-screen text-white">
      {/* Futuristic gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-black/40 backdrop-blur-lg border-r border-purple-500/30 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-10 tracking-wide">🚀 Shubham Garg</h1>
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

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10">
          {tab === "profile" && <ProfileTab />}
          {tab === "skills" && <SkillsTab />}
          {tab === "projects" && <ProjectsTab />}
        </main>
      </div>
    </div>
  );
}
