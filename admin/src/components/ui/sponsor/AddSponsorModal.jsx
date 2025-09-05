import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
// Import the pre-initialized database instance
import database from "../../../firebase";

const AddSponsorModal = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [newSponsor, setNewSponsor] = useState({
    name: "",
    websiteLink: "",
    imageUrl: "",
  });

  // Handle file upload to Cloudinary and update state with the image URL.
  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setMessage({ text: "", type: "" });

    // Create a local preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Cloudinary upload preset and cloud name from your team member component
      formData.append('upload_preset', 'itechroots');
      formData.append('cloud_name', 'dtns6egbl');

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
          setNewSponsor({ ...newSponsor, imageUrl: data.secure_url });
          setMessage({ text: "Image uploaded successfully!", type: "success" });
        } else {
          setMessage({ text: 'Upload failed.', type: "error" });
          setImagePreview(null);
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        setMessage({ text: 'Network error.', type: "error" });
        setImagePreview(null);
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: 'Image upload failed. Please try again.', type: "error" });
      setImagePreview(null);
      setIsUploading(false);
    }
  };

  // Handle changes in the input fields.
  const handleChange = (field, value) => {
    setNewSponsor({ ...newSponsor, [field]: value });
  };

  // Save the new sponsor to the Realtime Database.
  const handleSaveSponsor = async () => {
    if (!newSponsor.name || !newSponsor.websiteLink || !newSponsor.imageUrl) {
      setMessage({ text: "Name, website link, and an image are required.", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use ref, push, and set for Firebase Realtime Database
      // The path is now a simple "sponsors" as in your example
      const sponsorsRef = ref(database, "sponsors");
      const newMemberRef = push(sponsorsRef);
      await set(newMemberRef, newSponsor);

      onClose();
      // Reset the form after successful submission
      setNewSponsor({ name: "", websiteLink: "", imageUrl: "" });
      setImagePreview(null);
      setMessage({ text: "Sponsor added successfully!", type: "success" });
    } catch (error) {
      console.error("Error adding sponsor:", error);
      setMessage({ text: "Failed to add sponsor. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-6 rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 font-inter">Add New Sponsor</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 rounded-full p-1 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4">
              <input
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Sponsor Name"
                value={newSponsor.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="url"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Website Link (e.g., https://example.com)"
                value={newSponsor.websiteLink}
                onChange={(e) => handleChange("websiteLink", e.target.value)}
              />
            </div>

            {/* Image Upload Section */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Sponsor Logo</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 font-inter">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 font-inter">PNG, JPG, JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                </label>
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
              </div>
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width:` ${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                className={`p-3 rounded-lg text-sm font-inter ${
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
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-inter"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSponsor}
                disabled={isSubmitting || isUploading || !newSponsor.imageUrl}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-400 transition-colors font-inter"
              >
                {isSubmitting ? "Adding..." : "Add Sponsor"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSponsorModal; 