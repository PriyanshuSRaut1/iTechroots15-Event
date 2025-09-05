import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <motion.button
        onClick={() => navigate("/admin")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-red-600 rounded-md text-white font-bold hover:bg-red-700"
      >
        🔒 Go to Admin Panel
      </motion.button>
    </div>
  );
};

export default Home;
