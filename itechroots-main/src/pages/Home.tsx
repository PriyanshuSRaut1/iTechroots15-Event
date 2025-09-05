// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSkull } from "react-icons/fa";
import useScrollAnimation from "../hooks/useScrollAnimation";

import ExploreButton from "../components/ExploreButton";
import bgVideo from "../assets/videos/bg.webm";

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex justify-center gap-6 md:gap-10 text-center my-8 text-gray-200"
    >
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-bold font-creepy drop-shadow-lg text-white">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

const Home = () => {
  const heroAnimation = useScrollAnimation(
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0 }
  );

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: 1.0,
        type: "spring",
        stiffness: 150,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Define the target date for the countdown
  const targetDate = new Date("2025-08-22T00:00:00");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-15 bg-black text-white font-serif"
    >
      <motion.section
        ref={heroAnimation.ref}
        animate={heroAnimation.controls}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container mx-auto px-4 text-center relative z-30">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.h1
              variants={floatingVariants}
              animate="animate"
              className="text-8xl md:text-8xl font-bold mb-6 relative"
              style={{
                background:
                  "linear-gradient(135deg, #0047ab 0%, #0073e6 25%, #0047ab 50%, #002c8c 75%, #0059b3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(0, 0, 255, 0.5))",
              }}
            >
              <motion.span
                className="relative"
                style={{
                  background:
                    "linear-gradient(135deg, #0066ff 0%, #00bfff 25%, #1e90ff 50%, #87ceeb 75%, #4169e1 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 15px rgba(0, 150, 255, 0.6))",
                  fontFamily: "hand",
                  letterSpacing: "2px",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {`iTechr0}ts 15.0`}
              </motion.span>
            </motion.h1>

            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                // Red glowing effect is now removed, using a transparent background
                background: "transparent",
                filter: "blur(20px)",
              }}
              variants={pulseVariants}
              animate="animate"
            />
          </motion.div>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-xl mb-8 max-w-2xl mx-auto font-serif relative text-slate-400"
            style={{
              backgroundClip: "text",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))",
            }}
          >
            Where forbidden technology meets digital torment. Join us in
            unearthing the cursed realms of code and madness.
          </motion.p>

          <CountdownTimer targetDate={targetDate} />

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex sm:flex-row gap-4 justify-center"
          >
            <Link to="/explore">
              <ExploreButton />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-24 left-10 w-20 h-20 border-l-4 border-t-4 border-gray-300 opacity-50"
          animate={{
            borderColor: ["#6b7280", "#4b5563", "#6b7280"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-gray-300 opacity-50"
          animate={{
            borderColor: ["#6b7280", "#4b5563", "#6b7280"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </motion.section>
    </motion.div>
  );
};

export default Home;