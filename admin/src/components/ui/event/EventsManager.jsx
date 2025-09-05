import React, { useState } from "react";
import { ref, update } from "firebase/database";
import database from "../../../firebase";
import { Calendar, Plus, Save } from "lucide-react";
import AddEventModal from "./AddEventModal";

const EventsManager = ({ likes, loading }) => {
  const [editLikes, setEditLikes] = useState({});
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Initialize editLikes when likes data changes
  useState(() => {
    if (likes) {
      const editData = {};
      Object.keys(likes).forEach(key => {
        editData[key] = { ...likes[key] };
      });
      setEditLikes(editData);
    }
  }, [likes]);

  const handleLikeEditChange = (eventId, field, value) => {
    setEditLikes(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value
      }
    }));
  };

  const saveLikeUpdate = (eventId) => {
    const likeRef = ref(database, `likes/${eventId}`);
    const updates = {
      count: parseInt(editLikes[eventId]?.count) || 0,
      name: editLikes[eventId]?.name || "",
      date: editLikes[eventId]?.date || "",
      description: editLikes[eventId]?.description || ""
    };
    update(likeRef, updates);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Events</h2>
          <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
            {Object.keys(likes).length}
          </span>
        </div>
        <button
          onClick={() => setShowAddEventModal(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Event
        </button>
      </div>

      {Object.keys(likes).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200 mx-4 sm:mx-0">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
          <p className="text-gray-500">Add your first event to get started</p>
          <button
            onClick={() => setShowAddEventModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-0">
          {Object.entries(editLikes).map(([eventId, data]) => (
            <div
              key={eventId}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {data.name || `Event: ${eventId}`}
                    </h3>
                    {data.date && (
                      <p className="text-sm text-gray-500">{data.date}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Likes Count
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        value={data.count || 0}
                        onChange={(e) => handleLikeEditChange(eventId, "count", e.target.value)}
                        className="block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => saveLikeUpdate(eventId)}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                  {data.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <p className="text-sm text-gray-600">{data.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddEventModal 
        show={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
      />
    </section>
  );
};

export default EventsManager;