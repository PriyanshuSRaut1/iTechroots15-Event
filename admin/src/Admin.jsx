import React, { useEffect, useState } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import database from "./firebase";
import { Users, Calendar, Eye, Layout, User } from "lucide-react";
import LoadingSpinner from "./components/LoadingSpinner";
import StatsCard from "./components/StatsCard";

const Admin = () => {
  const [stats, setStats] = useState({
    viewCount: 0,
    eventCount: 0,
    memberCount: 0
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData") || "null");
    setUserData(storedUser);

    const VISITOR_KEY = "itechroots_visitor_firebase";
    const viewCountRef = ref(database, "siteStats/viewCount");
    const eventsRef = ref(database, "events");
    const membersRef = ref(database, "teams");

    // Track unique visitor
    const hasVisited = localStorage.getItem(VISITOR_KEY);
    if (!hasVisited) {
      runTransaction(viewCountRef, (currentCount) => (currentCount || 0) + 1)
        .then((result) => {
          if (result.committed) {
            localStorage.setItem(VISITOR_KEY, "true");
          }
        })
        .catch(console.error);
    }

    // Fetch all stats
    const unsubscribeViews = onValue(viewCountRef, (snapshot) => {
      setStats(prev => ({ ...prev, viewCount: snapshot.val() || 0 }));
    });

    const unsubscribeEvents = onValue(eventsRef, (snapshot) => {
      const events = snapshot.val() || {};
      setStats(prev => ({ ...prev, eventCount: Object.keys(events).length }));
    });

    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const members = snapshot.val() || {};
      setStats(prev => ({ ...prev, memberCount: Object.keys(members).length }));
      setLoading(false);
    });

    return () => {
      unsubscribeViews();
      unsubscribeEvents();
      unsubscribeMembers();
    };
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Application statistics overview</p>
            </div>
            
            {/* User Profile Section */}
            {userData && (
              <div className="flex items-center space-x-3 bg-gray-100 rounded-full pl-3 pr-5 py-2">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userData.username}
                    {userData.userRole === 'admin' && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData.eventName || 'Administrator'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rest of your existing code remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="border-b border-gray-200 min-w-max">
            <nav className="-mb-px flex space-x-4 sm:space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`group relative py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && (
              <div className="mb-8 px-4 sm:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatsCard 
                    title="Total Visitors" 
                    value={stats.viewCount.toLocaleString()} 
                    icon={Eye}
                    trend={true}
                    trendValue="+12% from last month"
                  />
                  <StatsCard 
                    title="Events" 
                    value={stats.eventCount.toLocaleString()} 
                    icon={Calendar}
                    trend={true}
                    trendValue="+3 new this week"
                  />
                  <StatsCard 
                    title="Members" 
                    value={stats.memberCount.toLocaleString()} 
                    icon={Users}
                    trend={true}
                    trendValue="+5% growth"
                  />
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {stats.viewCount} total visitors
                        </p>
                        <p className="text-sm text-gray-500">
                          Site traffic overview
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {stats.eventCount} active events
                        </p>
                        <p className="text-sm text-gray-500">
                          Current and upcoming events
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {stats.memberCount} registered members
                        </p>
                        <p className="text-sm text-gray-500">
                          Community members
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;