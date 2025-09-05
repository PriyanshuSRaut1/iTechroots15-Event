import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaDoorClosed, FaExclamationTriangle, FaSkullCrossbones } from "react-icons/fa"; // Added FaSkullCrossbones

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center pt-20 bg-black text-white font-serif" // Added bg-black and font-serif
    >
      <div className="text-center bg-gray-900 border-2 border-red-800 p-8 rounded-lg shadow-lg"> {/* Added horror-themed styling */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaSkullCrossbones className="text-6xl text-red-600 mx-auto mb-6 animate-pulse" /> {/* Changed icon and added pulse animation */}
        </motion.div>
        
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-4 text-red-600 animate-pulse" // Updated text color and animation
        >
          404: Lost Soul
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-400 mb-8 font-sans" // Updated text color and font
        >
          Alas, this path leads only to the void. The page you seek has vanished into the digital abyss.
        </motion.p>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)" // Red shadow for horror theme
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2 mx-auto" // Updated button styling
            >
              <FaDoorClosed /> {/* Changed icon to FaDoorClosed */}
              Escape to Sanctuary
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;