import React, { useState } from 'react';
import './reservationModal.css';

const ReservationModal = ({ car, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    notes: '',
    pickupLocation: '',
    dropoffLocation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const reservationData = {
        carId: car.id,
        ...formData
      };

      const response = await fetch('https://rentiva-backend.onrender.com/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas tworzenia rezerwacji');
      }

      const reservation = await response.json();
      onSubmit(reservation);
      onClose();
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        notes: '',
        pickupLocation: '',
        dropoffLocation: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reservation-modal-header">
          <h2 className="bai-jamjuree-semibold">Rezerwacja samochodu</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="reservation-modal-car-info">
          <img src={car.images?.[0]} alt={car.title} className="car-thumbnail" />
          <div className="car-details">
            <h3 className="bai-jamjuree-medium">{car.title}</h3>
            <p className="bai-jamjuree-regular">{car.brand} {car.model}</p>
            <p className="price bai-jamjuree-medium">
              {car.pricing?.daily ? `${car.pricing.daily} PLN/dzień` : `${car.grossPrice} PLN`}
            </p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p className="bai-jamjuree-regular">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <div className="form-group">
              <label className="bai-jamjuree-medium">Imię *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="bai-jamjuree-regular"
                placeholder="Wpisz swoje imię"
              />
            </div>
            <div className="form-group">
              <label className="bai-jamjuree-medium">Nazwisko *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="bai-jamjuree-regular"
                placeholder="Wpisz swoje nazwisko"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="bai-jamjuree-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bai-jamjuree-regular"
                placeholder="twoj.email@example.com"
              />
            </div>
            <div className="form-group">
              <label className="bai-jamjuree-medium">Telefon *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bai-jamjuree-regular"
                placeholder="+48 123 456 789"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="bai-jamjuree-medium">Data rozpoczęcia *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min={today}
                required
                className="bai-jamjuree-regular"
              />
            </div>
            <div className="form-group">
              <label className="bai-jamjuree-medium">Data zakończenia *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={formData.startDate || today}
                required
                className="bai-jamjuree-regular"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="bai-jamjuree-medium">Miejsce odbioru</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="bai-jamjuree-regular"
                placeholder="np. Warszawa Centrum"
              />
            </div>
            <div className="form-group">
              <label className="bai-jamjuree-medium">Miejsce zwrotu</label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                className="bai-jamjuree-regular"
                placeholder="np. Kraków Główny"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="bai-jamjuree-medium">Uwagi</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="bai-jamjuree-regular"
              placeholder="Dodatkowe informacje lub prośby..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-button bai-jamjuree-medium"
              disabled={isSubmitting}
            >
              Anuluj
            </button>
            <button 
              type="submit"
              className="submit-button bai-jamjuree-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Rezerwuję...' : 'Zarezerwuj samochód'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
