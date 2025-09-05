import React from "react";
import { motion } from "framer-motion";
import {
    FaEnvelopeOpenText,
    FaPhone,
    FaMapMarkedAlt,
    FaGithub,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";
import useScrollAnimation from "../hooks/useScrollAnimation";
import MapComponent from "../components/MapComponent";
import { Link } from "react-router-dom";
import ContactButton from "../components/ContactButton";
import Spider from "@/components/Spider";
import SpiderWeb from "../components/SpiderWeb"

const Contact = () => {
    // Animations for sections
    const headerAnimation = useScrollAnimation(
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0 }
    );

    const contactInfoAnimation = useScrollAnimation(
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0 }
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20  text-white relative"
        >
            <Spider/>
            <SpiderWeb/>
            <motion.div
                key="mainContactPage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-50"
            >
                {/* Header Section */}
                <section className="py-20 text-center px-4">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        SUMMON THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">COVEN</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        Whisper your secrets, forge a dark pact, or dare to ask questions in
                        the digital abyss. The void awaits your summons.
                    </motion.p>
                    <div className="flex justify-center">

                    <Link to="/contact-form" className=" mt-5 w-fit ">
                        <ContactButton/>
                    </Link>
                    </div>

                    {/* Social Links */}
                <motion.section
                    className="py-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-8 text-white">
                            Connect With Us
                        </h2>

                        <div className="flex justify-center gap-6">
                            {[
                                { icon: <FaGithub />, name: "GitHub", href: "#" },
                                { icon: <FaLinkedin />, name: "LinkedIn", href: "#" },
                                { icon: <FaTwitter />, name: "Twitter", href: "#" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{
                                        scale: 1.1,
                                        color: "#ffffff"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-2xl text-gray-400 hover:text-white transition-colors duration-300"
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.section>
                </section>

                {/* Contact Content */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-1 gap-8">
                            <motion.div
                                ref={contactInfoAnimation.ref}
                                animate={contactInfoAnimation.controls}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                {/* Leadership Team */}
                                <div className="border border-gray-800 p-6 rounded-lg bg-gray-900 bg-opacity-50">
                                    <h2 className="text-xl font-bold mb-6 text-white">
                                        Leadership Team
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            {
                                                name: "Taniya Borkar",
                                                role: "President CSI",
                                                contact: "+91 1234567893",
                                            },
                                            {
                                                name: "Sujal Burande", 
                                                role: "President CSI",
                                                contact: "+91 1234567893",
                                            },
                                            {
                                                name: "Kedar Paul",
                                                role: "President CSI", 
                                                contact: "+91 1234567893",
                                            },
                                        ].map((president, index) => (
                                            <motion.div
                                                key={index}
                                                className="p-4 bg-black bg-opacity-40 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="font-semibold text-white mb-1">
                                                    {president.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-2">
                                                    {president.role}
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    {president.contact}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="bg-gray-900 bg-opacity-50 border border-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-bold mb-4 text-white">
                                        Location
                                    </h2>
                                    <div className="flex items-start gap-3 mb-4">
                                        <FaMapMarkedAlt className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="font-semibold mb-1 text-gray-200">
                                                YCCE Campus
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                IT Department, YCCE
                                                <br />
                                                Nagpur, Maharashtra
                                                <br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    {/* Map */}
                                    <div className="w-full h-48 bg-gray-800 rounded border border-gray-700 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <MapComponent />
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Team */}
                                <div className="bg-gray-900 bg-opacity-50 border border-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-bold mb-6 text-white">
                                        Technical Team
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            {
                                                name: "Yash Shelke",
                                                role: "Technical Head",
                                                contact: "yash.shelke@itechroots.com",
                                            },
                                            {
                                                name: "Priyanshu Raut",
                                                role: "Technical Head", 
                                                contact: "priyanshu.raut@itechroots.com",
                                            },
                                            {
                                                name: "Om Kuthe",
                                                role: "Technical Co-Head",
                                                contact: "om.kuthe@itechroots.com",
                                            },
                                        ].map((member, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-3 p-4 bg-black bg-opacity-40 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FaEnvelopeOpenText className="text-gray-400" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-white text-sm">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {member.role}
                                                    </p>
                                                    <a
                                                        href={`mailto:${member.contact}`}
                                                        className="text-gray-500 hover:text-white transition-colors text-xs"
                                                    >
                                                        {member.contact}
                                                    </a>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Phone Contact */}
                                    <div className="mt-6 pt-4 border-t border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <FaPhone className="text-gray-400" />
                                            <div>
                                                <p className="font-semibold text-white text-sm">
                                                    Phone Support
                                                </p>
                                                <p className="text-gray-400 text-xs">
                                                    +91 1234567890
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                
            </motion.div>
        </motion.div>
    );
};

export default Contact;








