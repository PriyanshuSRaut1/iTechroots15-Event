import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaEye } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import { ref, onValue, runTransaction, get } from 'firebase/database';
import { database } from '../firebase'; // Import your Firebase config

const SparkEffect = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const fireColors = [
            '#ff4500', // Orange Red
            '#ff6347', // Tomato
            '#ff0000', // Red
            '#ffa500', // Orange
            '#ffff00', // Yellow
            '#ff1493', // Deep Pink
            '#dc143c'  // Crimson
        ];

        let particleId = 0;
        const activeParticles = new Map();

        const createParticle = (type = 'spark') => {
            const id = particleId++;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * 20; // Increased starting area
            
            const isSpark = type === 'spark';
            const duration = isSpark ? 1200 + Math.random() * 800 : 2500 + Math.random() * 1500;
            const size = isSpark ? 1 + Math.random() * 4 : 2 + Math.random() * 6; // Slightly larger particles
            const color = fireColors[Math.floor(Math.random() * (isSpark ? fireColors.length : 4))];
            const moveX = (Math.random() - 0.5) * (isSpark ? 120 : 80); // More horizontal movement
            const moveY = -(isSpark ? 40 + Math.random() * 60 : 60 + Math.random() * 80); // Much higher vertical movement
            
            const particle = {
                id,
                type,
                x: startX,
                y: startY,
                size,
                color,
                opacity: 0.7 + Math.random() * 0.3,
                duration,
                moveX,
                moveY,
                startTime: Date.now()
            };

            activeParticles.set(id, particle);
            
            // Auto-remove particle after its duration
            setTimeout(() => {
                activeParticles.delete(id);
                setParticles(prev => prev.filter(p => p.id !== id));
            }, duration + 100);

            return particle;
        };

        const addParticles = () => {
            const newParticles = [];
            
            // Add sparks continuously
            for (let i = 0; i < 12; i++) { // Increased particle count
                newParticles.push(createParticle('spark'));
            }
            
            // Add embers less frequently
            if (Math.random() > 0.5) { // More frequent ember generation
                for (let i = 0; i < 5; i++) { // More embers
                    newParticles.push(createParticle('ember'));
                }
            }
            
            setParticles(prev => [...prev, ...newParticles]);
        };

        // Initial burst
        addParticles();
        
        // Continuous particle generation
        const sparkInterval = setInterval(() => {
            for (let i = 0; i < 6; i++) { // More sparks per interval
                setParticles(prev => [...prev, createParticle('spark')]);
            }
        }, 100); // Slightly slower for performance

        const emberInterval = setInterval(() => {
            if (Math.random() > 0.3) { // More frequent ember generation
                for (let i = 0; i < 2; i++) {
                    setParticles(prev => [...prev, createParticle('ember')]);
                }
            }
        }, 280);

        return () => {
            clearInterval(sparkInterval);
            clearInterval(emberInterval);
        };
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={`${particle.type}-${particle.id}`}
                    className="absolute"
                    style={{
                        left: `${particle.x}px`,
                        bottom: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        borderRadius: '50%',
                        boxShadow: particle.type === 'spark' 
                            ? `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}40`
                            : `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}60`,
                        opacity: particle.opacity,
                        animation: particle.type === 'spark' 
                            ? `fireSpark ${particle.duration}ms ease-out forwards`
                            : `fireEmber ${particle.duration}ms ease-out forwards`,
                        '--move-x': `${particle.moveX}px`,
                        '--move-y': `${particle.moveY}px`
                    }}
                />
            ))}
            
            <style>{`
                @keyframes fireSpark {
                    0% {
                        transform: translate(0, 0) scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    8% {
                        transform: translate(calc(var(--move-x) * 0.1), calc(var(--move-y) * 0.1)) scale(1) rotate(45deg);
                        opacity: 1;
                    }
                    25% {
                        transform: translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * 0.4)) scale(1.1) rotate(120deg);
                        opacity: 0.9;
                    }
                    60% {
                        transform: translate(calc(var(--move-x) * 0.7), calc(var(--move-y) * 0.8)) scale(0.7) rotate(250deg);
                        opacity: 0.6;
                    }
                    85% {
                        transform: translate(calc(var(--move-x) * 0.9), calc(var(--move-y) * 0.95)) scale(0.3) rotate(320deg);
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(var(--move-x), var(--move-y)) scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes fireEmber {
                    0% {
                        transform: translate(0, 0) scale(0);
                        opacity: 0;
                    }
                    4% {
                        transform: translate(calc(var(--move-x) * 0.05), calc(var(--move-y) * 0.05)) scale(1);
                        opacity: 1;
                    }
                    15% {
                        transform: translate(calc(var(--move-x) * 0.2), calc(var(--move-y) * 0.3)) scale(1.2);
                        opacity: 0.95;
                    }
                    40% {
                        transform: translate(calc(var(--move-x) * 0.5), calc(var(--move-y) * 0.6)) scale(1.1);
                        opacity: 0.8;
                    }
                    70% {
                        transform: translate(calc(var(--move-x) * 0.8), calc(var(--move-y) * 0.85)) scale(0.7);
                        opacity: 0.4;
                    }
                    90% {
                        transform: translate(calc(var(--move-x) * 0.95), calc(var(--move-y) * 0.98)) scale(0.2);
                        opacity: 0.1;
                    }
                    100% {
                        transform: translate(var(--move-x), var(--move-y)) scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

const Footer = () => {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const VISITOR_KEY = 'itechroots_visitor_firebase';
        const viewCountRef = ref(database, 'siteStats/viewCount');

        const hasVisited = localStorage.getItem(VISITOR_KEY);

        if (!hasVisited) {
            runTransaction(viewCountRef, (currentCount) => {
                return (currentCount || 0) + 1;
            }).then((result) => {
                if (result.committed) {
                    setViewCount(result.snapshot.val());
                    localStorage.setItem(VISITOR_KEY, 'true');
                }
            }).catch((error) => {
                console.error("Failed to increment view count:", error);
            });
        } else {
            get(viewCountRef).then((snapshot) => {
                const count = snapshot.val() || 0;
                setViewCount(count);
            }).catch((error) => {
                console.error("Failed to get view count:", error);
            });
        }

        const unsubscribe = onValue(viewCountRef, (snapshot) => {
            const count = snapshot.val() || 0;
            setViewCount(count);
        });

        return () => unsubscribe();
    }, []);

    return (
        <footer
            className="p-6 z-50 bg-black text-white font-mono border-t border-gray-800 relative overflow-hidden"
        >
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col mb-8">
                    <h3
                        className="text-2xl font-bold tracking-wider mb-2"
                        style={{ fontFamily: "serif" }}
                    >
                        We R{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600">
                            iTechRoots
                        </span>
                    </h3>

                    <p
                        className="text-sm text-gray-500 mb-4 italic"
                    >
                        "Where code meets the void..."
                    </p>

                    <div className="flex text-xl gap-4 py-3">
                        <a
                            href="mailto:itechroots.it@gmail.com"
                            className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                            title="Contact the Void"
                        >
                            <SiGmail />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/ycceitechroots/"
                            className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                            title="Join the Network"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://www.instagram.com/itechroots_14.0?igsh=MXJyYTZmc2tpdDM0"
                            className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                            title="Witness the Code"
                        >
                            <FaInstagram />
                        </a>
                    </div>

                    <h4
                        className="text-xs text-gray-600 font-mono mb-4"
                    >
                        IT Dept @ The Haunted Halls of YCCE, Nagpur
                    </h4>

                    <div
                        className="flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                        <Link
                            to="/contact-form"
                            className="font-mono text-sm px-4 py-2 border border-gray-700 hover:border-red-500 hover:bg-red-500 hover:text-black transition-all duration-300"
                        >
                            Summon Us
                        </Link>

                        <div
                            className="flex items-center gap-2 text-xs bg-gray-900 py-2 px-3 border border-gray-800"
                        >
                            <FaEye className="text-gray-400" />
                            <span className="font-mono text-white">
                                {viewCount.toLocaleString()}
                            </span>
                            <span className="text-gray-500">souls observed</span>
                        </div>
                    </div>
                </div>

                {/* Copyright Statement */}
                <div
                    className="text-xs border-t pt-4 border-gray-800 text-gray-600 font-mono"
                >
                    <p>&copy; 2024 The Coven of iTechRoots. All rights reserved.</p>
                </div>

                {/* Developer Credit */}
                <div
                    className="text-xs pt-2 text-gray-600 font-mono"
                >
                    <p className="inline">
                        <Link to="admin" className="cursor-pointer hover:text-gray-400 transition-colors">
                            Forged
                        </Link>{" "}
                        in darkness by{" "}
                    </p>
                    <a
                        href="https://www.linkedin.com/in/yashshelke/"
                        className="underline text-gray-500 hover:text-red-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Yash
                    </a>
                    <span className="text-gray-600"> and </span>
                    <a
                        href="https://priyanshuraut.netlify.app/"
                        className="underline text-gray-500 hover:text-red-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Priyanshu
                    </a>
                </div>
            </div>
            
            {/* Spark Effect */}
            <SparkEffect />
        </footer>
    );
};

export default Footer;