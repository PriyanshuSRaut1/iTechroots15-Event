import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import database from "../firebase"; // Adjust the path as needed

const AddTeamMemberModal = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    post: "",
    email: "",
    mobNo: "",
    team: "core", // Default value
    imageUrl: "",
  });

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setMessage({ text: "", type: "" });

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'itechroots'); // Your Cloudinary upload preset
      formData.append('cloud_name', 'dtns6egbl'); // Your Cloudinary cloud name

      // Using XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.cloudinary.com/v1_1/dtns6egbl/image/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setNewTeamMember({ ...newTeamMember, imageUrl: data.secure_url });
          setMessage({ text: "Image uploaded successfully!", type: "success" });
        } else {
          throw new Error('Upload failed');
        }
      };

      xhr.onerror = () => {
        throw new Error('Upload failed due to network error');
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: 'Image upload failed. Please try again.', type: "error" });
      setImagePreview(null); // Clear preview on failure
      setNewTeamMember({ ...newTeamMember, imageUrl: "" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (field, value) => {
    setNewTeamMember({ ...newTeamMember, [field]: value });
  };

  const handleSaveTeamMember = async () => {
    if (!newTeamMember.name || !newTeamMember.email || !newTeamMember.post || !newTeamMember.imageUrl) {
      setMessage({ text: "Name, email, post, and an image are required.", type: "error" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const teamsRef = ref(database, "teams");
      const newMemberRef = push(teamsRef);
      
      await set(newMemberRef, newTeamMember);
      
      onClose();
      // Reset the form after successful submission
      setNewTeamMember({
        name: "",
        post: "",
        email: "",
        mobNo: "",
        team: "core",
        imageUrl: "",
      });
      setImagePreview(null);
      setMessage({ text: "Team member added successfully!", type: "success" });
    } catch (error) {
      console.error("Error adding team member:", error);
      setMessage({ text: "Failed to add team member. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Add New Team Member</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Name"
                value={newTeamMember.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                className="border p-2 rounded"
                placeholder="Post (e.g., President, Developer)"
                value={newTeamMember.post}
                onChange={(e) => handleChange("post", e.target.value)}
              />
              <input
                type="email"
                className="border p-2 rounded"
                placeholder="Email"
                value={newTeamMember.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <input
                type="tel"
                className="border p-2 rounded"
                placeholder="Mobile Number"
                value={newTeamMember.mobNo}
                onChange={(e) => handleChange("mobNo", e.target.value)}
              />
              
              {/* Team Dropdown */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Role</label>
                <select
                  className="border p-2 rounded w-full"
                  value={newTeamMember.team}
                  onChange={(e) => handleChange("team", e.target.value)}
                >
                  <option value="core">Core</option>
                  <option value="heads">Heads</option>
                  <option value="coheads/coordinators">Co-Heads / Coordinators</option>
                </select>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">Member Image</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                </label>
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}% `}}
                  ></div>
                </div>
              )}
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTeamMember}
                disabled={isSubmitting || isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
              >
                {isSubmitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTeamMemberModal;