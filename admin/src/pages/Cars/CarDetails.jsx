import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import { toast } from 'react-toastify';
import './carDetails.css';
import './addImageDialog.css';
import { IoIosClose } from "react-icons/io";
import { FiArrowLeft, FiCamera, FiX, FiSettings, FiDollarSign, FiAlertTriangle } from 'react-icons/fi';
import { FaCar, FaTachometerAlt } from 'react-icons/fa';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [deleteImageDialogOpen, setDeleteImageDialogOpen] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);
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
  
  // Czyszczenie klasy no-scroll przy odmontowywaniu komponentu
  useEffect(() => {
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  // Open delete confirmation dialog
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
    document.body.classList.add('no-scroll');
  };
  
  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    document.body.classList.remove('no-scroll');
  };
  
  // Handle actual delete after confirmation
  const handleDelete = async () => {
    try {
      await CarService.deleteCar(id);
      toast.success(`Samochód "${car.title}" został usunięty`);
      closeDeleteDialog();
      navigate('/cars');
    } catch (error) {
      console.error('Błąd podczas usuwania samochodu:', error);
      toast.error('Nie udało się usunąć samochodu. Spróbuj ponownie.');
      closeDeleteDialog();
    }
  };
  
  // Open edit confirmation dialog
  const openEditDialog = () => {
    setEditDialogOpen(true);
    document.body.classList.add('no-scroll');
  };
  
  // Close edit confirmation dialog
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    document.body.classList.remove('no-scroll');
  };
  
  // Handle actual edit after confirmation
  const handleEdit = () => {
    closeEditDialog();
    navigate(`/cars/edit/${id}`);
  };// Function to get all car images
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
  };  // Function to add new image
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const updatedImages = [...(car.images || []), newImageUrl.trim()];
      setCar({...car, images: updatedImages});
      setNewImageUrl('');
      setIsPreviewLoaded(false);
      setIsPreviewError(false);
      setAddImageDialogOpen(false);
      document.body.classList.remove('no-scroll');
      toast.success('Zdjęcie zostało dodane');
    }
  };
  
  // Function to handle image URL changes and preview
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setNewImageUrl(url);
    
    // Reset preview states when input changes
    setIsPreviewLoaded(false);
    setIsPreviewError(false);
    
    // Only attempt to preview if URL is non-empty and looks like a valid URL
    if (url.trim() && (url.startsWith('http://') || url.startsWith('https://'))) {
      // We'll handle the actual preview in the image onLoad/onError handlers
    }
  };
  
  // Handle keyboard events in the dialog
  const handleDialogKeyDown = (e) => {
    if (e.key === 'Enter' && newImageUrl.trim() && !isPreviewError) {
      handleAddImage();
    } else if (e.key === 'Escape') {
      closeAddImageDialog();
    }
  };
  
  // Funkcja do otwierania dialogu dodawania zdjęć
  const openAddImageDialog = () => {
    setAddImageDialogOpen(true);
    document.body.classList.add('no-scroll');
  };
  
  // Funkcja do zamykania dialogu dodawania zdjęć
  const closeAddImageDialog = () => {
    setAddImageDialogOpen(false);
    document.body.classList.remove('no-scroll');
  };
  // Function to open the delete image confirmation dialog
  const confirmDeleteImage = (indexToDelete) => {
    setImageToDeleteIndex(indexToDelete);
    setDeleteImageDialogOpen(true);
    // Blokuj przewijanie strony
    document.body.classList.add('no-scroll');
  };
  
  // Function to cancel deletion and close the dialog
  const cancelDeleteImage = () => {
    setDeleteImageDialogOpen(false);
    setImageToDeleteIndex(null);
    // Odblokuj przewijanie strony
    document.body.classList.remove('no-scroll');
  };
  
  // Function to remove image after confirmation
  const handleRemoveImage = () => {
    if (imageToDeleteIndex === null) return;
    
    const updatedImages = car.images.filter((_, index) => index !== imageToDeleteIndex);
    setCar({...car, images: updatedImages});
    
    // Adjust selected index if necessary
    if (selectedImageIndex >= updatedImages.length) {
      setSelectedImageIndex(Math.max(0, updatedImages.length - 1));
    }
    
    // Close dialog and reset
    setDeleteImageDialogOpen(false);
    setImageToDeleteIndex(null);
    // Odblokuj przewijanie strony
    document.body.classList.remove('no-scroll');
    toast.success('Zdjęcie zostało usunięte');
  };if (loading) {
    return (
      <div className="car-details-loading">
        <div className="car-details-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (      <div className="car-details-container">
        <div className="car-details-error">{error}</div>
        <button onClick={() => navigate('/cars')} className="car-details-btn-back">
          <FiArrowLeft className="car-details-btn-icon" />
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
        </div>        <button onClick={() => navigate('/cars')} className="car-details-btn-back">
          <FiArrowLeft className="car-details-btn-icon" />
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
          </div>          <div className="car-details-actions">            <button className="car-details-btn-back" onClick={() => navigate('/cars')}>
              <FiArrowLeft className="car-details-btn-icon" /> Back
            </button>
            <button className="car-details-btn-edit" onClick={openEditDialog}>
              Edit
            </button>
            <button className="car-details-btn-delete" onClick={openDeleteDialog}>
              Delete
            </button>
          </div>
        </div>
      </div>
      
      {/* Gallery - Full width */}
      <div className="car-details-gallery-card car-details-hover-effect">
        <div className="car-details-gallery-header">
          <span className="car-details-gallery-title"><FiCamera /> Image Gallery</span>          <button className="car-details-gallery-add-btn" onClick={openAddImageDialog}>
            + Add
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
                      confirmDeleteImage(index);
                    }}
                    aria-label="Remove image"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description - Full width */}
      <div className="car-details-description-card car-details-hover-effect">
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

      {/* Information section - grid with 2 columns */}
      <div className="car-details-info-grid">
        {/* Basic Info */}
        <div className="car-details-info-card car-details-hover-effect">
          <div className="car-details-section-title">
            <span className="car-details-section-icon"><FaCar /></span> Basic Information
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
        <div className="car-details-info-card car-details-hover-effect">
          <div className="car-details-section-title">
            <span className="car-details-section-icon"><FiSettings /></span> Specification
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

      {/* Pricing and Mileage - grid with 2 columns */}
      <div className="car-details-info-grid">
        {/* Pricing */}
        <div className="car-details-pricing-card car-details-hover-effect">
          <div className="car-details-section-title">
            <span className="car-details-section-icon"><FiDollarSign /></span> Pricing
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
        <div className="car-details-pricing-card car-details-hover-effect">
          <div className="car-details-section-title">
            <span className="car-details-section-icon"><FaTachometerAlt /></span> Mileage limits
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
      </div>      {/* Add Image Dialog */}
      {addImageDialogOpen && (
        <div className="car-details-delete-image-dialog">
          <div className='car-details-delete-image-dialog-ele'>
            
            <div className="car-details-delete-image-dialog-ele-top">
              <div className="car-details-delete-image-dialog-ele-top-info">
                <IoIosClose className='car-details-delete-image-dialog-ele-top-info-icon' onClick={closeAddImageDialog} />
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-middle">
              <div className="car-details-delete-image-dialog-ele-middle-ele">
                <div className="car-details-delete-image-dialog-ele-middle-ele-text">
                  Add new image
                </div>
                
                <div className="car-details-add-image-input-container">
                  <input
                    id="image-url-input"
                    autoFocus
                    type="url"
                    value={newImageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="car-details-add-image-input"
                    onKeyDown={handleDialogKeyDown}
                  />
                  
                  {newImageUrl.trim() && (
                    <div className="car-details-add-image-preview-container">
                      <div className={`car-details-add-image-preview ${isPreviewLoaded ? 'loaded' : ''} ${isPreviewError ? 'error' : ''}`}>
                        {!isPreviewLoaded && !isPreviewError && (
                          <div className="preview-loading">Loading preview...</div>
                        )}
                        {isPreviewError && (
                          <div className="preview-error">
                            <span className="preview-error-icon"><FiAlertTriangle /></span>
                            <span>Unable to load image from URL</span>
                          </div>
                        )}
                        <img 
                          src={newImageUrl} 
                          alt="Preview" 
                          className={isPreviewLoaded ? 'visible' : 'hidden'}
                          onLoad={() => setIsPreviewLoaded(true)}
                          onError={() => {
                            setIsPreviewLoaded(false);
                            setIsPreviewError(true);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-bottom">
              <div className="car-details-delete-image-dialog-ele-bottom-ele">
                <div className="car-details-delete-image-dialog-ele-bottom-confirm-one" onClick={closeAddImageDialog}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-one-text">
                    Cancel
                  </p>
                </div>

                <div 
                  className={`car-details-delete-image-dialog-ele-bottom-confirm-two ${(!newImageUrl.trim() || isPreviewError) ? 'disabled' : ''}`} 
                  onClick={newImageUrl.trim() && !isPreviewError ? handleAddImage : null}
                >
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-two-text">
                    Add Image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Image Confirmation Dialog */}
      {deleteImageDialogOpen && imageToDeleteIndex !== null && (
        <div className="car-details-delete-image-dialog" >
          <div className='car-details-delete-image-dialog-ele'>
            
            <div className="car-details-delete-image-dialog-ele-top">
              <div className="car-details-delete-image-dialog-ele-top-info">                <IoIosClose className='car-details-delete-image-dialog-ele-top-info-icon' onClick={cancelDeleteImage} />
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-middle">
              <div className="car-details-delete-image-dialog-ele-middle-ele">
                <div className="car-details-delete-image-dialog-ele-middle-ele-text">
                  Are you sure you want to delete this image?
                </div>
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-bottom">
              <div className="car-details-delete-image-dialog-ele-bottom-ele">
                <div className="car-details-delete-image-dialog-ele-bottom-confirm-one" onClick={cancelDeleteImage}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-one-text">
                    Cancel
                  </p>
                </div>

                <div className="car-details-delete-image-dialog-ele-bottom-confirm-two" onClick={handleRemoveImage}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-two-text">
                    Delete image
                  </p>
                </div>
              </div>
            </div>



            {/* <div className="car-details-dialog-title" style={{ marginBottom: 16 }}>
              <span style={{ marginRight: 8 }}><FiX /></span> Confirm Delete Image
            </div>
            <div className="car-details-dialog-content" style={{ marginBottom: 24 }}>
              Are you sure you want to delete this image?
            </div>
            <div className="car-details-dialog-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setDeleteImageDialogOpen(false)} className="car-details-dialog-cancel">Cancel</button>
              <button onClick={handleRemoveImage} className="car-details-dialog-delete">
                Delete image
              </button>
            </div> */}



          </div>
        </div>
      )}

      {/* Car Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="car-details-delete-image-dialog">
          <div className='car-details-delete-image-dialog-ele'>
            
            <div className="car-details-delete-image-dialog-ele-top">
              <div className="car-details-delete-image-dialog-ele-top-info">
                <IoIosClose className='car-details-delete-image-dialog-ele-top-info-icon' onClick={closeDeleteDialog} />
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-middle">
              <div className="car-details-delete-image-dialog-ele-middle-ele">
                <div className="car-details-delete-image-dialog-ele-middle-ele-text">
                  Are you sure you want to delete this car?
                </div>
                <div className="car-details-delete-image-dialog-ele-middle-ele-subtext">
                  This action cannot be undone.
                </div>
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-bottom">
              <div className="car-details-delete-image-dialog-ele-bottom-ele">
                <div className="car-details-delete-image-dialog-ele-bottom-confirm-one" onClick={closeDeleteDialog}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-one-text">
                    Cancel
                  </p>
                </div>

                <div className="car-details-delete-image-dialog-ele-bottom-confirm-two" onClick={handleDelete}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-two-text">
                    Delete car
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Edit Confirmation Dialog */}
      {editDialogOpen && (
        <div className="car-details-delete-image-dialog">
          <div className='car-details-delete-image-dialog-ele'>
            
            <div className="car-details-delete-image-dialog-ele-top">
              <div className="car-details-delete-image-dialog-ele-top-info">
                <IoIosClose className='car-details-delete-image-dialog-ele-top-info-icon' onClick={closeEditDialog} />
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-middle">
              <div className="car-details-delete-image-dialog-ele-middle-ele">
                <div className="car-details-delete-image-dialog-ele-middle-ele-text">
                  Do you want to edit this car?
                </div>
                <div className="car-details-delete-image-dialog-ele-middle-ele-subtext">
                  You will be redirected to the edit page.
                </div>
              </div>
            </div>

            <div className="car-details-delete-image-dialog-ele-bottom">
              <div className="car-details-delete-image-dialog-ele-bottom-ele">
                <div className="car-details-delete-image-dialog-ele-bottom-confirm-one" onClick={closeEditDialog}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-one-text">
                    Cancel
                  </p>
                </div>

                <div className="car-details-delete-image-dialog-ele-bottom-confirm-two" onClick={handleEdit}>
                  <p className="car-details-delete-image-dialog-ele-bottom-confirm-two-text">
                    Edit car
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
