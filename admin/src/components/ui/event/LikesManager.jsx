import React, { useEffect, useState } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import database from "../../../firebase";
import { Heart, HeartOff } from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner";

const LikesManager = () => {
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const likesRef = ref(database, "likes");
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      setLikes(data || {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleIncrement = (eventId) => {
    const eventRef = ref(database, `likes/${eventId}`);
    runTransaction(eventRef, (currentData) => {
      if (!currentData) return { count: 1 };
      return { ...currentData, count: (currentData.count || 0) + 1 };
    });
  };

  const handleDecrement = (eventId) => {
    const eventRef = ref(database, `likes/${eventId}`);
    runTransaction(eventRef, (currentData) => {
      if (!currentData) return { count: 0 };
      const newCount = Math.max(0, (currentData.count || 0) - 1);
      return { ...currentData, count: newCount };
    });
  };

  const startEditing = (eventId, currentCount) => {
    setEditingId(eventId);
    setNewCount(currentCount);
  };

  const handleEditChange = (e) => {
    setNewCount(Number(e.target.value));
  };

  const saveEdit = (eventId) => {
    if (isNaN(newCount)) return;
    
    const eventRef = ref(database, `likes/${eventId}`);
    runTransaction(eventRef, (currentData) => {
      return { ...currentData, count: Math.max(0, newCount) };
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Event Likes Management</h3>
        <p className="mt-1 text-sm text-gray-600">Manage like counts for each event</p>
      </div>
      <div className="divide-y divide-gray-200">
        {Object.entries(likes).length > 0 ? (
          Object.entries(likes).map(([eventId, eventData]) => (
            <div key={eventId} className="px-6 py-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {eventData.name || eventId}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {eventData.description}
                </p>
              </div>
              <div className="ml-4 flex items-center space-x-4">
                {editingId === eventId ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={newCount}
                      onChange={handleEditChange}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      min="0"
                    />
                    <button
                      onClick={() => saveEdit(eventId)}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-900 font-medium">
                      {eventData.count || 0}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleIncrement(eventId)}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Increment"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDecrement(eventId)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Decrement"
                      >
                        <HeartOff className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => startEditing(eventId, eventData.count || 0)}
                        className="p-1 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">
            No events found
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesManager;