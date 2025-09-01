# Me-API Playground 🚀

A full-stack MERN playground that stores and exposes my profile information via a clean API, with a minimal but interactive frontend.

## 🌟 Features
- **Profile Management**: Create, view, edit, delete profile with name, email, education, and links (GitHub, LinkedIn, Portfolio).
- **Projects**: Add, search, edit, delete projects with title, description, skills, and links.
- **Skills**: Add, edit, delete skills with proficiency level and progress bar UI.
- **Search & Query Support**:
  - `/projects?q=react`
  - `/skills/top`
  - `/health` endpoint for liveness.
- **Interactive UI**: Built with React + Vite + Tailwind + Framer Motion for animations.
- **CRUD Support**: All entities (profile, skills, projects) are fully editable.

---

## 🏗️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Hosting**:  
  - Frontend → [Vercel](https://me-api-playground-pcj54muf2-shubhamgarg44s-projects.vercel.app/)  
  - Backend → [Render](https://me-api-playground-1rzw.onrender.com)  

---

## 📂 Architecture
\/backend
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── server.js # Entry point
/frontend
├── src/components/ # UI components
├── src/App.jsx # Main frontend



---

## ⚙️ Setup Instructions

### 🔹 Local Development
1. Clone the repo:
   ```bash
   git clone https://github.com/Shubhamgarg44/Me-API-playground.git
   cd Me-API-playground

   Setup backend:

cd backend
npm install
npm run dev


Add a .env file:

MONGO_URI=your-mongodb-uri
PORT=4000


Setup frontend:

cd ../frontend
npm install
npm run dev


Add a .env file:

VITE_API_URL=http://localhost:4000


Open:

Backend → http://localhost:4000

Frontend → http://localhost:5173

🔹 Production (Live Links)

Frontend: Vercel Link

Backend: Render Link

Health Check: Health Endpoint

📖 API Documentation
Profile

GET /profile

POST /profile

PUT /profile/:id

DELETE /profile/:id

Skills

GET /skills

POST /skills

PUT /skills/:id

DELETE /skills/:id

GET /skills/top

Projects

GET /projects

GET /projects?q=keyword

POST /projects

PUT /projects/:id

DELETE /projects/:id

Health

GET /health → returns { message: "ok" }

Known Limitations

No authentication or rate limiting (nice-to-have).

Currently only supports single profile.

Database connection assumes MongoDB Atlas.


📄 Resume
https://drive.google.com/file/d/10OG3ftHdGZhaljZ-gT23KUwZHdCMWD95/view?usp=sharing

## LINK
https://me-api-playground-pcj54muf2-shubhamgarg44s-projects.vercel.app/
