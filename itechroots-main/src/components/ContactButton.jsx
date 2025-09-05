import React from "react";
import { motion } from "framer-motion";

// Simplified button variants with only a hover effect
const buttonVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)",
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
};

// Lightweight RGB split effect for hover
const rgbSplitVariants = {
    initial: {
        textShadow: "1px 0 #ff0000, -1px 0 #00ffff"
    },
    hover: {
        textShadow: "2px 0 #ff0000, -2px 0 #00ffff"
    }
};

const ContactButton = () => {
    return (
        <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative h-14 px-6 p-2 font-bold rounded-lg transition-all duration-200 flex items-center justify-center overflow-hidden transform hover:-translate-y-1 group cursor-pointer"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(5px)",
                fontFamily: "monospace",
                fontSize: "1rem",
                letterSpacing: "1px"
            }}
        >
            {/* Main text with RGB split effect */}
            <motion.span 
                variants={rgbSplitVariants}
                initial="initial"
                whileHover="hover"
                className="relative z-20 text-white font-mono tracking-wider group-hover:text-cyan-300 transition-colors duration-200"
            >
                SUMMON THE FORM
            </motion.span>

            {/* Simple corner indicators - only show on hover */}
            <motion.div 
                className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-70"
                transition={{ duration: 0.2 }}
            />
            <motion.div 
                className="absolute bottom-1 right-1 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-70"
                transition={{ duration: 0.2, delay: 0.1 }}
            />
        </motion.button>
    );
};

export default ContactButton;