import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">💡 Skills</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {skills.map((s) => (
          <div key={s._id} className="p-4 bg-white/10 backdrop-blur-lg rounded shadow border border-purple-500/30">
            <p className="font-semibold">{s.name}</p>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${s.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white/10 backdrop-blur-lg p-4 rounded shadow border border-purple-500/30">
        <h2 className="font-semibold mb-2">Add Skill</h2>
        <input value={newSkill.name} onChange={(e)=>setNewSkill({...newSkill, name:e.target.value})}
          placeholder="Skill name" className="border p-2 rounded mr-2 bg-black/30 text-white"/>
        <input type="number" value={newSkill.level} onChange={(e)=>setNewSkill({...newSkill, level:e.target.value})}
          className="border p-2 w-20 rounded mr-2 bg-black/30 text-white"/>
        <button onClick={addSkill} className="bg-purple-600 px-3 py-2 rounded text-white">Add</button>
      </div>
    </div>
  );
}
