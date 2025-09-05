import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { Mail, Trash2, Search, X, Eye, Check, ChevronDown, ChevronUp } from "lucide-react";
import database from "../../../firebase";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StatsCard from "../../../components/StatsCard";

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedContact, setExpandedContact] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "submittedAt",
    direction: "descending",
  });

  useEffect(() => {
    const contactRef = ref(database, "contacts");
    const unsubscribeContacts = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      setContacts(data || {});
      setLoading(false);
    });

    return () => unsubscribeContacts();
  }, []);

  const markAsRead = (id) => {
    const contactRef = ref(database, `contacts/${id}`);
    update(contactRef, { read: true });
  };

  const deleteContact = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmDelete) {
      const contactRef = ref(database, `contacts/${id}`);
      remove(contactRef);
      if (expandedContact === id) {
        setExpandedContact(null);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedContact(expandedContact === id ? null : id);
    if (expandedContact !== id) {
      markAsRead(id);
    }
  };

  const requestSort = (key) => {
    let direction = "descending";
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const sortedContacts = Object.entries(contacts)
    .map(([id, contact]) => ({
      id,
      ...contact,
      submittedAt: contact.submittedAt || Date.now(),
      date: contact.timestamp ? new Date(contact.timestamp) : new Date(contact.submittedAt),
    }))
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

  const filteredContacts = sortedContacts.filter((contact) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.sub?.toLowerCase().includes(searchLower) ||
      contact.desc?.toLowerCase().includes(searchLower) ||
      contact.timestamp?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    return "Just now";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Contact Submissions
              </h1>
              <p className="text-gray-600 mt-1">
                View and manage all contact form submissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <StatsCard
                title="Total Contacts"
                value={Object.keys(contacts).length.toLocaleString()}
                icon={Mail}
                trend={true}
                trendValue="+12% from last month"
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6 px-4 sm:px-0">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchTerm ? "No matching contacts found" : "No contacts yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try a different search term"
                : "Contact submissions will appear here when available"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Name</div>
                <div className="col-span-2">Email</div>
                <div 
                  className="col-span-2 cursor-pointer hover:text-gray-700"
                  onClick={() => requestSort("submittedAt")}
                >
                  <div className="flex items-center">
                    Date & Time
                    {sortConfig.key === "submittedAt" && (
                      <span className="ml-1">
                        {sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-2">Subject</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="border-t border-gray-200">
                  <div 
                    className="grid grid-cols-12 px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(contact.id)}
                  >
                    <div className="col-span-6 md:col-span-2 text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        {!contact.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        )}
                        {contact.name}
                      </div>
                    </div>
                    <div className="hidden md:block col-span-2 text-sm text-gray-500 break-all">
                      {contact.email}
                    </div>
                    <div className="col-span-6 md:col-span-2 text-sm text-gray-500">
                      <div className="md:hidden">{getTimeAgo(contact.date)}</div>
                      <div className="hidden md:block">{formatDate(contact.date)}</div>
                    </div>
                    <div className="hidden md:block col-span-2 text-sm text-gray-500 truncate">
                      {contact.sub}
                    </div>
                    <div className="hidden md:block col-span-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${contact.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {contact.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                    <div className="col-span-6 md:col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(contact.id);
                        }}
                        className="text-gray-500 hover:text-green-600 p-1"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContact(contact.id);
                        }}
                        className="text-gray-500 hover:text-red-600 p-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(contact.id);
                        }}
                        className="text-gray-500 hover:text-blue-600 p-1"
                        title={expandedContact === contact.id ? "Collapse" : "Expand"}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {expandedContact === contact.id && (
                    <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Full Details</h4>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="mb-3">
                              <p className="text-xs text-gray-500">Name</p>
                              <p className="text-sm font-medium">{contact.name}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm font-medium break-all">{contact.email}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs text-gray-500">Subject</p>
                              <p className="text-sm font-medium">{contact.sub}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Submitted</p>
                              <p className="text-sm font-medium">{formatDate(contact.date)}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Message</h4>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
                            <p className="text-sm whitespace-pre-line">{contact.desc}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => markAsRead(contact.id)}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200"
                        >
                          Mark as Read
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSubmissions;