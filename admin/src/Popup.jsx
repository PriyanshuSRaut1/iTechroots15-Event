import React, { useEffect } from 'react';

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <p style={styles.text}>{message}</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  popup: {
    backgroundColor: '#1e1e1e',
    padding: '20px 30px',
    borderRadius: '10px',
    border: '2px solid #ff0000',
    boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)',
  },
  text: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
};

export default Popup;
