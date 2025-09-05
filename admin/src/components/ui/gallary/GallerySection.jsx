import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { Image as ImageIcon, Trash2, Plus } from 'lucide-react';
import database from '../../../firebase';
import AddGalleryModal from './AddGalleryModal'; // Make sure this import path is correct

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const galleryRef = ref(database, 'gallery');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([id, item]) => ({
          id,
          ...item
        }));
        // Sort by timestamp (newest first)
        items.sort((a, b) => b.timestamp - a.timestamp);
        setGalleryItems(items);
      } else {
        setGalleryItems([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteGalleryItem = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (confirmDelete) {
      const itemRef = ref(database, `gallery/${id}`);
      remove(itemRef);
    }
  };

  const filteredItems = galleryItems.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      item.caption && item.caption.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6 p-5">
        <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gallary Submissions</h1>
              <p className="text-gray-600 mt-1">View and manage all Gallary submissions</p>
            </div>
          </div>
        </div>
        </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search gallery..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {searchTerm ? "No matching images found" : "No gallery images yet"}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? "Try a different search term" : "Add your first image to get started"}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.caption || "Gallery image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                {item.caption && (
                  <p className="text-gray-700 mb-3">{item.caption}</p>
                )}
                <button
                  onClick={() => deleteGalleryItem(item.id)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddGalleryModal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default GallerySection;
