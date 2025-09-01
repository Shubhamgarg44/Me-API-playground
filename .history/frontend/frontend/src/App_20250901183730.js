import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/profile").then(res => setProfile(res.data));
    axios.get("http://localhost:3000/projects").then(res => setProjects(res.data));
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:4000/projects?q=${search}`).then(res => setProjects(res.data));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My API Playground</h1>
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <a href={profile.links.github}>GitHub</a>
        </div>
      )}

      <hr />
      <h2>Projects</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
