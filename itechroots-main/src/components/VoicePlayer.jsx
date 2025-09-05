import { useEffect, useRef, useState } from 'react';

export default function VoicePlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt to play the audio immediately when the component mounts.
    // Browsers often block autoplay without user interaction, so a warning might appear.
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Autoplay failed:', e.message);
          // If autoplay fails, you might want to inform the user to click the button.
        });
    }
    // No event listeners are added here as the intent is to autoplay by default.
    // Therefore, no cleanup for event listeners is needed.
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause ominous whispers' : 'Play ominous whispers'}
        style={{
          position: 'fixed',
          top: '80px', // Moved downwards from 16px to 60px
          right: '16px',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isPlaying
            ? 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)'
            : 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
          boxShadow: isPlaying
            ? '0 3px 10px rgba(139, 0, 0, 0.7)'
            : '0 3px 10px rgba(0, 0, 0, 0.5)',
          fontSize: '1rem',
          userSelect: 'none',
          outline: 'none',
          fontFamily: 'serif',
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        {isPlaying ? '◼' : '▶'}
      </button>
    </>
  );
}