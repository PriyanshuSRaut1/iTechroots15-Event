import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSkull } from "react-icons/fa";

const SponsorsCarousel = ({ sponsors }) => {
    const carouselRef = useRef(null);
    const controls = useAnimation();

    const sponsorWidth = 200; // Adjust this value to match your sponsor card width
    const gap = 32; // Adjust this value to match the gap in your grid (e.g., gap-8 = 32px)
    const scrollSpeed = 50; // Adjust this value to change the scroll speed

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Calculate the total width of all sponsor items plus their gaps
        const totalWidth = sponsors.length * sponsorWidth + (sponsors.length - 1) * gap;

        // Animate the carousel's x position
        const animateCarousel = async () => {
            while (true) {
                // Scroll left
                await controls.start({
                    x: -totalWidth,
                    transition: {
                        duration: totalWidth / scrollSpeed,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0
                    }
                });
            }
        };

        animateCarousel();

        return () => {
            controls.stop();
        };
    }, [sponsors, controls, sponsorWidth, gap, scrollSpeed]);

    return (
        <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="w-1/4 h-full absolute left-0 bg-gradient-to-r from-black to-transparent" />
                <div className="w-1/4 h-full absolute right-0 bg-gradient-to-l from-black to-transparent" />
            </div>
            
            <motion.div
                ref={carouselRef}
                className="flex flex-row items-center whitespace-nowrap gap-8"
                animate={controls}
            >
                {/* Duplicate the list to create a seamless loop */}
                {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: sponsorWidth }}>
                        <div className="group">
                            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-gray-600 transition-all duration-300 text-center relative overflow-hidden">
                                {/* Background glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                                
                                {/* Logo placeholder */}
                                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gray-600 rounded group-hover:bg-gray-500 transition-colors duration-300"></div>
                                </div>
                                
                                <h3 className="text-gray-300 font-medium mb-2 group-hover:text-gray-200 transition-colors duration-300 font-sans">
                                    {sponsor}
                                </h3>
                                <p className="text-gray-600 text-sm font-sans">Ethereal Partner</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SponsorsCarousel;