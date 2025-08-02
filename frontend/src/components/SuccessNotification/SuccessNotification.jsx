import React from 'react';
import './successNotification.css';

const SuccessNotification = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="success-notification">
      <div className="success-notification-content">
        <div className="success-icon">✓</div>
        <div className="success-message">
          <h3 className="bai-jamjuree-semibold">Rezerwacja zakończona sukcesem!</h3>
          <p className="bai-jamjuree-regular">{message}</p>
        </div>
        <button className="success-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SuccessNotification;
