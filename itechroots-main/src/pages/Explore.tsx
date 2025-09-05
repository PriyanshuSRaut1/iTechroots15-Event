import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTools, FaImages, FaChevronDown, FaChevronUp, FaSkull, FaGhost, FaEye } from "react-icons/fa";
import SponsorsCarousel from "../components/SponsorsCarousel";

import img1 from '../images/1.jpeg'
import img2 from '../images/2.jpeg'
import img3 from '../images/3.jpeg'
import img4 from '../images/4.jpeg'
import img5 from '../images/5.jpeg'
import img6 from '../images/6.jpeg'
import img7 from '../images/7.jpg'
import img8 from '../images/8.jpg'
import img9 from '../images/9.jpeg'
import img10 from '../images/10.jpeg'

const Explore = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "What lurks within our cursed community?",
            answer: "We're a coven of developers, designers, and digital sorcerers united by our thirst for forbidden knowledge and dark technological arts."
        },
        {
            question: "How can mortals join our dark rituals?",
            answer: "Brave souls may enter our realm through the events page or by summoning us directly. Most gatherings welcome both novices and master practitioners of the dark arts."
        },
        {
            question: "Do you conduct ceremonies for the uninitiated?",
            answer: "Indeed, we regularly perform initiation rituals designed for newcomers as well as advanced practitioners. Consult our unholy calendar for upcoming sessions."
        },
        {
            question: "Can I contribute to your forbidden projects?",
            answer: "Absolutely! We welcome contributions from fellow practitioners. Reach out to our inner circle to learn about current dark endeavors and how you can join our cause."
        },
        {
            question: "What price must be paid for membership?",
            answer: "No earthly currency is required. We believe in sharing the darkness freely with all who seek it. Your soul, however, is another matter entirely."
        }
    ];

    // Array of images for the gallery section
    const galleryImages = [img1, img2, img3, img4];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20 bg-black text-gray-100 font-serif"
        >
            {/* Header */}
            <section className="py-16 text-center px-4 relative">
                {/* Background particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gray-600 rounded-full opacity-30"
                            animate={{
                                y: [-20, -100],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                </div>
                
                <motion.h1
                    className="text-5xl md:text-7xl font-thin mb-6 text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-600 tracking-wider"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Explore the Abyss
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    Venture deep into our shadowed realm of technology and uncover the mysteries that dwell within.
                </motion.p>
            </section>

            {/* Navigation Cards */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaCalendarAlt />,
                                title: "Dark Gatherings",
                                description: "Upcoming rituals, séances, and forbidden conferences",
                                link: "/events",
                                accent: "purple"
                            },
                            {
                                icon: <FaTools />,
                                title: "Cursed Workshops",
                                description: "Hands-on conjuring sessions and skill-binding ceremonies",
                                link: "/events",
                                accent: "indigo"
                            },
                            {
                                icon: <FaImages />,
                                title: "Gallery of Shadows",
                                description: "Visual echoes and spectral memories from our past events",
                                link: "/events",
                                accent: "gray"
                            }
                        ].map((section, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ 
                                    y: -8,
                                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
                                }}
                                className="group relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                            >
                                <Link to={section.link}>
                                    <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg hover:border-gray-600 transition-all duration-300 relative overflow-hidden">
                                        {/* Subtle glow effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br from-${section.accent}-900 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                        
                                        <div className="text-3xl text-gray-400 mb-6 flex justify-center relative z-10">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-xl font-medium mb-4 text-center text-gray-200 relative z-10">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-500 text-center text-sm leading-relaxed relative z-10 font-sans">
                                            {section.description}
                                        </p>
                                        
                                        {/* Hover reveal element */}
                                        <motion.div
                                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ y: 10 }}
                                            whileHover={{ y: 0 }}
                                        >
                                            <span className="text-gray-400 text-xs font-sans">Enter →</span>
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-gray-950 border-t border-gray-800">
                <div className="container mx-auto max-w-3xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaSkull className="text-4xl text-gray-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-thin tracking-wide text-gray-200">
                            Whispered Secrets
                        </h2>
                        <p className="text-gray-500 mt-2 font-sans">Answers to questions you dare to ask</p>
                    </motion.div>
                    
                    <div className="space-y-3">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors duration-300"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-900 transition-colors duration-200 group"
                                >
                                    <span className="font-medium text-gray-200 group-hover:text-gray-100 transition-colors duration-200">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-gray-500 group-hover:text-gray-400"
                                    >
                                        <FaChevronDown />
                                    </motion.div>
                                </button>
                                
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: expandedFaq === index ? "auto" : 0,
                                        opacity: expandedFaq === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 text-gray-400 leading-relaxed font-sans border-t border-gray-800">
                                        <div className="pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaGhost className="text-4xl text-gray-500 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-4xl font-thin tracking-wide text-gray-200 mb-4">
                            Spectral Memories
                        </h2>
                        <p className="text-gray-500 font-sans">Echoes from the realm beyond</p>
                    </motion.div>
                    
                    {/* Gallery Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ 
                                    scale: 1.03,
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
                                }}
                                className="group relative overflow-hidden rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                            >
                                <div className="text-center h-48 md:h-64 lg:h-72">
                                    <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
                                </div>

                                
                                {/* Overlay effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                                
                                {/* Hover text */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-gray-300 text-sm font-sans">A glimpse into our dark rituals</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link to="/gallery">
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-gray-600 bg-transparent text-gray-300 rounded-lg hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300 font-sans tracking-wide"
                            >
                                View All Apparitions
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Sponsors Section */}
            <section className="py-20 px-4 bg-black border-t border-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex justify-center mb-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <FaSkull className="text-4xl text-gray-500" />
                            </motion.div>
                        </div>
                        <h2 className="text-4xl font-thin tracking-wide text-gray-200 mb-4">
                            Dark Patrons
                        </h2>
                        <p className="text-gray-500 font-sans">Those who fuel our unholy endeavors</p>
                    </motion.div>
                    
                    {/* Sponsors Grid */}
                    <SponsorsCarousel sponsors={[1, 2,3]}/>
                    
                    
                </div>
            </section>
        </motion.div>
    );
};

export default Explore;
