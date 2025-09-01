import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });

  useEffect(() => {
    axios.get("/api/skills").then(res => setSkills(res.data));
  }, []);

  const addSkill = async () => {
    const res = await axios.post("/api/skills", newSkill);
    setSkills([...skills, res.data]);
    setNewSkill({ name: "", level: 50 });
  };

  const deleteSkill = async (id) => {
    await axios.delete(`/api/skills/${id}`);
    setSkills(skills.filter(s => s._id !== id));
  };

  const updateSkill = async (id, updated) => {
    const res = await axios.put(`/api/skills/${id}`, updated);
    setSkills(skills.map(s => (s._id === id ? res.data : s)));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">💡 Skills</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {skills.map((s) => (
          <motion.div
            key={s._id}
            className="p-4 bg-white/10 backdrop-blur-lg rounded shadow border border-purple-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-semibold">{s.name}</p>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${s.level}%` }}></div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => updateSkill(s._id, { ...s, level: s.level + 5 })} className="bg-purple-600 px-2 py-1 rounded text-sm">+5%</button>
              <button onClick={() => deleteSkill(s._id)} className="bg-red-600 px-2 py-1 rounded text-sm">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="bg-white/10 backdrop-blur-lg p-4 rounded shadow border border-purple-500/30">
        <h2 className="font-semibold mb-2">Add Skill</h2>
        <input value={newSkill.name} onChange={(e)=>setNewSkill({...newSkill, name:e.target.value})}
          placeholder="Skill name" className="border p-2 rounded mr-2 bg-black/30 text-white"/>
        <input type="number" value={newSkill.level} onChange={(e)=>setNewSkill({...newSkill, level:e.target.value})}
          className="border p-2 w-20 rounded mr-2 bg-black/30 text-white"/>
        <button onClick={addSkill} className="bg-purple-600 px-3 py-2 rounded">Add</button>
      </div>
    </div>
  );
}
