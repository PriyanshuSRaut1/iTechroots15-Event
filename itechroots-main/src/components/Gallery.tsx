import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const Gallery = () => {
    const INITIAL_DISPLAY_COUNT = 6;
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

    const galleryImages = [
        {
            id: 1,
            title: "Hackathon of Horrors 2024",
            category: "Rituals",
            image: "https://placehold.co/400x267/330000/FF0000?text=Hackathon+Horror",
            description: "A 48-hour coding marathon where sanity was tested and digital abominations were born."
        },
        {
            id: 2,
            title: "Forbidden Tech Workshop",
            category: "Learning",
            image: "https://placehold.co/250x140/330000/FF0000?text=Forbidden+Workshop",
            description: "Delving into the dark arts of React & TypeScript, uncovering hidden vulnerabilities."
        },
        {
            id: 3,
            title: "Coven Bonding Ceremony",
            category: "Community",
            image: "https://placehold.co/250x140/330000/FF0000?text=Coven+Bonding",
            description: "Strengthening our bonds through shared nightmares and digital pacts."
        },
        {
            id: 4,
            title: "Innovation Lair",
            category: "Research",
            image: "https://placehold.co/250x187/330000/FF0000?text=Innovation+Lair",
            description: "Exploring new, unsettling technologies within the depths of our research facility."
        },
        {
            id: 5,
            title: "Abomination Showcase",
            category: "Showcase",
            image: "https://placehold.co/250x140/330000/FF0000?text=Abomination+Showcase",
            description: "Unveiling the terrifying projects and digital entities created by our legion."
        },
        {
            id: 6,
            title: "Spectral Code Review",
            category: "Learning",
            image: "https://placehold.co/250x140/330000/FF0000?text=Spectral+Code",
            description: "Collaborative development sessions, haunted by the specters of past errors."
        },
        {
            id: 7,
            title: "The Whispering Walls",
            category: "Atmosphere",
            image: "https://placehold.co/250x140/330000/FF0000?text=Whispering+Walls",
            description: "A glimpse into the eerie ambiance of our digital crypt."
        },
        {
            id: 8,
            title: "Forgotten Algorithms",
            category: "Research",
            image: "https://placehold.co/250x140/330000/FF0000?text=Forgotten+Algorithms",
            description: "Rediscovering ancient, powerful algorithms that should have remained buried."
        },
        {
            id: 9,
            title: "The Digital Curse",
            category: "Projects",
            image: "https://placehold.co/250x140/330000/FF0000?text=Digital+Curse",
            description: "A project that embodies the true essence of digital torment."
        }
    ];

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + 3, galleryImages.length));
    };

    const handleShowLess = () => {
        setDisplayCount(INITIAL_DISPLAY_COUNT);
    };

    return (
        <section className="py-16 bg-black text-white font-serif">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-600 animate-pulse">
                        Gallery of <span className="text-gray-400">Horrors</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-sans">
                        Capturing chilling moments from our journey through the cursed tech landscape. Beware what you behold.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense">
                    {galleryImages.slice(0, displayCount).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`group relative`}
                        >
                            <div className="bg-gray-900 border-2 border-red-800 rounded-lg overflow-hidden h-full">
                                <div className="w-full h-24 flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300 blur-sm group-hover:blur-0 rounded-t-md"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/400x225/330000/FF0000?text=Image+Corrupted";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-red-900/20 rounded-full backdrop-blur-sm border border-red-700/30"
                                        >
                                            <FaEye className="text-red-500 text-lg animate-pulse" />
                                        </motion.div>
                                    </div>
                                    <div className="absolute top-2 left-2">
                                        <span className="px-1.5 py-0.5 bg-red-800/80 text-white text-xs font-semibold rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-sm mb-1 text-red-500 group-hover:text-red-300 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs font-sans">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mt-8 space-x-4"
                >
                    {displayCount < galleryImages.length && (
                        <motion.button
                            onClick={handleLoadMore}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 border-2 border-red-800 bg-transparent text-red-500 font-bold rounded-lg hover:bg-red-800 hover:text-white transition-all duration-300"
                        >
                            Unveil More Horrors
                        </motion.button>
                    )}
                    {displayCount > INITIAL_DISPLAY_COUNT && (
                        <motion.button
                            onClick={handleShowLess}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 border-2 border-red-800 bg-transparent text-red-500 font-bold rounded-lg hover:bg-red-800 hover:text-white transition-all duration-300"
                        >
                            Hide Some Horrors
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;