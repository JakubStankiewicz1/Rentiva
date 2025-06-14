import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import { toast } from 'react-toastify';
import './carDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const carData = await CarService.getCarById(id);
        setCar(carData);
        setLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów samochodu:', error);
        setError('Nie udało się pobrać szczegółów samochodu. Spróbuj ponownie później.');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await CarService.deleteCar(id);
      toast.success(`Samochód "${car.title}" został usunięty`);
      navigate('/cars');
    } catch (error) {
      console.error('Błąd podczas usuwania samochodu:', error);
      toast.error('Nie udało się usunąć samochodu. Spróbuj ponownie.');
    }
  };  // Function to get all car images
  const getCarImages = () => {
    if (car?.images && car.images.length > 0) {
      return car.images.map(image => {
        if (image.startsWith('http://') || image.startsWith('https://')) {
          return image;
        }
        return `/images/${image}.jpg`;
      });
    }
    return ['/images/car-placeholder.jpg'];
  };

  // Function to get the currently selected image
  const getCurrentImage = () => {
    const images = getCarImages();
    return images[selectedImageIndex] || images[0];
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Function to add new image
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const updatedImages = [...(car.images || []), newImageUrl.trim()];
      setCar({...car, images: updatedImages});
      setNewImageUrl('');
      setAddImageDialogOpen(false);
      toast.success('Zdjęcie zostało dodane');
    }
  };

  // Function to remove image
  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = car.images.filter((_, index) => index !== indexToRemove);
    setCar({...car, images: updatedImages});
    
    // Adjust selected index if necessary
    if (selectedImageIndex >= updatedImages.length) {
      setSelectedImageIndex(Math.max(0, updatedImages.length - 1));
    }
    
    toast.success('Zdjęcie zostało usunięte');
  };  if (loading) {
    return (
      <div className="car-details-loading">
        <div className="car-details-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-details-container">
        <div className="car-details-error">{error}</div>
        <button onClick={() => navigate('/cars')} className="car-details-btn-back">
          <span className="car-details-btn-icon">←</span>
          Back to car list
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="car-details-container">
        <div className="car-details-warning">
          Car with ID: {id} not found
        </div>
        <button onClick={() => navigate('/cars')} className="car-details-btn-back">
          <span className="car-details-btn-icon">←</span>
          Back to car list
        </button>
      </div>
    );
  }

  return (
    <div className="car-details-container car-details-fade-in">
      <div className="car-details-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="car-details-title">
              {car.title}
            </h1>
            <div className="car-details-chips">
              <span className="car-details-chip-brand">{car.brand}</span>
              <span className="car-details-chip-type">{car.type}</span>
            </div>
          </div>
          <div className="car-details-actions">
            <button className="car-details-btn-back" onClick={() => navigate('/cars')}>
              <span className="car-details-btn-icon">←</span> Back
            </button>
            <button className="car-details-btn-edit" onClick={() => navigate(`/cars/edit/${id}`)}>
              ✏️ Edit
            </button>
            <button className="car-details-btn-delete" onClick={handleDelete}>
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {/* Left column: Gallery and Info */}
        <div style={{ flex: '1 1 350px', minWidth: 0, maxWidth: 500 }}>
          {/* Gallery */}
          <div className="car-details-gallery-card car-details-hover-effect" style={{ marginBottom: 24 }}>
            <div className="car-details-gallery-header">
              <span className="car-details-gallery-title">📷 Image Gallery</span>
              <button className="car-details-gallery-add-btn" onClick={() => setAddImageDialogOpen(true)}>
                ➕ Add
              </button>
            </div>
            <div className="car-details-gallery-main">
              <div className="car-details-gallery-main-card">
                <img
                  src={getCurrentImage()}
                  alt={`${car.title} - Image ${selectedImageIndex + 1}`}
                  className="car-details-gallery-main-image"
                />
                {car.images && car.images.length > 1 && (
                  <div className="car-details-gallery-counter">
                    {selectedImageIndex + 1} / {car.images.length}
                  </div>
                )}
              </div>
            </div>
            {car.images && car.images.length > 1 && (
              <div className="car-details-gallery-thumbnails">
                {getCarImages().map((image, index) => (
                  <div
                    key={index}
                    className={`car-details-gallery-thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="car-details-gallery-thumbnail-image"
                    />
                    {car.images.length > 1 && (
                      <button
                        type="button"
                        className="car-details-gallery-remove-btn"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        aria-label="Remove image"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="car-details-info-card car-details-hover-effect" style={{ marginBottom: 24, padding: 24 }}>
            <div className="car-details-section-title">
              <span className="car-details-section-icon">🚗</span> Basic Information
            </div>
            <div className="car-details-divider" />
            <table className="car-details-table">
              <tbody>
                <tr>
                  <th className="car-details-table-cell-label">ID</th>
                  <td className="car-details-table-cell">{car.id}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Brand</th>
                  <td className="car-details-table-cell">{car.brand}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Model</th>
                  <td className="car-details-table-cell">{car.model}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Type</th>
                  <td className="car-details-table-cell">{car.type}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Price (per day)</th>
                  <td className="car-details-table-cell">
                    <span className="car-details-price">{car.grossPrice} PLN</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Specification */}
          <div className="car-details-info-card car-details-hover-effect" style={{ padding: 24 }}>
            <div className="car-details-section-title">
              <span className="car-details-section-icon">⚙️</span> Specification
            </div>
            <div className="car-details-divider" />
            <table className="car-details-table">
              <tbody>
                <tr>
                  <th className="car-details-table-cell-label">Engine</th>
                  <td className="car-details-table-cell">{car.engine}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Power</th>
                  <td className="car-details-table-cell">{car.power} HP</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">0-100 km/h</th>
                  <td className="car-details-table-cell">{car.acceleration} s</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Max speed</th>
                  <td className="car-details-table-cell">{car.maxSpeed} km/h</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Fuel</th>
                  <td className="car-details-table-cell">{car.fuelType}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Transmission</th>
                  <td className="car-details-table-cell">{car.transmission}</td>
                </tr>
                <tr>
                  <th className="car-details-table-cell-label">Drivetrain</th>
                  <td className="car-details-table-cell">{car.drivetrain}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Right column: Description, Pricing, Mileage */}
        <div style={{ flex: '2 1 500px', minWidth: 0 }}>
          <div className="car-details-description-card car-details-hover-effect" style={{ marginBottom: 24 }}>
            <div className="car-details-description-title">
              Description
            </div>
            <div className="car-details-divider" />
            
            {car.description ? (
              <div>
                {car.description.title && (
                  <div className="car-details-description-label" style={{ marginBottom: 8 }}>{car.description.title}</div>
                )}
                {car.description.mainText && (
                  <div className="car-details-description-text">{car.description.mainText}</div>
                )}
                {car.description.performance && (
                  <div className="car-details-description-text">
                    <span className="car-details-description-label">Performance: </span>{car.description.performance}
                  </div>
                )}
                {car.description.accelerationDetails && (
                  <div className="car-details-description-text">
                    <span className="car-details-description-label">Acceleration details: </span>{car.description.accelerationDetails}
                  </div>
                )}
                {car.description.interior && (
                  <div className="car-details-description-text">
                    <span className="car-details-description-label">Interior: </span>{car.description.interior}
                  </div>
                )}
                {car.description.craftsmanship && (
                  <div className="car-details-description-text">
                    <span className="car-details-description-label">Craftsmanship: </span>{car.description.craftsmanship}
                  </div>
                )}
                {car.description.conclusion && (
                  <div className="car-details-description-text">
                    <span className="car-details-description-label">Summary: </span>{car.description.conclusion}
                  </div>
                )}
              </div>
            ) : (
              <div className="car-details-no-data">
                No description for this car.
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {/* Pricing */}
            <div className="car-details-pricing-card car-details-hover-effect" style={{ flex: '1 1 250px', padding: 24 }}>
              <div className="car-details-section-title">
                <span className="car-details-section-icon">🏁</span> Pricing
              </div>
              <div className="car-details-divider" />
              
              {car.pricing ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li className="car-details-list-item">
                    <span className="car-details-list-primary">1 day</span>
                    <span className="car-details-list-secondary">{car.pricing.daily || car.grossPrice} PLN</span>
                  </li>
                  {car.pricing.twoDays && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">2 days</span>
                      <span className="car-details-list-secondary">{car.pricing.twoDays} PLN</span>
                    </li>
                  )}
                  {car.pricing.threeDays && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">3 days</span>
                      <span className="car-details-list-secondary">{car.pricing.threeDays} PLN</span>
                    </li>
                  )}
                  {car.pricing.weekly && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">Week</span>
                      <span className="car-details-list-secondary">{car.pricing.weekly} PLN</span>
                    </li>
                  )}
                  {car.pricing.monthly && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">Month</span>
                      <span className="car-details-list-secondary">{car.pricing.monthly} PLN</span>
                    </li>
                  )}
                </ul>
              ) : (
                <div className="car-details-no-data">
                  No pricing data.
                </div>
              )}
            </div>
            
            {/* Mileage */}
            <div className="car-details-pricing-card car-details-hover-effect" style={{ flex: '1 1 250px', padding: 24 }}>
              <div className="car-details-section-title">
                <span className="car-details-section-icon">🛠️</span> Mileage limits
              </div>
              <div className="car-details-divider" />
              
              {car.mileageInfo ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {car.mileageInfo.dailyLimit && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">Daily limit</span>
                      <span className="car-details-list-secondary">{car.mileageInfo.dailyLimit} km</span>
                    </li>
                  )}
                  {car.mileageInfo.excessFee && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">Excess fee</span>
                      <span className="car-details-list-secondary">{car.mileageInfo.excessFee} PLN/km</span>
                    </li>
                  )}
                  {car.mileageInfo.includedKm && (
                    <li className="car-details-list-item">
                      <span className="car-details-list-primary">Additional info</span>
                      <span className="car-details-list-secondary">{car.mileageInfo.includedKm}</span>
                    </li>
                  )}
                </ul>
              ) : (
                <div className="car-details-no-data">
                  No mileage limit data.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Image Dialog */}
      {addImageDialogOpen && (
        <div className="car-details-add-image-dialog" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#181818', borderRadius: 16, minWidth: 320, maxWidth: 400, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', padding: 24, border: '1px solid #C3845E' }}>
            <div className="car-details-dialog-title" style={{ marginBottom: 16 }}>
              <span style={{ marginRight: 8 }}>📷</span> Add new image
            </div>
            <input
              autoFocus
              type="url"
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="car-details-dialog-input"
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #C3845E', marginBottom: 16, background: 'rgba(195,132,94,0.05)', color: '#fff' }}
            />
            <div className="car-details-dialog-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setAddImageDialogOpen(false)} className="car-details-dialog-cancel">Cancel</button>
              <button onClick={handleAddImage} className="car-details-dialog-add" disabled={!newImageUrl.trim()}>
                Add image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
