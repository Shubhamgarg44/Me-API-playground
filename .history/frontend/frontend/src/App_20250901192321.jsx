import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data on mount
  useEffect(() => {
    axios.get("http://localhost:4000/profile").then(res => setProfile(res.data));
    axios.get("http://localhost:4000/projects").then(res => setProjects(res.data));
    axios.get("http://localhost:4000/skills").then(res => setSkills(res.data));
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:4000/projects?q=${search}`).then(res => setProjects(res.data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          🚀 My API Playground
        </h1>

        {/* Profile */}
        {profile && (
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex justify-center gap-4 mt-4">
              {profile.links?.github && (
                <a href={profile.links.github} target="_blank" rel="noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition">
                  GitHub
                </a>
              )}
              {profile.links?.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                  LinkedIn
                </a>
              )}
              {profile.links?.portfolio && (
                <a href={profile.links.portfolio} target="_blank" rel="noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        <h2 className="text-xl font-semibold mb-4">💡 Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {skills.map((s) => (
            <div key={s._id} className="p-4 bg-indigo-50 rounded-lg shadow-sm">
              <p className="font-medium">{s.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <h2 className="text-xl font-semibold mb-4">📂 Projects</h2>
        <div className="flex gap-2 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          >
            Search
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-indigo-700">{p.title}</h3>
              <p className="text-gray-600 mb-2">{p.description}</p>
              <div className="flex gap-3">
                {p.links?.github && (
                  <a href={p.links.github} target="_blank" rel="noreferrer"
                    className="text-sm text-gray-800 underline hover:text-black">
                    GitHub
                  </a>
                )}
                {p.links?.demo && (
                  <a href={p.links.demo} target="_blank" rel="noreferrer"
                    className="text-sm text-indigo-600 underline hover:text-indigo-800">
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
