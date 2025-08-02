import React, { useState } from 'react';
import './reservationModal.css';
import apiRequest from '../../utils/api-config';

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

  const validateForm = () => {
    const errors = [];

    // Walidacja wymaganych pól
    if (!formData.firstName.trim()) errors.push('Imię jest wymagane');
    if (!formData.lastName.trim()) errors.push('Nazwisko jest wymagane');
    if (!formData.email.trim()) errors.push('Email jest wymagany');
    if (!formData.phone.trim()) errors.push('Telefon jest wymagany');
    if (!formData.startDate) errors.push('Data rozpoczęcia jest wymagana');
    if (!formData.endDate) errors.push('Data zakończenia jest wymagana');

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Nieprawidłowy format email');
    }

    // Walidacja telefonu
    const phoneRegex = /^[+]?[0-9]{9,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Nieprawidłowy format telefonu');
    }

    // Walidacja dat
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        errors.push('Data rozpoczęcia nie może być w przeszłości');
      }

      if (endDate < startDate) {
        errors.push('Data zakończenia nie może być wcześniejsza niż data rozpoczęcia');
      }

      if (startDate.getTime() === endDate.getTime()) {
        // Pozwalamy na rezerwacje jednodniowe
        console.log('Same-day reservation allowed');
      }
    }

    return errors;
  };

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch('https://rentiva.onrender.com/api/reservations/health');
      console.log('Backend health check response:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Debug logging
    console.log('=== RESERVATION SUBMIT DEBUG ===');
    console.log('Car:', car);
    console.log('Form data:', formData);
    console.log('==============================');

    try {
      // Walidacja formularza
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Test backend connection first
      const isBackendAvailable = await testBackendConnection();
      if (!isBackendAvailable) {
        throw new Error('Backend nie jest dostępny. Spróbuj ponownie za chwilę.');
      }

      const reservationData = {
        carId: car.id,
        ...formData
      };

      console.log('Sending reservation data:', reservationData);

      // Używamy apiRequest zamiast bezpośredniego fetch
      const reservation = await apiRequest('/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData)
      });

      console.log('Success response:', reservation);
      
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
      console.error('Reservation error:', err);
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
