import { useState } from "react";
import axios from "axios";

export default function ProfileForm({ onProfileCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/profile", {
      name: form.name,
      email: form.email,
      education: form.education,
      links: {
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio,
      }
    });
    onProfileCreated(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
        className="w-full border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
        className="w-full border p-2 rounded" required />
      <input name="education" value={form.education} onChange={handleChange} placeholder="Education"
        className="w-full border p-2 rounded" />
      <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub link"
        className="w-full border p-2 rounded" />
      <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn link"
        className="w-full border p-2 rounded" />
      <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio link"
        className="w-full border p-2 rounded" />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save Profile</button>
    </form>
  );
}
