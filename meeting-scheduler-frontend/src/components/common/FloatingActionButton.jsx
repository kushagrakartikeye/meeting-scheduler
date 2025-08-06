import { useState } from 'react';

const FloatingActionButton = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fab-container">
      <button
        className={`fab ${isExpanded ? 'expanded' : ''}`}
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded) {
            setTimeout(onClick, 200);
          }
        }}
      >
        <span className="fab-icon">+</span>
        <span className="fab-text">New Meeting</span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
