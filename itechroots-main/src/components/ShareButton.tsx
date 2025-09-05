import React from "react";
import { FaShare } from "react-icons/fa";
import { motion } from "framer-motion";

type ShareButtonProps = {
  title: string;
  description?: string;
  url?: string; // Optional override
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  description = "",
  url,
}) => {
  const handleShare = async () => {
    const shareData = {
      title,
      text: description,
      url: url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Sharing failed:", error);
        alert("Sharing failed.");
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `${title}\n${description}\n${shareData.url}`
        );
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
      }
    }
  };

  // ShareButton.tsx
return (
  <div className="flex items-center">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="p-2 bg-gray-900 border-2 border-red-800 rounded-lg text-red-600 hover:text-red-400 transition"
      title="Share this event"
    >
      <FaShare />
    </motion.button>
  </div>
);

};

export default ShareButton;