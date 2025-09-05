// src/pages/EventDetails.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  X,
  ExternalLink,
  Mail,
  Phone,
  CalendarDays,
  Hourglass,
  MapPin,
  Users,
} from "lucide-react";

import Spider from "@/components/Spider";
import SpiderWeb from "../components/SpiderWeb"

import eventsData from "../data/events-data";

import ShareButton from "../components/ShareButton";
import LikeButton from "../components/LikeButton";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-950 font-creepy">
        <h1 className="text-4xl font-bold animate-pulse">
          Ritual Site Not Found...
        </h1>
      </div>
    );
  }

  const isPast = event.category === "past";

  return (
    <motion.div
      className="min-h-screen pt-20 bg-gray-950 text-gray-400 relative overflow-hidden font-monospace-unsettling bg-stone-texture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Spider/>
      <SpiderWeb/>
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        <motion.button
          onClick={() => navigate("/events")}
          className="flex items-center text-gray-500 hover:text-red-400 mb-8 transition-colors duration-300 transform hover:scale-105"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 mr-2 stroke-current" />
          Return to the Shadows
        </motion.button>

        {/* Main content container */}
        <motion.div
          className="relative p-8 md:p-12 bg-black/80 border border-red-900/40 shadow-xl shadow-red-950/30 rounded-lg animate-flicker"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 20px rgba(139, 0, 0, 0.4)",
          }}
        >
          {/* --- REVISED HEADER STRUCTURE --- */}
          <div className=" md:items-center md:justify-between mb-8 pb-4 border-b border-gray-800">
            {/* Event Title and Description */}
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-creepy text-orange-300 mb-3 leading-tight">
                {event.title}
              </h1>
              {/* <p className="text-gray-500 text-base leading-relaxed italic">
                {event.description}
              </p> */}
            </div>

            {/* Like and Share buttons */}
            <div className="flex flex-row items-center gap-3">
              <LikeButton eventId={event.id} />
              <ShareButton
                title={event.title}
                description={event.description}
              />
            </div>
          </div>
          {/* --- End of REVISED HEADER STRUCTURE --- */}

                {/* Chronicles of the Event Section */}
          <div className="py-10 border-b border-gray-800">
            <h3 className="text-orange-300 font-bold text-xl mb-4 flex items-center font-creepy">
              Chronicles of the Event
            </h3>
            <div className="text-gray-400 leading-relaxed whitespace-pre-line pl-10">
              <p className="">{event.about}</p>
            </div>
          </div>
          {/* Details and Requirements */}
          <div className="grid md:grid-cols-2 gap-12 py-10 border-b border-gray-800">
            {/* Event Details Section */}
            <div className="space-y-4 pb-4">
              <h3 className="text-orange-300 font-bold text-xl flex items-center font-creepy">
                Date & Time of Haunting
              </h3>
              <div className="space-y-4 text-gray-400 text-base pl-10">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Hourglass className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-600" />
                  <span>Capacity: {event.maxParticipants} Souls</span>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="space-y-4">
              <h3 className="text-orange-300 font-bold text-xl flex items-center font-creepy">
                Requirements
              </h3>
              <div className="space-y-4 pl-10">
                {event.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-start text-gray-400 text-base"
                  >
                    <div className="w-1.5 h-1.5 bg-red-700 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bounties for the Victorious Section */}
          <div className="py-10 border-b border-gray-800">
            <h3 className="text-yellow-600 font-bold text-xl mb-4 flex items-center font-creepy">
              Bounties for the Victorious
            </h3>
            <div className="space-y-4 text-gray-400 text-base pl-10">
              <div className="flex justify-between">
                <span>Total Despair:</span>
                <span className="text-yellow-500">{event.price.pool}</span>
              </div>
              {event.price.first !== "NA" && (
                <div className="flex justify-between">
                  <span>First Sacrifice:</span>
                  <span className="text-yellow-400">{event.price.first}</span>
                </div>
              )}
              {event.price.second !== "NA" && (
                <div className="flex justify-between">
                  <span>Second Offering:</span>
                  <span className="text-gray-300">{event.price.second}</span>
                </div>
              )}
            </div>
          </div>

          {/* Entry & Team Covenants Section */}
          <div className="py-10 border-b border-gray-800">
            <h3 className="text-orange-500 font-bold text-xl mb-4 flex items-center font-creepy">
              Entry & Team Covenants
            </h3>
            <div className="space-y-4 text-gray-400 text-base pl-10">
              <div className="flex justify-between">
                <span>Sacrificial Fees:</span>
                <span className="text-red-400 font-bold">
                  {event.entryFees}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coven Size:</span>
                <span>{event.memberCount}</span>
              </div>
            </div>
          </div>

          

          {/* Organizers Section */}
          <div className="py-10">
            <h3 className="text-orange-300 font-bold text-xl mb-6 font-creepy">
              Keepers of the Lore
            </h3>
            <div className="grid md:grid-cols-2 gap-8 pl-10">
              {event.organizers.map((organizer, index) => (
                <div
                  key={index}
                  className="space-y-1 text-sm border-l border-red-900/40 pl-4"
                >
                  <h4 className="text-gray-300 font-medium text-lg">
                    {organizer.name}
                  </h4>
                  <div className="flex items-center text-gray-500">
                    <Mail className="w-3 h-3 mr-2 text-red-700" />
                    <a
                      href={`mailto:${organizer.email}`}
                      className="hover:text-red-400 transition-colors"
                    >
                      {organizer.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Phone className="w-3 h-3 mr-2 text-red-700" />
                    <span>{organizer.phone}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Co-Organizers Section (Conditional) */}
            {event.coOrganizers && event.coOrganizers.length > 0 && (
              <>
                <h3 className="text-orange-300 font-bold text-xl mt-8 mb-6 font-creepy">
                  Co-Conspirators
                </h3>
                <div className="grid md:grid-cols-2 gap-8 pl-10">
                  {event.coOrganizers.map((coOrganizer, index) => (
                    <div
                      key={index}
                      className="space-y-1 text-sm border-l border-red-900/40 pl-4"
                    >
                      <h4 className="text-gray-300 font-medium text-lg">
                        {coOrganizer.name}
                      </h4>
                      <div className="flex items-center text-gray-500">
                        <Mail className="w-3 h-3 mr-2 text-red-700" />
                        <span>{coOrganizer.email}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Phone className="w-3 h-3 mr-2 text-red-700" />
                        <span>{coOrganizer.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Join Button */}
          <div className="text-center pt-8">
            <a
              href={event.formLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-400 ease-in-out transform hover:scale-105
                                ${
                                  isPast
                                    ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700 opacity-70"
                                    : "bg-red-900/80 text-red-200 hover:bg-red-800 hover:text-red-100 border border-red-700 shadow-lg shadow-red-900/40"
                                }`}
              style={isPast ? { pointerEvents: "none" } : {}}
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              {isPast ? "The Ritual Has Concluded" : "Unleash Your Spirit"}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetails;