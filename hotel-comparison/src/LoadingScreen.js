import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ messages }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex < messages.length) {
          return newIndex;
        } else {
          return prevIndex;
        }
      });
    }, 7000); // 4 seconds delay

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <div className="loading-message">
        <p>{messages[currentMessageIndex]}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
