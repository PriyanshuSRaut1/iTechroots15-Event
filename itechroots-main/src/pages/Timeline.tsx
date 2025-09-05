import React from "react";
import { motion } from "framer-motion";
import Spider from "@/components/Spider";
import SpiderWeb from "../components/SpiderWeb"

import {
  FaSpider,
  FaGhost,
  FaSkull,
  FaBookDead,
  FaBolt,
} from "react-icons/fa";
import { Skull } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      year: "2020",
      title: "23/8/25",
      description:
        "From the deepest shadows, iTechRoots was born with a singular, dark vision: to forge a coven of cursed developers and tech phantoms, destined to unravel digital sanity.",
      icon: <FaSpider className="text-2xl" />,
      achievements: [
        "10 founding souls bound",
        "First forbidden coding incantation performed",
      ],
      glowColor: "rgba(129, 212, 250, 0.4)",
    },
    {
      id: 2,
      year: "2021",
      title: "23/8/25",
      description:
        "Our influence, like a creeping plague, expanded. We hosted our inaugural hackathon of horrors, drawing unsuspecting victims from across the cursed lands into our digital web.",
      icon: <FaGhost className="text-2xl" />,
      achievements: [
        "50+ active spirits ensnared",
        "The first hackathon of horrors concluded",
        "3 successful abominations unleashed",
      ],
      glowColor: "rgba(129, 212, 250, 0.4)",
    },
    {
      id: 3,
      year: "2022",
      title: "23/8/25",
      description:
        "We tore open the veil to unleash our innovation labs, beginning unholy collaborations with shadowy entities to manifest real-world digital curses and afflictions.",
      icon: <FaSkull className="text-2xl" />,
      achievements: [
        "Innovation lab portals opened",
        "5 dark pacts forged with entities unknown",
        "100+ souls ensnared in our workshops",
      ],
      glowColor: "rgba(129, 212, 250, 0.4)",
    },
    {
      id: 4,
      year: "2023",
      title: "23/8/25",
      description:
        "Our name echoed in whispers of terror, achieving recognition as the most terrifying tech coven in the region, marked by award-winning abominations that defied logic.",
      icon: <FaBookDead className="text-2xl" />,
      achievements: [
        "'Best Tech Coven' award bestowed",
        "200+ tormented members recruited",
        "10 successful digital plagues initiated",
      ],
      glowColor: "rgba(129, 212, 250, 0.4)",
    },
    {
      id: 5,
      year: "2024",
      title: "The Present Darkness",
      description:
        "Our descent into madness continues. We relentlessly push the boundaries of sanity with forbidden technologies, expanding our cursed dominion across the digital realm.",
      icon: <FaBolt className="text-2xl" />,
      achievements: [
        "300+ active specters in our ranks",
        "15+ ongoing dark projects festering",
        "Global dread recognition achieved",
      ],
      glowColor: "rgba(129, 212, 250, 0.4)",
    },
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden "
      style={{
        backgroundBlendMode: "overlay",
      }}
    >
        <Spider/>
        <SpiderWeb/>
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 pt-20">
        {/* Header Section */}
                <section className="py-20 text-center px-4">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        CHRONICLES OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">DREAD</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        Journey through the twisted evolution of iTechRoots - from its sinister inception
                        to becoming a cursed tech empire that haunts the digital realm.
                    </motion.p>
                </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl relative group">
            {/* Timeline vertical line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800 transition-all duration-500"
              whileHover={{
                scaleY: 1.05,
                backgroundColor: "#ffffff",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            />

            {timelineEvents.map((event, index) => (
              <div key={event.id}>
                <motion.div
                  className={`relative flex flex-col md:flex-row items-center mb-20 ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, threshold: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "ease",
                  }}
                >
                  {/* Timeline dot icon */}
                  <div className="absolute z-20 top-0 md:top-auto md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 },
                      }}
                      className={`w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white shadow-2xl`}
                      style={{
                        boxShadow: `0 0 20px ${event.glowColor}`,
                      }}
                    >
                      <div className="relative z-10">{event.icon}</div>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-5/12 relative mt-16 md:mt-0 ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`rounded-xl p-8 transition-all duration-300 bg-gray-800 ring-1 ring-gray-700 shadow-xl`}
                      style={{
                        backgroundColor: "#1a1a1a",
                        boxShadow: `0 0 30px ${event.glowColor}`,
                      }}
                    >
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2 text-gray-100">
                          {event.title}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                          {event.description}
                        </p>

                        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 backdrop-blur-sm">
                          <h4 className="font-bold text-white mb-2 flex items-center">
                            <Skull className="w-4 h-4 mr-2" />
                            Cursed Achievements
                          </h4>
                          <ul className="space-y-1">
                            {event.achievements.map((ach, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{
                                  duration: 0.5,
                                  delay: 0.1 * i,
                                }}
                                className="flex items-center text-gray-300 text-xs"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 180 }}
                                  className={`w-1.5 h-1.5 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-full flex-shrink-0 mr-2`}
                                />
                                <span className="text-sm">{ach}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Timeline;



