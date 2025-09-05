import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaCalendar,
    FaInfoCircle,
    FaBars,
    FaTimes,
    FaTeamspeak,
    FaClock,
    FaHome,
} from "react-icons/fa";

// A minimal `cn` utility function for combining Tailwind classes
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                <Link to="/" className=" text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 text-3xl font-bold tracking-widest">
                    iTech<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Roots</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <NavItem to="/" icon={<FaHome />} currentPath={location.pathname}>
                        Home
                    </NavItem>
                    <NavItem
                        to="/events"
                        icon={<FaCalendar />}
                        currentPath={location.pathname}
                    >
                        Events
                    </NavItem>
                    <NavItem
                        to="/coreteam"
                        icon={<FaTeamspeak />}
                        currentPath={location.pathname}
                    >
                        Team
                    </NavItem>
                    <NavItem
                        to="/contacts"
                        icon={<FaInfoCircle />}
                        currentPath={location.pathname}
                    >
                        Contact
                    </NavItem>
                    <NavItem
                        to="/timeline"
                        icon={<FaClock />}
                        currentPath={location.pathname}
                    >
                        Timeline
                    </NavItem>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-400 focus:outline-none hover:text-cyan-400 transition-colors"
                >
                    {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 z-[90]">
                    <div className="flex flex-col p-4 space-y-2">
                        <NavItem
                            to="/"
                            icon={<FaHome />}
                            mobile
                            onClick={toggleMenu}
                            currentPath={location.pathname}
                        >
                            Home
                        </NavItem>
                        <NavItem
                            to="/events"
                            icon={<FaCalendar />}
                            mobile
                            onClick={toggleMenu}
                            currentPath={location.pathname}
                        >
                            Events
                        </NavItem>
                        <NavItem
                            to="/coreteam"
                            icon={<FaTeamspeak />}
                            mobile
                            onClick={toggleMenu}
                            currentPath={location.pathname}
                        >
                            Team
                        </NavItem>
                        <NavItem
                            to="/contacts"
                            icon={<FaInfoCircle />}
                            mobile
                            onClick={toggleMenu}
                            currentPath={location.pathname}
                        >
                            Contact Us
                        </NavItem>
                        <NavItem
                            to="/timeline"
                            icon={<FaClock />}
                            mobile
                            onClick={toggleMenu}
                            currentPath={location.pathname}
                        >
                            Timeline
                        </NavItem>
                    </div>
                </div>
            )}
        </nav>
    );
};

interface NavItemProps {
    to: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    mobile?: boolean;
    onClick?: () => void;
    currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, icon, mobile, onClick, currentPath }) => {
    const isActive = currentPath === to;

    return (
        <Link to={to} onClick={onClick}>
            <div
                className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center border-b-2",
                    isActive
                        ? "text-red-400 border-orange-500"
                        : "text-gray-500 border-transparent hover:text-orange-400 hover:border-red-500"
                )}
            >
                {icon && <span className="mr-3">{icon}</span>}
                {children}
            </div>
        </Link>
    );
};

export default Navbar;
