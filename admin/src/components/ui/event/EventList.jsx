import React, { useState, useEffect } from "react";
import { ref, get, remove, set, push } from "firebase/database";
import { 
  Edit3, Trash2, Calendar, MapPin, Clock, Users, DollarSign, 
  Plus, Save, X, Eye, ChevronDown, ChevronUp, Link, User, Phone, Mail, Hash
} from "lucide-react";
import database from "../../../firebase";
import AddEventModal from "./AddEventModal";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEventData, setEditingEventData] = useState({
    id: "",
    title: "",
    description: "",
    category: "Technical",
    date: "",
    startTime: "",
    duration: "",
    location: "",
    entryFees: "",
    minMembers: "",
    maxMembers: "",
    formLink: "",
    googleFormLink: "",
    imageUrl: "",
    qr: "",
    requirements: [""],
    organizers: [{ name: "", email: "", phone: "" }],
    coOrganizers: [{ name: "", email: "", phone: "" }],
    price: {
      pool: "",
      first: "",
      second: "",
      third: ""
    }
  });
  const [saving, setSaving] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsRef = ref(database, "events");
      const snapshot = await get(eventsRef);
      
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsArray = Object.keys(eventsData).map(key => ({
          firebaseKey: key,
          id: eventsData[key].id,
          ...eventsData[key],
          price: eventsData[key].price || {
            pool: "",
            first: "",
            second: "",
            third: ""
          },
          requirements: eventsData[key].requirements || [""],
          organizers: eventsData[key].organizers || [{ name: "", email: "", phone: "" }],
          coOrganizers: eventsData[key].coOrganizers || [{ name: "", email: "", phone: "" }]
        }));
        
        eventsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(eventsArray);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (firebaseKey, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }

    setDeleting(firebaseKey);
    try {
      const eventRef = ref(database, `events/${firebaseKey}`);
      await remove(eventRef);
      setEvents(events.filter(event => event.firebaseKey !== firebaseKey));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.firebaseKey);
    setEditingEventData({
      id: event.id, // Preserve the original ID
      title: event.title || "",
      description: event.description || "",
      category: event.category || "Technical",
      date: event.date || "",
      startTime: event.startTime || "",
      duration: event.duration || "",
      location: event.location || "",
      entryFees: event.entryFees || "",
      minMembers: event.minMembers || "",
      maxMembers: event.maxMembers || "",
      formLink: event.formLink || "",
      googleFormLink: event.googleFormLink || "",
      imageUrl: event.imageUrl || "",
      qr: event.qr || "",
      requirements: event.requirements || [""],
      organizers: event.organizers || [{ name: "", email: "", phone: "" }],
      coOrganizers: event.coOrganizers || [{ name: "", email: "", phone: "" }],
      price: {
        pool: event.price?.pool || "",
        first: event.price?.first || "",
        second: event.price?.second || "",
        third: event.price?.third || ""
      }
    });
  };

  const handleSaveEdit = async (firebaseKey) => {
    if (!editingEventData.title || !editingEventData.date) {
      alert("Title and date are required!");
      return;
    }

    setSaving(firebaseKey);
    try {
      const eventRef = ref(database, `events/${firebaseKey}`);
      
      const updatedEvent = {
        id: editingEventData.id, // Keep the original ID
        title: editingEventData.title,
        description: editingEventData.description,
        category: editingEventData.category,
        date: editingEventData.date,
        startTime: editingEventData.startTime,
        duration: editingEventData.duration,
        location: editingEventData.location,
        entryFees: editingEventData.entryFees,
        minMembers: editingEventData.minMembers,
        maxMembers: editingEventData.maxMembers,
        formLink: editingEventData.formLink,
        googleFormLink: editingEventData.googleFormLink,
        imageUrl: editingEventData.imageUrl,
        qr: editingEventData.qr,
        requirements: editingEventData.requirements,
        organizers: editingEventData.organizers,
        coOrganizers: editingEventData.coOrganizers,
        price: {
          pool: editingEventData.price?.pool || "",
          first: editingEventData.price?.first || "",
          second: editingEventData.price?.second || "",
          third: editingEventData.price?.third || ""
        }
      };

      await set(eventRef, updatedEvent);
      
      setEvents(events.map(event => 
        event.firebaseKey === firebaseKey ? { ...event, ...updatedEvent } : event
      ));
      
      setEditingEventId(null);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    } finally {
      setSaving(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
  };

  const handleInputChange = (field, value) => {
    if (field === 'pool' || field === 'first' || field === 'second' || field === 'third') {
      setEditingEventData({
        ...editingEventData,
        price: {
          ...editingEventData.price,
          [field]: value
        }
      });
    } else {
      setEditingEventData({
        ...editingEventData,
        [field]: value
      });
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...editingEventData[arrayName]];
    updatedArray[index][field] = value;
    setEditingEventData({
      ...editingEventData,
      [arrayName]: updatedArray
    });
  };

  const addArrayItem = (arrayName, emptyItem) => {
    setEditingEventData({
      ...editingEventData,
      [arrayName]: [...editingEventData[arrayName], emptyItem]
    });
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = editingEventData[arrayName].filter((_, i) => i !== index);
    setEditingEventData({
      ...editingEventData,
      [arrayName]: updatedArray
    });
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const eventsRef = ref(database, "events");
      const newEventRef = push(eventsRef);
      
      const eventWithPrice = {
        ...newEvent,
        price: newEvent.price || {
          pool: "",
          first: "",
          second: "",
          third: ""
        }
      };

      await set(newEventRef, eventWithPrice);
      fetchEvents();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };

  const toggleExpandEvent = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <AddEventModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEvent}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events List</h1>
            <p className="text-gray-600 mt-1">{events.length} events found</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Create your first event to get started.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const isEditing = editingEventId === event.firebaseKey;
              const isExpanded = expandedEventId === event.firebaseKey;
              
              return (
                <div
                  key={event.firebaseKey}
                  className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${
                    isEditing ? 'border-blue-300 shadow-lg' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-4">
                            {/* ID Field - Readonly */}
                            <div className="flex flex-col">
                              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Hash size={16} /> Event ID
                              </label>
                              <input 
                                className="border p-2 rounded bg-gray-100" 
                                value={editingEventData.id} 
                                readOnly 
                                disabled
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={editingEventData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="border rounded-lg px-3 py-2 text-lg font-semibold"
                                placeholder="Event Title"
                              />
                              <select
                                value={editingEventData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                              >
                                <option value="Technical">Technical</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Sports">Sports</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            
                            <textarea
                              value={editingEventData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              className="border rounded-lg px-3 py-2 w-full"
                              rows="3"
                              placeholder="Description"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="date"
                                value={editingEventData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                              />
                              <input
                                type="text"
                                value={editingEventData.startTime}
                                onChange={(e) => handleInputChange('startTime', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Start Time"
                              />
                              <input
                                type="text"
                                value={editingEventData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Duration"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={editingEventData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Location"
                              />
                              <input
                                type="text"
                                value={editingEventData.entryFees}
                                onChange={(e) => handleInputChange('entryFees', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Entry Fees"
                              />
                              <input
                                type="text"
                                value={editingEventData.minMembers}
                                onChange={(e) => handleInputChange('minMembers', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Min Members"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="url"
                                value={editingEventData.formLink}
                                onChange={(e) => handleInputChange('formLink', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="WhatsApp Group Link"
                              />
                              <input
                                type="url"
                                value={editingEventData.googleFormLink}
                                onChange={(e) => handleInputChange('googleFormLink', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Google Form Link"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="url"
                                value={editingEventData.imageUrl}
                                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Image URL"
                              />
                              <input
                                type="url"
                                value={editingEventData.qr}
                                onChange={(e) => handleInputChange('qr', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                                placeholder="QR Code URL"
                              />
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Prize Details</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <input
                                  type="text"
                                  value={editingEventData.price.pool}
                                  onChange={(e) => handleInputChange('pool', e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Total Pool"
                                />
                                <input
                                  type="text"
                                  value={editingEventData.price.first}
                                  onChange={(e) => handleInputChange('first', e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="First Prize"
                                />
                                <input
                                  type="text"
                                  value={editingEventData.price.second}
                                  onChange={(e) => handleInputChange('second', e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Second Prize"
                                />
                                <input
                                  type="text"
                                  value={editingEventData.price.third}
                                  onChange={(e) => handleInputChange('third', e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Third Prize"
                                />
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Requirements</h4>
                              {editingEventData.requirements.map((req, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                  <input
                                    value={req}
                                    onChange={(e) => handleArrayChange('requirements', i, '', e.target.value)}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                    placeholder="Requirement"
                                  />
                                  {editingEventData.requirements.length > 1 && (
                                    <button 
                                      onClick={() => removeArrayItem('requirements', i)}
                                      className="text-red-500"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => addArrayItem('requirements', '')}
                                className="text-blue-500 text-sm flex items-center gap-1"
                              >
                                <Plus size={14} /> Add Requirement
                              </button>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Organizers</h4>
                              {editingEventData.organizers.map((org, i) => (
                                <div key={i} className="mb-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                                    <input
                                      value={org.name}
                                      onChange={(e) => handleArrayChange('organizers', i, 'name', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Name"
                                    />
                                    <input
                                      value={org.email}
                                      onChange={(e) => handleArrayChange('organizers', i, 'email', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Email"
                                    />
                                    <input
                                      value={org.phone}
                                      onChange={(e) => handleArrayChange('organizers', i, 'phone', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Phone"
                                    />
                                  </div>
                                  {editingEventData.organizers.length > 1 && (
                                    <button 
                                      onClick={() => removeArrayItem('organizers', i)}
                                      className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                      <Trash2 size={14} /> Remove Organizer
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => addArrayItem('organizers', { name: "", email: "", phone: "" })}
                                className="text-blue-500 text-sm flex items-center gap-1"
                              >
                                <Plus size={14} /> Add Organizer
                              </button>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Co-Organizers</h4>
                              {editingEventData.coOrganizers.map((co, i) => (
                                <div key={i} className="mb-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                                    <input
                                      value={co.name}
                                      onChange={(e) => handleArrayChange('coOrganizers', i, 'name', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Name"
                                    />
                                    <input
                                      value={co.email}
                                      onChange={(e) => handleArrayChange('coOrganizers', i, 'email', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Email"
                                    />
                                    <input
                                      value={co.phone}
                                      onChange={(e) => handleArrayChange('coOrganizers', i, 'phone', e.target.value)}
                                      className="border rounded px-2 py-1 text-sm"
                                      placeholder="Phone"
                                    />
                                  </div>
                                  {editingEventData.coOrganizers.length > 1 && (
                                    <button 
                                      onClick={() => removeArrayItem('coOrganizers', i)}
                                      className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                      <Trash2 size={14} /> Remove Co-Organizer
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => addArrayItem('coOrganizers', { name: "", email: "", phone: "" })}
                                className="text-blue-500 text-sm flex items-center gap-1"
                              >
                                <Plus size={14} /> Add Co-Organizer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {event.title || "Untitled Event"}
                                </h3>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  {event.category || "General"}
                                </span>
                              </div>
                              <button 
                                onClick={() => toggleExpandEvent(event.firebaseKey)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Hash size={16} /> ID: {event.id}
                            </div>

                            {event.description && (
                              <p className="text-gray-600 mb-3 line-clamp-2">
                                {event.description}
                              </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              
                              {event.startTime && (
                                <div className="flex items-center gap-2">
                                  <Clock size={16} />
                                  <span>{event.startTime}</span>
                                </div>
                              )}

                              {event.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin size={16} />
                                  <span className="truncate">{event.location}</span>
                                </div>
                              )}

                              {event.minMembers && (
                                <div className="flex items-center gap-2">
                                  <Users size={16} />
                                  <span>{event.minMembers} - {event.maxMembers} members</span>
                                </div>
                              )}

                              {event.entryFees && (
                                <div className="flex items-center gap-2">
                                  <DollarSign size={16} />
                                  <span>₹{event.entryFees}</span>
                                </div>
                              )}
                            </div>

                            {isExpanded && (
                              <div className="mt-4 space-y-4">
                                {event.imageUrl && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Event Image:</span>
                                    <a href={event.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                                      <Link size={16} /> View Image
                                    </a>
                                  </div>
                                )}

                                {event.qr && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">QR Code:</span>
                                    <a href={event.qr} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                                      <Link size={16} /> View QR Code
                                    </a>
                                  </div>
                                )}

                                {event.formLink && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">WhatsApp Group:</span>
                                    <a href={event.formLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                                      <Link size={16} /> Join Group
                                    </a>
                                  </div>
                                )}

                                {event.googleFormLink && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Google Form:</span>
                                    <a href={event.googleFormLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                                      <Link size={16} /> Open Form
                                    </a>
                                  </div>
                                )}

                                {event.price && (event.price.pool || event.price.first || event.price.second || event.price.third) && (
                                  <div>
                                    <h4 className="font-medium mb-1">Prize Details:</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                      {event.price.pool && (
                                        <div className="bg-gray-100 p-2 rounded">
                                          <span className="font-medium">Total Pool:</span> ₹{event.price.pool}
                                        </div>
                                      )}
                                      {event.price.first && (
                                        <div className="bg-gray-100 p-2 rounded">
                                          <span className="font-medium">1st Prize:</span> ₹{event.price.first}
                                        </div>
                                      )}
                                      {event.price.second && (
                                        <div className="bg-gray-100 p-2 rounded">
                                          <span className="font-medium">2nd Prize:</span> ₹{event.price.second}
                                        </div>
                                      )}
                                      {event.price.third && (
                                        <div className="bg-gray-100 p-2 rounded">
                                          <span className="font-medium">3rd Prize:</span> ₹{event.price.third}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {event.requirements && event.requirements.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-1">Requirements:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {event.requirements.map((req, i) => (
                                        <li key={i}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {event.organizers && event.organizers.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-1">Organizers:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {event.organizers.map((org, i) => (
                                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                                          <div className="flex items-center gap-2 font-medium">
                                            <User size={16} /> {org.name}
                                          </div>
                                          <div className="flex items-center gap-2 text-sm mt-1">
                                            <Mail size={16} /> {org.email}
                                          </div>
                                          <div className="flex items-center gap-2 text-sm mt-1">
                                            <Phone size={16} /> {org.phone}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {event.coOrganizers && event.coOrganizers.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-1">Co-Organizers:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {event.coOrganizers.map((co, i) => (
                                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                                          <div className="flex items-center gap-2 font-medium">
                                            <User size={16} /> {co.name}
                                          </div>
                                          <div className="flex items-center gap-2 text-sm mt-1">
                                            <Mail size={16} /> {co.email}
                                          </div>
                                          <div className="flex items-center gap-2 text-sm mt-1">
                                            <Phone size={16} /> {co.phone}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="flex sm:flex-col gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(event.firebaseKey)}
                              disabled={saving === event.firebaseKey}
                              className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1 justify-center min-w-[100px] disabled:opacity-50"
                            >
                              {saving === event.firebaseKey ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
                              ) : (
                                <>
                                  <Save size={14} />
                                  Save
                                </>
                              )}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-1 justify-center min-w-[100px]"
                            >
                              <X size={14} />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            {/* <button
                              onClick={() => handleEditEvent(event)}
                              className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors flex items-center gap-1 justify-center min-w-[100px]"
                            >
                              <Edit3 size={14} />
                              Edit
                            </button> */}
                            <button
                              onClick={() => handleDeleteEvent(event.firebaseKey, event.title)}
                              disabled={deleting === event.firebaseKey}
                              className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1 justify-center min-w-[100px]"
                            >
                              {deleting === event.firebaseKey ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                              ) : (
                                <>
                                  <Trash2 size={14} />
                                  Delete
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;