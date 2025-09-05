// src/pages/EventsPage.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	DollarSign,
	Trophy,
} from "lucide-react";

import eventsData from "../data/events-data";
import Spider from "@/components/Spider";
import SpiderWeb from "../components/SpiderWeb"

// Custom hooks
const useScrollAnimation = (initialProps, inViewProps) => {
	const controls = useAnimation();
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	useEffect(() => {
		if (inView) {
			controls.start(inViewProps);
		}
	}, [inView, controls, inViewProps]);

	return { ref, controls };
};

const EventCard = ({ event, index }) => {
	const navigate = useNavigate();
	const isPast = event.category === "past";

	const handleClick = () => {
		navigate(`/events/${event.id}`);
	};

	return (
		<motion.div
			onClick={handleClick}
			className={`relative p-4 overflow-hidden rounded-xl cursor-pointer group
        border ${isPast ? "border-red-900/40" : "border-gray-700/40"}
        bg-black/60 backdrop-blur-sm shadow-xl transition-all duration-300 ease-out
        hover:scale-105 hover:translate-y-[-4px] hover:border-red-500/60
        active:scale-98`}
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ delay: index * 0.05, duration: 0.4 }}
		>
			<div className="absolute top-3 right-3 z-20">
				<div
					className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm
            ${
							isPast
								? "bg-red-900/80 text-red-300"
								: "bg-gray-900/80 text-gray-300"
						}`}
				>
					{isPast ? "CURSED" : "ACTIVE"}
				</div>
			</div>

			<div className="relative z-10 p-5">
				<div className="mb-3">
					<h3 className="text-lg font-bold text-red-400 mb-2">{event.title}</h3>
					<p className="text-gray-400 text-sm leading-relaxed mb-3">
						{event.description}
					</p>
				</div>

				<div className="space-y-2 text-xs">
					<div className="flex items-center text-gray-500">
						<Calendar className="w-3 h-3 mr-2 text-red-500" />
						<span>{event.date}</span>
						<Clock className="w-3 h-3 ml-3 mr-2 text-red-500" />
						<span>{event.time}</span>
					</div>

					<div className="flex items-center text-gray-500">
						<MapPin className="w-3 h-3 mr-2 text-red-500" />
						<span>{event.location}</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center text-gray-500">
							<Users className="w-3 h-3 mr-2 text-red-500" />
							<span>{event.memberCount}</span>
						</div>

						{event.price.pool !== "NA" && (
							<div className="flex items-center text-yellow-500 text-xs">
								<Trophy className="w-3 h-3 mr-1" />
								<span>{event.price.pool}</span>
							</div>
						)}
					</div>

					<div className="flex items-center text-red-400 text-xs font-medium">
						<DollarSign className="w-3 h-3 mr-1" />
						<span>{event.entryFees}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const EventsPage = () => {
	const [filter, setFilter] = useState("all");

	const filteredEvents = eventsData.filter(
		(event) => filter === "all" || event.category === filter
	);

	const { ref: titleRef, controls: titleControls } = useScrollAnimation(
		{ opacity: 0, y: -50, rotateX: -15 },
		{ opacity: 1, y: 0, rotateX: 0 }
	);

	const { ref: filterRef, controls: filterControls } = useScrollAnimation(
		{ opacity: 0, scale: 0.8 },
		{ opacity: 1, scale: 1 }
	);

	return (
		<div className="min-h-screen pt-20 bg-black">
			<Spider/>
			<div className="relative z-10 container mx-auto px-4 py-16">
				<section className="py-20 text-center px-4">
					<motion.h1
						className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
						initial={{ opacity: 0, y: -50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						CURSED{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
							EVENTS
						</span>
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
					>
						Enter the realm of dark coding rituals. Test your skills in
						supernatural competitions.
					</motion.p>
				</section>

				<motion.div
					ref={filterRef}
					animate={filterControls}
					className="flex justify-center mb-12"
				>
					<div className="flex space-x-2 bg-black/60 backdrop-blur-sm rounded-lg p-1 border border-gray-800">
						{["all", "upcoming", "past"].map((filterOption) => (
							<motion.button
								key={filterOption}
								onClick={() => setFilter(filterOption)}
								className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
									filter === filterOption
										? "bg-red-900/80 text-red-300"
										: "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{filterOption === "all"
									? "All"
									: filterOption === "upcoming"
									? "Upcoming"
									: "Past"}
							</motion.button>
						))}
					</div>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					<AnimatePresence mode="wait">
						{filteredEvents.map((event, index) => (
							<EventCard key={event.id} event={event} index={index} />
						))}
					</AnimatePresence>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="text-center"
				>
					<p className="text-gray-600 text-sm">
						© 2025 Cursed Events. All rights reserved.
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default EventsPage;