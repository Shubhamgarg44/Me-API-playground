import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  // Form states
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [newProject, setNewProject] = useState({ title: "", description: "", github: "", demo: "" });

  useEffect(() => {
    axios.get("/api/profile").then(res => setProfile(res.data));
    axios.get("/api/skills").then(res => setSkills(res.data));
    axios.get("/api/projects").then(res => setProjects(res.data));
  }, []);

  const addSkill = async () => {
    const res = await axios.post("/api/skills", newSkill);
    setSkills([...skills, res.data]);
    setNewSkill({ name: "", level: 50 });
  };

  const addProject = async () => {
    const res = await axios.post("/api/projects", {
      title: newProject.title,
      description: newProject.description,
      skills: [], // can extend later
      links: { github: newProject.github, demo: newProject.demo }
    });
    setProjects([...projects, res.data]);
    setNewProject({ title: "", description: "", github: "", demo: "" });
  };

  const searchProjects = async () => {
    const res = await axios.get(`/api/projects?q=${search}`);
    setProjects(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white p-4 flex justify-center gap-8">
        <button onClick={() => setTab("profile")} className={tab==="profile" ? "font-bold underline" : ""}>Profile</button>
        <button onClick={() => setTab("skills")} className={tab==="skills" ? "font-bold underline" : ""}>Skills</button>
        <button onClick={() => setTab("projects")} className={tab==="projects" ? "font-bold underline" : ""}>Projects</button>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Tab */}
        {tab === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
            {profile ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p>{profile.email}</p>
                <div className="flex gap-3 mt-3">
                  {profile.links?.github && <a href={profile.links.github} className="text-indigo-600 underline">GitHub</a>}
                  {profile.links?.linkedin && <a href={profile.links.linkedin} className="text-blue-600 underline">LinkedIn</a>}
                  {profile.links?.portfolio && <a href={profile.links.portfolio} className="text-green-600 underline">Portfolio</a>}
                </div>
              </div>
            ) : <p>No profile found.</p>}
          </div>
        )}

        {/* Skills Tab */}
        {tab === "skills" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">💡 Skills</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {skills.map((s) => (
                <div key={s._id} className="bg-indigo-50 p-4 rounded shadow">
                  <p className="font-semibold">{s.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${s.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add skill form */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Add Skill</h2>
              <input value={newSkill.name} onChange={(e)=>setNewSkill({...newSkill, name:e.target.value})}
                placeholder="Skill name" className="border p-2 mr-2 rounded"/>
              <input type="number" value={newSkill.level} onChange={(e)=>setNewSkill({...newSkill, level:e.target.value})}
                className="border p-2 w-20 mr-2 rounded"/>
              <button onClick={addSkill} className="bg-indigo-600 text-white px-3 py-2 rounded">Add</button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {tab === "projects" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">📂 Projects</h1>
            {/* Search */}
            <div className="flex gap-2 mb-6">
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search projects..."
                className="flex-1 border px-3 py-2 rounded"/>
              <button onClick={searchProjects} className="bg-indigo-600 text-white px-4 py-2 rounded">Search</button>
            </div>
            {/* Projects list */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {projects.map((p)=>(
                <div key={p._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-gray-600">{p.description}</p>
                  <div className="flex gap-3 mt-2">
                    {p.links?.github && <a href={p.links.github} className="text-gray-800 underline">GitHub</a>}
                    {p.links?.demo && <a href={p.links.demo} className="text-indigo-600 underline">Demo</a>}
                  </div>
                </div>
              ))}
            </div>
            {/* Add project form */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Add Project</h2>
              <input value={newProject.title} onChange={(e)=>setNewProject({...newProject, title:e.target.value})}
                placeholder="Title" className="border p-2 mr-2 rounded w-full mb-2"/>
              <textarea value={newProject.description} onChange={(e)=>setNewProject({...newProject, description:e.target.value})}
                placeholder="Description" className="border p-2 rounded w-full mb-2"/>
              <input value={newProject.github} onChange={(e)=>setNewProject({...newProject, github:e.target.value})}
                placeholder="GitHub Link" className="border p-2 rounded w-full mb-2"/>
              <input value={newProject.demo} onChange={(e)=>setNewProject({...newProject, demo:e.target.value})}
                placeholder="Demo Link" className="border p-2 rounded w-full mb-2"/>
              <button onClick={addProject} className="bg-indigo-600 text-white px-3 py-2 rounded">Add Project</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
