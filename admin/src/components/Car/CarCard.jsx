import React from 'react';
import './carCard.css';
import { Link } from 'react-router-dom';

const CarCard = ({ car, onDelete }) => {  // Function to extract the first image from the list
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
            className="rentivaAdminCarCard__deleteButton"
            onClick={() => onDelete(car.id)}
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
