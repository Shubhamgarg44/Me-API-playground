import { motion } from "framer-motion";

export default function ProfileTab({ profile }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      {!profile ? (
        <p className="text-gray-400">⚠️ No profile found. Please create one.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-indigo-600/30 
                     backdrop-blur-xl border border-purple-400/30 shadow-xl rounded-2xl p-6 overflow-hidden"
        >
          {/* Glow animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 animate-pulse"></div>

          {/* Profile Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar placeholder or first letter */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
              {profile.name ? profile.name[0] : "?"}
            </div>

            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-gray-300">{profile.email}</p>
            {profile.education && (
              <p className="text-gray-400 italic mt-1">{profile.education}</p>
            )}

            {/* Links */}
            <div className="flex gap-4 mt-4">
              {profile.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-800/70 text-white rounded-lg shadow hover:bg-black transition"
                >
                  GitHub
                </a>
              )}
              {profile.links?.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600/80 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  LinkedIn
                </a>
              )}
              {profile.links?.portfolio && (
                <a
                  href={profile.links.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-green-600/80 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
