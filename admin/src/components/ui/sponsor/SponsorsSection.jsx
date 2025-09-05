import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { Heart, Trash2, Plus, Search } from 'lucide-react';
import database from '../../../firebase';
import AddSponsorModal from './AddSponsorModal';

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch sponsors from Firebase
  useEffect(() => {
    const sponsorsRef = ref(database, 'sponsors');
    
    const unsubscribe = onValue(sponsorsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setSponsors(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteSponsor = async (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      try {
        const sponsorRef = ref(database, `sponsors/${id}`);
        await remove(sponsorRef);
      } catch (error) {
        console.error('Error deleting sponsor:', error);
        alert('Failed to delete sponsor. Please try again.');
      }
    }
  };

  const filteredSponsors = Object.entries(sponsors)
    .filter(([id, sponsor]) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        sponsor.name?.toLowerCase().includes(searchLower) ||
        sponsor.websiteLink?.toLowerCase().includes(searchLower)
      );
    })
    .reverse();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with Add Sponsor button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sponsors</h2>
          <p className="text-gray-600 mt-1">
            {Object.keys(sponsors).length} sponsors registered
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search sponsors..."
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
            Add Sponsor
          </button>
        </div>
      </div>

      {/* Sponsors List */}
      {filteredSponsors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {searchTerm ? "No matching sponsors found" : "No sponsors yet"}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? "Try a different search term" : "Add your first sponsor to get started"}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Sponsor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map(([id, sponsor]) => (
            <SponsorCard
              key={id}
              id={id}
              sponsor={sponsor}
              onDelete={handleDeleteSponsor}
            />
          ))}
        </div>
      )}

      {/* Add Sponsor Modal */}
      <AddSponsorModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={() => {
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

const SponsorCard = ({ id, sponsor, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{sponsor.name}</h3>
        </div>
        {sponsor.imageUrl && (
          <div className="my-4 flex justify-center">
            <img 
              src={sponsor.imageUrl} 
              alt={sponsor.name}
              className="h-24 object-contain"
            />
          </div>
        )}
        {sponsor.websiteLink && (
          <a 
            href={sponsor.websiteLink.startsWith('http') ? sponsor.websiteLink : `https://${sponsor.websiteLink}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-1 text-sm text-blue-600 hover:underline block"
          >
            {sponsor.websiteLink}
          </a>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;