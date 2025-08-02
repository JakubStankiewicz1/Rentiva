import React from 'react';
import './successNotification.css';

const SuccessNotification = ({ isVisible, onClose, reservationId, carName }) => {
  if (!isVisible) return null;

  const message = `Twoja rezerwacja samochodu ${carName} została utworzona pomyślnie!${
    reservationId ? ` Numer rezerwacji: ${reservationId}` : ''
  }`;

  return (
    <div className="success-notification">
      <div className="success-notification-content">
        <div className="success-icon">✓</div>
        <div className="success-message">
          <h3 className="bai-jamjuree-semibold">Rezerwacja zakończona sukcesem!</h3>
          <p className="bai-jamjuree-regular">{message}</p>
          <p className="bai-jamjuree-regular">Sprawdzimy dostępność i skontaktujemy się z Tobą wkrótce.</p>
        </div>
        <button className="success-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SuccessNotification;
