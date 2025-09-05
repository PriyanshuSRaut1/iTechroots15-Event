import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import Timeline from "../pages/Timeline";
import Contact from "../pages/Contact";
import EventsPage from "../pages/EventsPage";
import Team from "../pages/Team";
import Explore from "../pages/Explore";
import NotFound from "../pages/NotFound";
import ContactFormPage from "../pages/ContactFormPage";
import GalleryPage from "../pages/GalleryPage";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				{/* <Route path="/" element={<Explore />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/gallery" element={<GalleryPage />} />
				{/* <Route path="/events" element={<Events />} /> */}
				<Route path="/events/:id" element={<EventDetails />} />
				<Route path="/timeline" element={<Timeline />} />
				<Route path="/coreteam" element={<Team />} />
				<Route path="/contacts" element={<Contact />} />
				<Route path="/contact-form" element={<ContactFormPage />} /> 
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;

