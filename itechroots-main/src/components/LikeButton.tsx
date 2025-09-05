import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { database } from '../firebase';
import { ref, onValue, runTransaction } from 'firebase/database';

const LikeButton = ({ eventId }) => {
  const [likesCount, setLikesCount] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const localStorageKey = `liked_${eventId}`;

  useEffect(() => {
    // Check if the firebase config and database are available before proceeding.
    if (!database) {
      console.error("Firebase database is not initialized.");
      setLoading(false);
      return;
    }

    const likesRef = ref(database, `likes/${eventId}/count`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const count = snapshot.val();
      setLikesCount(count ?? 0);
    });

    const likedStatus = localStorage.getItem(localStorageKey);
    setUserLiked(likedStatus === 'true');
    setLoading(false);

    return () => unsubscribe();
  }, [eventId]);

  const handleToggleLike = async () => {
    if (loading) return;

    setLoading(true);
    const likesRef = ref(database, `likes/${eventId}/count`);

    // Ensure the database reference exists before running a transaction
    if (!likesRef) {
      console.error("Database reference is not valid.");
      setLoading(false);
      return;
    }

    try {
      await runTransaction(likesRef, (current) => {
        const newCount = (current || 0) + (userLiked ? -1 : 1);
        return newCount < 0 ? 0 : newCount;
      });
  
      const newLikedState = !userLiked;
      localStorage.setItem(localStorageKey, String(newLikedState));
      setUserLiked(newLikedState);
    } catch (error) {
      console.error("Failed to run transaction:", error);
      // Handle the error gracefully without stopping the UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center font-serif text-gray-300">
      {loading ? (
        // A minimal, dark spinner that fits the theme
        <div className="w-6 h-6 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <motion.button
          onClick={handleToggleLike}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center rounded-xl gap-2 px-3 py-1 border-2 transition-all duration-200 text-sm sm:text-base cursor-pointer
            ${userLiked
              // Styles for the 'cursed' liked state
              ? 'bg-black text-red-700 border-red-700 hover:bg-neutral-900 hover:border-red-500'
              // Styles for the unliked state
              : 'bg-black text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
        >
          <motion.span
            key={userLiked ? 'liked' : 'unliked'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'tween', duration: 0.15 }}
          >
            {userLiked ? <FaHeart className="text-red-700" /> : <FaRegHeart className="text-gray-400" />}
          </motion.span>
          <span>{likesCount}</span>
        </motion.button>
      )}
    </div>
  );
};

export default LikeButton;
