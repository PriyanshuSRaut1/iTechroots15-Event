import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Image as ImageIcon,
  Heart as HeartIcon,
  Mail as MailIcon,
  Menu,
  X,
  LogOut as LogoutIcon,
  BellDot,
} from 'lucide-react';
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "../../../firebase";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unreadContacts, setUnreadContacts] = useState(0);

  // Check authentication status
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, [location.pathname]);

  // Fetch unread contacts count
  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadContacts(0);
      return;
    }

    const contactsRef = ref(database, "contacts");
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const contactsData = snapshot.val();
      if (!contactsData) {
        setUnreadContacts(0);
        return;
      }

      const unreadCount = Object.values(contactsData).filter(
        contact => contact.read !== true
      ).length;
      setUnreadContacts(unreadCount);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const baseNavItems = [
    { to: "/", icon: <DashboardIcon className="w-5 h-5" />, label: "Dashboard" },
    { to: "/event", icon: <CalendarIcon className="w-5 h-5" />, label: "Events" },
    // { to: "/team", icon: <UsersIcon className="w-5 h-5" />, label: "Team" },
    { to: "/gallary", icon: <ImageIcon className="w-5 h-5" />, label: "Gallery" },
  ];

  const authNavItems = isAuthenticated
    ? [
        { to: "/sponsors", icon: <HeartIcon className="w-5 h-5" />, label: "Sponsors" },
        { 
          to: "/contact", 
          icon: (
            <div className="relative">
              <MailIcon className="w-5 h-5" />
              {unreadContacts > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadContacts > 9 ? "9+" : unreadContacts}
                </span>
              )}
            </div>
          ), 
          label: (
            <div className="flex items-center">
              Contact
              {unreadContacts > 0 && isOpen && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadContacts > 9 ? "9+" : unreadContacts} new
                </span>
              )}
            </div>
          ) 
        },
        { to: "/registration", icon: <UsersIcon className="w-5 h-5" />, label: "Registration Entry" },
        { to: "/likes", icon: <HeartIcon className="w-5 h-5" />, label: "Likes Manager" },
      ]
    : [];

  const navItems = [...baseNavItems, ...authNavItems];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 p-4 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 select-none">Admin Panel</h1>
          {isAuthenticated && unreadContacts > 0 && (
            <div className="relative">
              <BellDot className="w-6 h-6 text-red-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadContacts > 9 ? "9+" : unreadContacts}
              </span>
            </div>
          )}
        </header>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          bg-white shadow-lg fixed md:relative z-30 h-full top-0 left-0
          transform transition-transform duration-300 ease-in-out overflow-auto
          ${isOpen ? "translate-x-0 w-64" : isMobile ? "-translate-x-full w-0" : "w-20"}
          ${!isMobile ? "translate-x-0" : ""}
          flex flex-col
        `}
        aria-label="Sidebar navigation"
      >
        <div
          className={`
            p-5 text-2xl font-bold border-b border-gray-200
            select-none
            ${!isOpen && isMobile ? "hidden" : ""}
            ${!isMobile && !isOpen ? "text-center" : ""}
          `}
        >
          {!isMobile && !isOpen ? "A" : "Admin Panel"}
        </div>

        <nav className="flex flex-col justify-between flex-1 h-[calc(100%-80px)]">
          <div className="flex flex-col space-y-1 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isMobile={isMobile}
                isOpen={isOpen}
                isActive={location.pathname === item.to}
                onClick={() => isMobile && toggleSidebar()}
              />
            ))}
          </div>

          <div className="mt-6 px-10 py-20 flex flex-col items-center space-y-3">
            {!isAuthenticated && (
              <button
                onClick={handleLoginClick}
                className="
                  mb-10
                  px-4 py-2
                  text-white
                  bg-blue-600
                  rounded-md
                  shadow-md
                  hover:bg-blue-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition
                  transform
                  hover:scale-105
                  font-semibold
                  text-sm
                  tracking-wide
                  uppercase
                  select-none
                  max-w-[140px]
                  text-center
                "
              >
                Login
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="
                  flex items-center justify-center
                  px-4 py-2
                  mb-10
                  text-red-600
                  border border-red-600
                  rounded-md
                  hover:bg-red-50
                  focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
                  transition
                  font-semibold
                  text-sm
                  select-none
                  max-w-[140px]
                "
              >
                <LogoutIcon className="w-4 h-4 mr-2" />
                {isOpen && "Logout"}
              </button>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

const NavLink = ({ to, icon, label, isMobile, isOpen, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center px-5 py-3
        rounded-lg
        text-gray-700
        hover:bg-blue-50 hover:text-blue-600
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
        ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""}
        ${!isMobile && !isOpen ? "justify-center" : ""}
        select-none
      `}
      onClick={onClick}
    >
      <span className={`${!isMobile && !isOpen ? "mr-0" : "mr-4"}`}>
        {icon}
      </span>
      {(isMobile ? isOpen : true) && (
        <span className={`${!isMobile && !isOpen ? "hidden" : "block"} text-base`}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;