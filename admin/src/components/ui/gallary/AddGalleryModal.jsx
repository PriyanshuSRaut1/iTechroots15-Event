import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import database from "../../../firebase";

const AddGalleryModal = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [newGalleryItem, setNewGalleryItem] = useState({
    imageUrl: "",
    caption: "",
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
      formData.append('upload_preset', 'itechroots');
      formData.append('cloud_name', 'dtns6egbl');

      const response = await fetch('https://api.cloudinary.com/v1_1/dtns6egbl/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setNewGalleryItem({ ...newGalleryItem, imageUrl: data.secure_url });
      setMessage({ text: "Image uploaded successfully!", type: "success" });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: 'Image upload failed. Please try again.', type: "error" });
      setImagePreview(null);
      setNewGalleryItem({ ...newGalleryItem, imageUrl: "" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (field, value) => {
    setNewGalleryItem({ ...newGalleryItem, [field]: value });
  };

  const handleSaveGalleryItem = async () => {
    if (!newGalleryItem.imageUrl) {
      setMessage({ text: "Image is required.", type: "error" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const galleryRef = ref(database, "gallery");
      const newItemRef = push(galleryRef);
      
      const galleryData = {
        ...newGalleryItem,
        timestamp: Date.now(),
      };
      
      await set(newItemRef, galleryData);
      
      onClose();
      // Reset form
      setNewGalleryItem({ imageUrl: "", caption: "" });
      setImagePreview(null);
      setMessage({ text: "", type: "" });
    } catch (error) {
      console.error("Error adding gallery item:", error);
      setMessage({ text: "Failed to add image to gallery. Please try again.", type: "error" });
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
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col mx-4 my-8"
          >
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add to Gallery</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (optional)
                </label>
                <textarea
                  className="w-full border p-3 rounded-lg resize-none"
                  placeholder="Enter image caption..."
                  rows={3}
                  value={newGalleryItem.caption}
                  onChange={(e) => handleChange("caption", e.target.value)}
                />
              </div>

              {/* Image Upload Section */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gallery Image (required)
                </label>
                <div className="space-y-4">
                  {!imagePreview && (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-6">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files[0])}
                      />
                    </label>
                  )}
                  
                  {imagePreview && (
                    <div className="space-y-4">
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain bg-gray-50"
                        />
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setNewGalleryItem({ ...newGalleryItem, imageUrl: "" });
                          }}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                  </div>
                )}
              </div>

              {/* Message Display */}
              {message.text && (
                <div
                  className={`p-3 rounded-md text-sm mt-4 mb-4 ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>

            {/* Buttons - Fixed at the bottom */}
            <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGalleryItem}
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  {isSubmitting ? "Adding..." : "Add to Gallery"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddGalleryModal;