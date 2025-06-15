import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import ImageUpload from '../../components/Car/ImageUpload';
import { toast } from 'react-toastify';
import './CarForm.css';

// Validation schema for the car form
const carValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  engine: Yup.string().required('Engine is required'),
  power: Yup.number().required('Power is required').positive('Power must be positive'),
  acceleration: Yup.number().required('Acceleration is required').positive('Acceleration must be positive'),
  maxSpeed: Yup.number().required('Max speed is required').positive('Max speed must be positive'),
  fuelType: Yup.string().required('Fuel type is required'),
  transmission: Yup.string().required('Transmission is required'),
  drivetrain: Yup.string().required('Drivetrain is required'),
  type: Yup.string().required('Type is required'),
  grossPrice: Yup.number().required('Price is required').positive('Price must be positive'),
});

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(isEditMode);

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      brand: '',
      model: '',
      engine: '',
      power: '',
      acceleration: '',
      maxSpeed: '',
      fuelType: '',
      transmission: '',
      drivetrain: '',
      type: '',
      grossPrice: '',
      images: [''],
      description: {
        title: '',
        mainText: '',
        performance: '',
        accelerationDetails: '',
        interior: '',
        craftsmanship: '',
        conclusion: ''
      },
      pricing: {
        daily: '',
        twoDays: '',
        threeDays: '',
        weekly: '',
        monthly: ''
      },
      mileageInfo: {
        dailyLimit: '',
        excessFee: '',
        includedKm: ''
      }
    },
    validationSchema: carValidationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitLoading(true);
        setError(null);

        // Convert string values to numbers for specific fields
        const formattedValues = {
          ...values,
          power: Number(values.power),
          acceleration: Number(values.acceleration),
          maxSpeed: Number(values.maxSpeed),
          grossPrice: Number(values.grossPrice),
          pricing: {
            daily: Number(values.pricing.daily) || Number(values.grossPrice),
            twoDays: Number(values.pricing.twoDays),
            threeDays: Number(values.pricing.threeDays),
            weekly: Number(values.pricing.weekly),
            monthly: Number(values.pricing.monthly)
          },
          mileageInfo: {
            ...values.mileageInfo,
            dailyLimit: Number(values.mileageInfo.dailyLimit),
            excessFee: Number(values.mileageInfo.excessFee)
          }
        };

        // Remove empty image fields
        formattedValues.images = formattedValues.images.filter(img => img.trim() !== '');
        
        // Add default image if no images are provided
        if (formattedValues.images.length === 0) {
          formattedValues.images = ['car-placeholder'];
        }

        if (isEditMode) {
          await CarService.updateCar(id, formattedValues);
          toast.success('Car updated successfully!');
        } else {
          // Generate ID if not provided
          if (!formattedValues.id || formattedValues.id.trim() === '') {
            formattedValues.id = `${formattedValues.brand.toLowerCase()}-${formattedValues.model.toLowerCase()}-${Date.now().toString().slice(-4)}`;
          }
          
          await CarService.createCar(formattedValues);
          toast.success('Car added successfully!');
        }

        navigate('/cars');
      } catch (error) {
        console.error('Error saving car:', error);
        setError(error.response?.data?.message || 'An error occurred while saving. Please try again.');
        setSubmitLoading(false);
      }
    },
  });

  // Fetch car data for editing
  useEffect(() => {
    const fetchCarData = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          setError(null);
          
          const carData = await CarService.getCarById(id);
          
          // Populate form with car data
          formik.setValues({
            ...carData,
            // Ensure all necessary objects exist
            description: carData.description || {
              title: '',
              mainText: '',
              performance: '',
              accelerationDetails: '',
              interior: '',
              craftsmanship: '',
              conclusion: ''
            },
            pricing: carData.pricing || {
              daily: '',
              twoDays: '',
              threeDays: '',
              weekly: '',
              monthly: ''
            },
            mileageInfo: carData.mileageInfo || {
              dailyLimit: '',
              excessFee: '',
              includedKm: ''
            },
            // Ensure images is always an array
            images: Array.isArray(carData.images) ? carData.images : ['']
          });
          
          // Fetch car images
          setLoadingImages(true);
          try {
            const carImages = await FileService.getCarImages(id);
            setCarImages(carImages);
          } catch (imgError) {
            console.error('Error fetching car images:', imgError);
            // Don't block the form if images fail to load
          } finally {
            setLoadingImages(false);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching car data:', error);
          setError('Failed to fetch car data. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchCarData();
  }, [id, isEditMode]);

  // Handler for updating images
  const handleImagesUpdate = (updatedImages) => {
    setCarImages(updatedImages);
    
    // Set the main image URL as the first image in the form if it exists
    const mainImage = updatedImages.find(img => img.isMain);
    if (mainImage) {
      const imageUrls = updatedImages.map(img => img.url);
      formik.setFieldValue('images', imageUrls);
    }
  };

  // Add a new image field
  const handleAddImage = () => {
    formik.setFieldValue('images', [...formik.values.images, '']);
  };

  // Remove an image field
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="car-form-loading-container">
        <div className="car-form-loading-spinner" />
      </div>
    );
  }

  return (
    <div className="car-form-container">
      <div className="car-form-header">
        <div className="car-form-header-content">
          <div>
            <h1 className="car-form-title">{isEditMode ? 'Edit Car' : 'Add New Car'}</h1>
            <div className="car-form-subtitle">
              {isEditMode ? 'Update car information in the system' : 'Enter all details for the new vehicle'}
            </div>
          </div>
          <button type="button" className="car-form-back-button" onClick={() => navigate('/cars')}>
            Back
          </button>
        </div>
      </div>
      {error && <div className="car-form-error-alert">{error}</div>}
      <div className="car-form-main-paper">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          {/* Basic Info */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Basic Information</h2>
            <div className="car-form-field-group">
              {isEditMode && (
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formik.values.id}
                  disabled
                  className="car-form-text-field"
                  placeholder="ID (uneditable)"
                />
              )}
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="e.g. Lamborghini Huracán Performante"
                required
              />
              {formik.touched.title && formik.errors.title && <div className="car-form-error-alert">{formik.errors.title}</div>}
              <input
                type="text"
                id="brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="e.g. Lamborghini"
                required
              />
              {formik.touched.brand && formik.errors.brand && <div className="car-form-error-alert">{formik.errors.brand}</div>}
              <input
                type="text"
                id="model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="e.g. Huracán Performante"
                required
              />
              {formik.touched.model && formik.errors.model && <div className="car-form-error-alert">{formik.errors.model}</div>}
              <input
                type="text"
                id="engine"
                name="engine"
                value={formik.values.engine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="e.g. 5.2L V10 Naturally Aspirated"
                required
              />
              {formik.touched.engine && formik.errors.engine && <div className="car-form-error-alert">{formik.errors.engine}</div>}
            </div>
          </div>
          {/* Performance */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Performance</h2>
            <div className="car-form-field-group">
              <input
                type="number"
                id="power"
                name="power"
                value={formik.values.power}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="Power (HP)"
                min="0"
                required
              />
              {formik.touched.power && formik.errors.power && <div className="car-form-error-alert">{formik.errors.power}</div>}
              <input
                type="number"
                id="acceleration"
                name="acceleration"
                value={formik.values.acceleration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="0-100 km/h (s)"
                min="0"
                step="0.1"
                required
              />
              {formik.touched.acceleration && formik.errors.acceleration && <div className="car-form-error-alert">{formik.errors.acceleration}</div>}
              <input
                type="number"
                id="maxSpeed"
                name="maxSpeed"
                value={formik.values.maxSpeed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="V-max (km/h)"
                min="0"
                required
              />
              {formik.touched.maxSpeed && formik.errors.maxSpeed && <div className="car-form-error-alert">{formik.errors.maxSpeed}</div>}
            </div>
          </div>
          {/* Technical Specifications */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Technical Specifications</h2>
            <div className="car-form-field-group">
              <select
                id="fuelType"
                name="fuelType"
                value={formik.values.fuelType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                required
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
              </select>
              {formik.touched.fuelType && formik.errors.fuelType && <div className="car-form-error-alert">{formik.errors.fuelType}</div>}
              <select
                id="transmission"
                name="transmission"
                value={formik.values.transmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                required
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
                <option value="CVT">CVT</option>
                <option value="Dual-Clutch">Dual-Clutch</option>
              </select>
              {formik.touched.transmission && formik.errors.transmission && <div className="car-form-error-alert">{formik.errors.transmission}</div>}
              <select
                id="drivetrain"
                name="drivetrain"
                value={formik.values.drivetrain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                required
              >
                <option value="">Select drivetrain</option>
                <option value="FWD">FWD (front)</option>
                <option value="RWD">RWD (rear)</option>
                <option value="AWD">AWD (all wheels)</option>
                <option value="4WD">4WD (4x4)</option>
              </select>
              {formik.touched.drivetrain && formik.errors.drivetrain && <div className="car-form-error-alert">{formik.errors.drivetrain}</div>}
              <select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                required
              >
                <option value="">Select type</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Supercar">Supercar</option>
                <option value="Hypercar">Hypercar</option>
              </select>
              {formik.touched.type && formik.errors.type && <div className="car-form-error-alert">{formik.errors.type}</div>}
            </div>
          </div>
          {/* Price Section */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Base Price</h2>
            <div className="car-form-field-group">
              <input
                type="number"
                id="grossPrice"
                name="grossPrice"
                value={formik.values.grossPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="car-form-text-field"
                placeholder="Base price (PLN/day)"
                min="0"
                required
              />
              {formik.touched.grossPrice && formik.errors.grossPrice && <div className="car-form-error-alert">{formik.errors.grossPrice}</div>}
            </div>
          </div>
          {/* Images Section */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Images</h2>
            {isEditMode && (
              <div style={{ marginBottom: 24 }}>
                {loadingImages ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                    <div className="car-form-loading-spinner" style={{ width: 30, height: 30 }} />
                  </div>
                ) : (
                  <ImageUpload carId={id} initialImages={carImages} onImagesUpdate={handleImagesUpdate} />
                )}
                <div className="car-form-divider" style={{ margin: '24px 0' }} />
                <div style={{ color: '#a6a6a6', marginBottom: 8 }}>Alternative image links (optional):</div>
              </div>
            )}
            {!isEditMode && (
              <div className="car-form-image-section">
                <div>🖼️</div>
                <div>Image Management</div>
                <div>You can add images after creating the car in the system</div>
              </div>
            )}
            {formik.values.images.map((image, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <input
                  type="text"
                  value={image}
                  onChange={e => {
                    const updatedImages = [...formik.values.images];
                    updatedImages[index] = e.target.value;
                    formik.setFieldValue('images', updatedImages);
                  }}
                  placeholder={`Image ${index + 1}`}
                  className="car-form-text-field"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  disabled={formik.values.images.length <= 1}
                  className="car-form-delete-image-button"
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="car-form-add-image-button"
              style={{ marginTop: 8 }}
            >
              Add image
            </button>
          </div>
          {/* Description Section */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Detailed Description</h2>
            <div className="car-form-field-group">
              <input
                type="text"
                id="description.title"
                name="description.title"
                value={formik.values.description.title}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="e.g. The fastest road Lamborghini"
              />
              <textarea
                id="description.mainText"
                name="description.mainText"
                value={formik.values.description.mainText}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Enter the main car description..."
                rows={4}
              />
              <textarea
                id="description.performance"
                name="description.performance"
                value={formik.values.description.performance}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Performance description..."
                rows={3}
              />
              <textarea
                id="description.accelerationDetails"
                name="description.accelerationDetails"
                value={formik.values.description.accelerationDetails}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Acceleration details..."
                rows={3}
              />
              <textarea
                id="description.interior"
                name="description.interior"
                value={formik.values.description.interior}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Interior description..."
                rows={3}
              />
              <textarea
                id="description.craftsmanship"
                name="description.craftsmanship"
                value={formik.values.description.craftsmanship}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Craftsmanship description..."
                rows={3}
              />
              <textarea
                id="description.conclusion"
                name="description.conclusion"
                value={formik.values.description.conclusion}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Summary and conclusions..."
                rows={3}
              />
            </div>
          </div>
          {/* Pricing Section */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Pricing & Rental Options</h2>
            <div className="car-form-field-group">
              <div style={{ color: '#a6a6a6', marginBottom: 8 }}>
                Set different prices for different rental periods. If left blank, the base price will be used.
              </div>
              <input
                type="number"
                id="pricing.daily"
                name="pricing.daily"
                value={formik.values.pricing.daily}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Price per day (PLN)"
                min="0"
              />
              <input
                type="number"
                id="pricing.twoDays"
                name="pricing.twoDays"
                value={formik.values.pricing.twoDays}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Price for 2 days (PLN)"
                min="0"
              />
              <input
                type="number"
                id="pricing.threeDays"
                name="pricing.threeDays"
                value={formik.values.pricing.threeDays}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Price for 3 days (PLN)"
                min="0"
              />
              <input
                type="number"
                id="pricing.weekly"
                name="pricing.weekly"
                value={formik.values.pricing.weekly}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Weekly price (PLN)"
                min="0"
              />
              <input
                type="number"
                id="pricing.monthly"
                name="pricing.monthly"
                value={formik.values.pricing.monthly}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Monthly price (PLN)"
                min="0"
              />
            </div>
          </div>
          {/* Mileage Info Section */}
          <div className="car-form-section">
            <h2 className="car-form-section-title">Mileage Information</h2>
            <div className="car-form-field-group">
              <div style={{ color: '#a6a6a6', marginBottom: 8 }}>
                Specify mileage limits and excess fees.
              </div>
              <input
                type="number"
                id="mileageInfo.dailyLimit"
                name="mileageInfo.dailyLimit"
                value={formik.values.mileageInfo.dailyLimit}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="e.g. 200"
                min="0"
              />
              <input
                type="number"
                id="mileageInfo.excessFee"
                name="mileageInfo.excessFee"
                value={formik.values.mileageInfo.excessFee}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="Excess fee (PLN/km)"
                min="0"
                step="0.1"
              />
              <input
                type="text"
                id="mileageInfo.includedKm"
                name="mileageInfo.includedKm"
                value={formik.values.mileageInfo.includedKm}
                onChange={formik.handleChange}
                className="car-form-text-field"
                placeholder="e.g. Unlimited for weekly rentals"
              />
            </div>
          </div>
          {/* Submit Section */}
          <div className="car-form-submit-section">
            <button
              type="button"
              className="car-form-cancel-button"
              onClick={() => navigate('/cars')}
              disabled={submitLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="car-form-submit-button"
              disabled={submitLoading}
            >
              {submitLoading ? 'Saving...' : isEditMode ? 'Save changes' : 'Add car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
