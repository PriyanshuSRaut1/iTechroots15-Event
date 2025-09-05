import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Admin from "./Admin";
import EventsList from "./components/ui/event/EventList";
import TeamMembers from "./components/ui/members/TeamMembers";
import GallerySection from "./components/ui/gallary/GallerySection";
import ContactSubmissions from "./components/ui/contact/ContactSubmissions";
import SponsorsSection from "./components/ui/sponsor/SponsorsSection";
import Sidebar from "./components/ui/sidebar/Sidebar";
import Login from "./components/ui/login/Login";
import EventRegistrations from "./components/ui/event/EventRegistrations";
import LikesManager from "./components/ui/event/LikesManager";

// Session timeout duration (2 minutes for testing)
const SESSION_TIMEOUT = 1* 60 * 1000; // 2 minutes in milliseconds
const WARNING_TIME = 30 * 1000; // Show warning 30 seconds before timeout

// Timeout Warning Popup Component
function TimeoutWarningPopup({ secondsRemaining, onExtend, onLogout }) {
  // Prevent event propagation to avoid interfering with the activity detection
  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Session About to Expire</h3>
          <p className="text-gray-600 mb-4">
            Your session will expire in {secondsRemaining} seconds due to inactivity.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={(e) => handleButtonClick(e, onExtend)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Stay Logged In
            </button>
            <button
              onClick={(e) => handleButtonClick(e, onLogout)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Log Out Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component with session timeout
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        
        if (!authStatus) {
          navigate("/login", { replace: true, state: { from: location } });
          return false;
        }
        
        // Get or create login time if it doesn't exist
        let loginTime = parseInt(localStorage.getItem("loginTime") || "0");
        if (!loginTime) {
          loginTime = Date.now();
          localStorage.setItem("loginTime", loginTime.toString());
        }
        
        const currentTime = Date.now();
        
        // Check if session is expired
        const isExpired = currentTime - loginTime > SESSION_TIMEOUT;
        
        if (isExpired) {
          // Clear storage if expired
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userRole");
          localStorage.removeItem("username");
          localStorage.removeItem("loginTime");
          localStorage.removeItem("lastActivity");
          
          navigate("/login", { replace: true, state: { from: location, message: "Session expired" } });
          return false;
        }
        
        // Update last activity time
        localStorage.setItem("lastActivity", Date.now().toString());
        return true;
      } catch (error) {
        console.error("Auth check error:", error);
        return false;
      }
    };
    
    const authValid = checkAuth();
    setIsAuthenticated(authValid);
    setIsChecking(false);
  }, [navigate, location]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

// Session timeout tracker component
function SessionTimeoutTracker() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  
  // Use refs to store timers so they persist between renders
  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    // Initialize timers
    startTimers();
    
    // Event listeners for user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart", "mousemove"];
    
    const handleActivity = () => {
      // Reset all timers on user activity
      resetTimers();
    };

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      // Cleanup timers and event listeners
      clearTimeout(inactivityTimerRef.current);
      clearTimeout(warningTimerRef.current);
      clearInterval(countdownIntervalRef.current);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [navigate]);

  const startTimers = () => {
    // Get login time
    const loginTime = parseInt(localStorage.getItem("loginTime") || "0");
    if (!loginTime) return;
    
    const currentTime = Date.now();
    const elapsedTime = currentTime - loginTime;
    const remainingTime = Math.max(SESSION_TIMEOUT - elapsedTime, 0);
    
    // Set main logout timer
    inactivityTimerRef.current = setTimeout(handleLogout, remainingTime);
    
    // Set warning timer (30 seconds before expiration)
    const warningTriggerTime = Math.max(remainingTime - WARNING_TIME, 0);
    
    if (warningTriggerTime > 0) {
      warningTimerRef.current = setTimeout(() => {
        setShowWarning(true);
        const finalRemaining = Math.floor(WARNING_TIME / 1000);
        setSecondsRemaining(finalRemaining);
        
        // Start countdown update
        countdownIntervalRef.current = setInterval(() => {
          setSecondsRemaining(prev => {
            if (prev <= 1) {
              clearInterval(countdownIntervalRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, warningTriggerTime);
    } else if (remainingTime > 0) {
      // If we're already past the warning time but not expired yet
      setShowWarning(true);
      const finalRemaining = Math.floor(remainingTime / 1000);
      setSecondsRemaining(finalRemaining);
      
      // Start countdown update
      countdownIntervalRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimers = () => {
    // Clear existing timers
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownIntervalRef.current);
    
    // Hide warning if shown
    setShowWarning(false);
    
    // Update last activity time
    localStorage.setItem("lastActivity", Date.now().toString());
    
    // Start new timers
    startTimers();
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("lastActivity");
    
    // Clear all timers
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownIntervalRef.current);
    
    // Redirect to login
    navigate("/login", { 
      replace: true, 
      state: { message: "Session expired due to inactivity" } 
    });
  };

  const extendSession = () => {
    // Reset login time to extend session
    localStorage.setItem("loginTime", Date.now().toString());
    localStorage.setItem("lastActivity", Date.now().toString());
    
    // Reset timers and hide warning
    resetTimers();
  };

  const logoutNow = () => {
    handleLogout();
  };

  return (
    <>
      {showWarning && (
        <TimeoutWarningPopup
          secondsRemaining={secondsRemaining}
          onExtend={extendSession}
          onLogout={logoutNow}
        />
      )}
    </>
  );
}

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      {/* Session timeout tracker - only visible when authenticated */}
      {localStorage.getItem("isAuthenticated") === "true" && <SessionTimeoutTracker />}
      
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        <div
          className={`flex-1 overflow-auto transition-all duration-300 
            ${sidebarOpen && isMobile ? "ml-64" : ""} 
            ${!isMobile && !sidebarOpen ? "ml-20" : ""} 
            mt-16 md:mt-0`}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event"
              element={
                <ProtectedRoute>
                  <EventsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team123"
              element={
                <ProtectedRoute>
                  <TeamMembers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallary"
              element={
                <ProtectedRoute>
                  <GallerySection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <ProtectedRoute>
                  <EventRegistrations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactSubmissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sponsors"
              element={
                <ProtectedRoute>
                  <SponsorsSection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/likes"
              element={
                <ProtectedRoute>
                  <LikesManager />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;