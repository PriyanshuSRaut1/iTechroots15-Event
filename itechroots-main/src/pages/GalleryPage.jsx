import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Using imported image variables.
import img1 from '../images/1.jpeg'
import img2 from '../images/2.jpeg'
import img3 from '../images/3.jpeg'
import img4 from '../images/4.jpeg'
import img5 from '../images/5.jpeg'
import img6 from '../images/6.jpeg'
import img7 from '../images/7.jpg'
import img8 from '../images/8.jpg'
import img9 from '../images/9.jpeg'
import img10 from '../images/10.jpeg'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];

const GalleryPage = () => {
  // State to hold the currently selected image for the modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the modal with the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-20 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          IMAGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">GALLERY</span>
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer aspect-square"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(image)} // Add click handler to open modal
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600/555/fff?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay for larger image view */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal} // Close modal on overlay click
        >
          <div className="relative max-w-5xl max-h-full">
            <motion.img
              src={selectedImage}
              alt="Full screen view"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors duration-200"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPage;
