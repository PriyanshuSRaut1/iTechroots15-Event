import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import SpiderWeb from "../components/SpiderWeb";

import bg from "../bg/hand.jpg";

const ContactFormPage = () => {
    // Add a loading state
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [messageStatus, setMessageStatus] = useState('');
    const navigate = useNavigate();

    const formAnimation = useScrollAnimation(
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0 }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start the loading state
        const contactRef = ref(database, 'contacts');

        try {
            await push(contactRef, {
                name: formData.name,
                email: formData.email,
                sub: formData.subject,
                desc: formData.message
            });
            setMessageStatus('Your message has been sent to the abyss!');
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("The ritual failed:", error);
            setMessageStatus('The ritual failed. Try again when the stars align.');
        } finally {
            setIsLoading(false); // End the loading state whether the submission succeeds or fails
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20 bg-black text-white font-serif flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <motion.section
                key="contactFormPage"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="py-20 px-2 flex justify-center items-center w-full"
            >
                <motion.div
                    ref={formAnimation.ref}
                    animate={formAnimation.controls}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg"
                >
                    <div className="bg-black p-4 rounded-lg shadow-2xl">
                        <h2 className="text-5xl font-bold mb-6 text-red-500 text-center"
                            style={{fontFamily: "hand"}}
                        >
                            {`Confess Your Sins }`}
                        </h2>
                        {messageStatus && (
                            <p className={`text-center mb-4 font-bold ${messageStatus.startsWith('Your message') ? 'text-green-500' : 'text-red-500'}`}>
                                {messageStatus}
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300">
                                    Your Apparition's Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-red-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="Your full spectral name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                                    Your Ethereal Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-red-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="your.shadow@curseddomain.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-300">
                                    Subject of Your Torment
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-red-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="What dark matter troubles you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
                                    Your Cursed Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-red-500 focus:outline-none transition-all duration-300 text-white resize-none placeholder-gray-400"
                                    placeholder="Whisper your deepest fears or proposals..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                // Use the isLoading state to disable the button and change its appearance
                                disabled={isLoading}
                                className={`w-full text-3xl px-6 py-3 text-white rounded-lg transition-all duration-300 ${isLoading ? 'bg-red-900 cursor-not-allowed' : 'bg-red-800 hover:bg-red-600'}`}
                                style={{fontFamily: "hand"}}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                                        <span>Summoning...</span>
                                    </div>
                                ) : (
                                    `{ Send the Plea`
                                )}
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => navigate('/contacts')}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 0 30px rgba(100, 100, 100, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 mt-4"
                            >
                                Return to the Shadows
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </motion.section>
        </motion.div>
    );
};

export default ContactFormPage;