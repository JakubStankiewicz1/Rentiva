import React, { useState, useEffect } from 'react';
import './carCard.css';
import { Link } from 'react-router-dom';
import CarService from '../../services/car.service';

const CarCard = ({ car, onDelete }) => {
  const [hasReservations, setHasReservations] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(true);

  // Check if car has reservations
  useEffect(() => {
    const checkReservations = async () => {
      try {
        const hasRes = await CarService.carHasReservations(car.id);
        setHasReservations(hasRes);
      } catch (error) {
        console.error('Error checking reservations:', error);
      } finally {
        setLoadingReservations(false);
      }
    };

    checkReservations();
  }, [car.id]);

  // Function to extract the first image from the list
  const getFirstImage = () => {
    if (car.images && car.images.length > 0 && car.images[0]) {
      // Check if it's already a full URL
      if (car.images[0].startsWith('http://') || car.images[0].startsWith('https://')) {
        return car.images[0];
      }
      // Fallback for old data - add /images/ prefix
      return `/images/${car.images[0]}.jpg`;
    }
    return '/images/car-placeholder.jpg'; // Default image
  };

  const handleDeleteClick = () => {
    if (hasReservations) {
      // Show warning toast
      const { toast } = require('react-toastify');
      toast.warning(
        <div>
          <div>Cannot delete car with reservations</div>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            Please delete all reservations for this car first in the Reservations section.
          </div>
        </div>,
        { autoClose: 6000 }
      );
      return;
    }
    onDelete(car.id);
  };

  return (
    <div className="rentivaAdminCarCard">
      <img
        className="rentivaAdminCarCard__image"
        src={getFirstImage()}
        alt={car.title}
      />
      
      <div className="rentivaAdminCarCard__content">
        <p className="rentivaAdminCarCard__title">{car.title}</p>
        
        <div className="rentivaAdminCarCard__badges">
          <span className="rentivaAdminCarCard__badge rentivaAdminCarCard__badge--brand">
            {car.brand}
          </span>
          <span className="rentivaAdminCarCard__badge rentivaAdminCarCard__badge--type">
            {car.type}
          </span>
        </div>
        
        <div className="rentivaAdminCarCard__specs">
          <div className="rentivaAdminCarCard__specRow">
            <p className="rentivaAdminCarCard__specLabel">Engine:</p>
            <p className="rentivaAdminCarCard__specValue">{car.engine}</p>
          </div>
          <div className="rentivaAdminCarCard__specRow">
            <p className="rentivaAdminCarCard__specLabel">Power:</p>
            <p className="rentivaAdminCarCard__specValue">{car.power} HP</p>
          </div>
          <div className="rentivaAdminCarCard__specRow">
            <p className="rentivaAdminCarCard__specLabel">0-100:</p>
            <p className="rentivaAdminCarCard__specValue">{car.acceleration}s</p>
          </div>
          <div className="rentivaAdminCarCard__specRow">
            <p className="rentivaAdminCarCard__specLabel">Vmax:</p>
            <p className="rentivaAdminCarCard__specValue">{car.maxSpeed} km/h</p>
          </div>
        </div>
        
        <p className="rentivaAdminCarCard__price">
          {car.grossPrice} PLN / day
        </p>

        {/* Show warning if car has reservations */}
        {hasReservations && (
          <div className="rentivaAdminCarCard__warning">
            <span className="warning-icon">⚠️</span>
            <span>Has reservations - </span>
            <Link to="/reservations" className="warning-link">
              View Reservations
            </Link>
          </div>
        )}
      </div>
      
      <div className="rentivaAdminCarCard__actions">
        <Link 
          to={`/cars/${car.id}`} 
          className="rentivaAdminCarCard__detailsButton"
        >
          <span className="rentivaAdminCarCard__icon">ℹ️</span>
          Details
        </Link>
        
        <div className="rentivaAdminCarCard__actionButtons">
          <Link 
            to={`/cars/edit/${car.id}`} 
            className="rentivaAdminCarCard__editButton"
          >
            <span className="rentivaAdminCarCard__icon">✏️</span>
            Edit
          </Link>
          
          <button 
            className={`rentivaAdminCarCard__deleteButton ${hasReservations ? 'rentivaAdminCarCard__deleteButton--disabled' : ''}`}
            onClick={handleDeleteClick}
            disabled={hasReservations}
            title={hasReservations ? 'Cannot delete car with reservations' : 'Delete car'}
          >
            <span className="rentivaAdminCarCard__icon">🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
