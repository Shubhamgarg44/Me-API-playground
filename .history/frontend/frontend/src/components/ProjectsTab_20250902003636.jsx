import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./model";

export default function ProjectsTab({ profile }) {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [newProject, setNewProject] = useState({ title: "", description: "", github: "", demo: "" });
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", github: "", demo: "" });

  useEffect(() => {
    axios.get("/api/projects").then(res => setProjects(res.data));
  }, []);

  const searchProjects = async () => {
    const res = await axios.get(`/api/projects?q=${search}`);
    setProjects(res.data);
  };

  const addProject = async () => {
    const res = await axios.post("/api/projects", {
      title: newProject.title,
      description: newProject.description,
      skills: [],
      links: { github: newProject.github, demo: newProject.demo }
    });
    setProjects([...projects, res.data]);
    setNewProject({ title: "", description: "", github: "", demo: "" });
  };

  const deleteProject = async (id) => {
    await axios.delete(`/api/projects/${id}`);
    setProjects(projects.filter(p => p._id !== id));
  };

  const openEdit = (proj) => {
    setEditing(proj);
    setEditForm({
      title: proj.title,
      description: proj.description,
      github: proj.links?.github || "",
      demo: proj.links?.demo || ""
    });
  };

  const saveEdit = async () => {
    const res = await axios.put(`/api/projects/${editing._id}`, {
      title: editForm.title,
      description: editForm.description,
      links: { github: editForm.github, demo: editForm.demo }
    });
    setProjects(projects.map(p => (p._id === editing._id ? res.data : p)));
    setEditing(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📂 Projects</h1>

      {/* ✅ Conditional: show warning if no profile */}
      {!profile ? (
        <p className="text-center text-gray-400 bg-white/10 p-4 rounded-lg">
          ⚠️ Please create a profile before adding projects.
        </p>
      ) : (
        <>
          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="flex-1 border p-2 rounded bg-black/30 text-white"
            />
            <button onClick={searchProjects} className="bg-purple-600 px-4 py-2 rounded">
              Search
            </button>
          </div>

          {/* Project List */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {projects.map((p) => (
              <div key={p._id} className="bg-white/10 p-4 rounded shadow border border-purple-500/30">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-gray-300">{p.description}</p>
                <div className="flex gap-3 mt-2">
                  {p.links?.github && <a href={p.links.github} className="text-purple-400 underline">GitHub</a>}
                  {p.links?.demo && <a href={p.links.demo} className="text-indigo-400 underline">Demo</a>}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(p)} className="bg-purple-600 px-2 py-1 rounded text-sm">Edit</button>
                  <button onClick={() => deleteProject(p._id)} className="bg-red-600 px-2 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Project Form */}
          <div className="bg-white/10 p-4 rounded shadow border border-purple-500/30">
            <h2 className="font-semibold mb-2">Add Project</h2>
            <input
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Title"
              className="border p-2 rounded w-full mb-2 bg-black/30 text-white"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Description"
              className="border p-2 rounded w-full mb-2 bg-black/30 text-white"
            />
            <input
              value={newProject.github}
              onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
              placeholder="GitHub link"
              className="border p-2 rounded w-full mb-2 bg-black/30 text-white"
            />
            <input
              value={newProject.demo}
              onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
              placeholder="Demo link"
              className="border p-2 rounded w-full mb-2 bg-black/30 text-white"
            />
            <button onClick={addProject} className="bg-purple-600 px-4 py-2 rounded">Add Project</button>
          </div>

          {/* Edit Modal */}
          <Modal show={!!editing} onClose={() => setEditing(null)}>
            <h2 className="text-xl font-bold mb-4">✏️ Edit Project</h2>
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <input
              value={editForm.github}
              onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <input
              value={editForm.demo}
              onChange={(e) => setEditForm({ ...editFor
