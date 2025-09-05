import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import database from "../../../firebase";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import AddTeamMemberModal from "../../AddMemberModal";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState({
    core: [],
    heads: [],
    "coheads/coordinators": [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const teamsRef = ref(database, "teams");

    const unsubscribe = onValue(
      teamsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const membersArray = Object.entries(data).map(([id, member]) => ({
              id,
              ...member,
            }));
            
            const groupedMembers = {
              core: membersArray.filter(member => member.team === "core"),
              heads: membersArray.filter(member => member.team === "heads"),
              "coheads/coordinators": membersArray.filter(
                member => member.team === "coheads/coordinators"
              ),
            };
            
            setTeamMembers(groupedMembers);
          } else {
            setTeamMembers({
              core: [],
              heads: [],
              "coheads/coordinators": [],
            });
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to load team members");
          setLoading(false);
          console.error("Error parsing data:", err);
        }
      },
      (error) => {
        setError("Failed to fetch team members");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        const memberRef = ref(database, `teams/${memberId}`);
        await remove(memberRef);
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete team member");
      }
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setEditModalOpen(true);
  };

  const handleAddMember = () => {
    setAddModalOpen(true);
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      const memberRef = ref(database, `teams/${updatedMember.id}`);
      await update(memberRef, {
        name: updatedMember.name,
        post: updatedMember.post,
        email: updatedMember.email,
        mobNo: updatedMember.mobNo,
        team: updatedMember.team,
        imageUrl: updatedMember.imageUrl,
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update team member");
    }
  };

  const handleAddNewMember = async (newMember) => {
    try {
      const teamsRef = ref(database, "teams");
      const newMemberRef = push(teamsRef);
      await set(newMemberRef, newMember);
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add team member");
    }
  };

  const filterMembers = (members) => {
    if (!searchTerm) return members;
    const term = searchTerm.toLowerCase();
    return members.filter(member => 
      member.name.toLowerCase().includes(term) ||
      member.post.toLowerCase().includes(term) ||
      (member.email && member.email.toLowerCase().includes(term)) ||
      (member.mobNo && member.mobNo.includes(searchTerm)) ||
      member.team.toLowerCase().includes(term)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  const TeamSection = ({ title, members }) => {
    const filtered = filterMembers(members);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {title} ({filtered.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-2 right-2 flex gap-2 z-10">
               
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                  aria-label="Delete member"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              
              <div className="flex justify-center mt-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={member.imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </div>
              </div>
              
              <div className="p-4 pt-2 text-center">
                <h3 className="font-semibold text-lg text-gray-800 mt-4">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.post}</p>
                {member.email && (
                  <p className="text-gray-600 text-sm mt-1">
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </p>
                )}
                {member.mobNo && (
                  <p className="text-gray-600 text-sm mt-1">
                    <a href={`tel:${member.mobNo}`} className="hover:underline">
                      {member.mobNo}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Our Team</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search team members..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={handleAddMember}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>
      </div>
      
      <TeamSection title="Core Team" members={teamMembers.core} />
      <TeamSection title="Heads" members={teamMembers.heads} />
      <TeamSection 
        title="Co-Heads / Coordinators" 
        members={teamMembers["coheads/coordinators"]} 
      />

      {/* Edit Modal */}
      {editModalOpen && currentMember && (
        <AddTeamMemberModal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={currentMember}
          onSave={handleUpdateMember}
          isEditMode={true}
        />
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <AddTeamMemberModal
          show={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddNewMember}
          isEditMode={false}
        />
      )}
    </div>
  );
};

export default TeamMembers;