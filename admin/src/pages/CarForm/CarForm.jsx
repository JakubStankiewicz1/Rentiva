import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  MenuItem,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Fade,
  Zoom
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DirectionsCar as CarIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  AttachMoney as PriceIcon,
  Speed as SpeedIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import ImageUpload from '../../components/Car/ImageUpload';
import { toast } from 'react-toastify';
import './CarForm.css';

// Walidacja formularza
const carValidationSchema = Yup.object({
  title: Yup.string().required('Tytuł jest wymagany'),
  brand: Yup.string().required('Marka jest wymagana'),
  model: Yup.string().required('Model jest wymagany'),
  engine: Yup.string().required('Silnik jest wymagany'),
  power: Yup.number().required('Moc jest wymagana').positive('Moc musi być dodatnia'),
  acceleration: Yup.number().required('Przyspieszenie jest wymagane').positive('Przyspieszenie musi być dodatnie'),
  maxSpeed: Yup.number().required('Prędkość maksymalna jest wymagana').positive('Prędkość musi być dodatnia'),
  fuelType: Yup.string().required('Rodzaj paliwa jest wymagany'),
  transmission: Yup.string().required('Skrzynia biegów jest wymagana'),
  drivetrain: Yup.string().required('Napęd jest wymagany'),
  type: Yup.string().required('Typ jest wymagany'),
  grossPrice: Yup.number().required('Cena jest wymagana').positive('Cena musi być dodatnia'),
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

        // Konwersja wartości liczbowych
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

        // Usuń puste obrazy
        formattedValues.images = formattedValues.images.filter(img => img.trim() !== '');
        
        // Jeśli nie ma obrazów, dodaj domyślny
        if (formattedValues.images.length === 0) {
          formattedValues.images = ['car-placeholder'];
        }

        if (isEditMode) {
          await CarService.updateCar(id, formattedValues);
          toast.success('Samochód został zaktualizowany pomyślnie!');
        } else {
          // Generowanie ID, jeśli nie podano
          if (!formattedValues.id || formattedValues.id.trim() === '') {
            formattedValues.id = `${formattedValues.brand.toLowerCase()}-${formattedValues.model.toLowerCase()}-${Date.now().toString().slice(-4)}`;
          }
          
          await CarService.createCar(formattedValues);
          toast.success('Samochód został dodany pomyślnie!');
        }

        navigate('/cars');
      } catch (error) {
        console.error('Błąd podczas zapisywania samochodu:', error);
        setError(error.response?.data?.message || 'Wystąpił błąd podczas zapisywania. Spróbuj ponownie.');
        setSubmitLoading(false);
      }
    },
  });
  // Pobierz dane samochodu do edycji
  useEffect(() => {
    const fetchCarData = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          setError(null);
          
          const carData = await CarService.getCarById(id);
          
          // Wypełnij formularz danymi samochodu
          formik.setValues({
            ...carData,
            // Upewnij się, że wszystkie potrzebne obiekty istnieją
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
            // Zapewnij, że images to zawsze tablica
            images: Array.isArray(carData.images) ? carData.images : ['']
          });
          
          // Pobierz obrazy samochodu
          setLoadingImages(true);
          try {
            const carImages = await FileService.getCarImages(id);
            setCarImages(carImages);
          } catch (imgError) {
            console.error('Błąd podczas pobierania obrazów samochodu:', imgError);
            // Nie blokujemy całego formularza, jeśli obrazy nie zostały pobrane
          } finally {
            setLoadingImages(false);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Błąd podczas pobierania danych samochodu:', error);
          setError('Nie udało się pobrać danych samochodu. Spróbuj ponownie później.');
          setLoading(false);
        }
      }
    };

    fetchCarData();  }, [id, isEditMode]);

  // Handler dla aktualizacji obrazów
  const handleImagesUpdate = (updatedImages) => {
    setCarImages(updatedImages);
    
    // Jeśli jest główny obraz, ustawiamy jego URL jako pierwszy obraz w formularzu
    const mainImage = updatedImages.find(img => img.isMain);
    if (mainImage) {
      const imageUrls = updatedImages.map(img => img.url);
      formik.setFieldValue('images', imageUrls);
    }
  };

  // Dodaj nowe pole obrazu
  const handleAddImage = () => {
    formik.setFieldValue('images', [...formik.values.images, '']);
  };

  // Usuń pole obrazu
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };
  if (loading) {
    return (
      <div className="car-form-loading-container">
        <Fade in={loading}>
          <CircularProgress size={60} className="car-form-loading-spinner" />
        </Fade>
      </div>
    );
  }

  return (
    <div className="car-form-container">
      <Fade in={true} timeout={600}>
        <div>
          {/* Header Section */}
          <Paper className="car-form-header" elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h3" component="h1" className="car-form-title">
                  {isEditMode ? 'Edytuj Samochód' : 'Dodaj Nowy Samochód'}
                </Typography>
                <Typography variant="subtitle1" className="car-form-subtitle">
                  {isEditMode 
                    ? 'Zaktualizuj informacje o samochodzie w systemie' 
                    : 'Wprowadź wszystkie szczegóły nowego pojazdu'
                  }
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/cars')}
                className="car-form-back-button"
              >
                Powrót
              </Button>
            </Box>
          </Paper>

          {/* Error Alert */}
          {error && (
            <Zoom in={!!error}>
              <Alert severity="error" className="car-form-error-alert">
                {error}
              </Alert>
            </Zoom>
          )}

          {/* Main Form */}
          <Paper className="car-form-main-paper" elevation={0}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4} className="car-form-grid-container">
                
                {/* Basic Information Section */}                <Grid item xs={12}>
                  <div className="car-form-section">
                    <Typography variant="h5" component="h2" className="car-form-section-title">
                      <CarIcon className="car-form-section-icon" />
                      Podstawowe informacje
                    </Typography>
                    
                    <div className="car-form-field-group">
                      <div className="car-form-basic-info">
                        {isEditMode && (
                          <TextField
                            fullWidth
                            id="id"
                            name="id"
                            label="ID (niemodyfikowalne)"
                            value={formik.values.id}
                            disabled
                            className="car-form-text-field"
                          />
                        )}

                        <TextField
                          fullWidth
                          id="title"
                          name="title"
                          label="Tytuł *"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.title && Boolean(formik.errors.title)}
                          helperText={formik.touched.title && formik.errors.title}
                          required
                          className="car-form-text-field"
                          placeholder="np. Lamborghini Huracán Performante"
                        />

                        <TextField
                          fullWidth
                          id="brand"
                          name="brand"
                          label="Marka *"
                          value={formik.values.brand}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.brand && Boolean(formik.errors.brand)}
                          helperText={formik.touched.brand && formik.errors.brand}
                          required
                          className="car-form-text-field"
                          placeholder="np. Lamborghini"
                        />

                        <TextField
                          fullWidth
                          id="model"
                          name="model"
                          label="Model *"
                          value={formik.values.model}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.model && Boolean(formik.errors.model)}
                          helperText={formik.touched.model && formik.errors.model}
                          required
                          className="car-form-text-field"
                          placeholder="np. Huracán Performante"
                        />

                        <TextField
                          fullWidth
                          id="engine"
                          name="engine"
                          label="Silnik *"
                          value={formik.values.engine}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.engine && Boolean(formik.errors.engine)}
                          helperText={formik.touched.engine && formik.errors.engine}
                          required
                          className="car-form-text-field"
                          placeholder="np. 5.2L V10 Naturally Aspirated"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>                {/* Performance Section */}
                <Grid item xs={12}>
                  <div className="car-form-section">
                    <div className="car-form-section-separator"></div>
                    <Typography variant="h5" component="h2" className="car-form-section-title">
                      <SpeedIcon className="car-form-section-icon" />
                      Osiągi
                    </Typography>
                    
                    <div className="car-form-field-group">
                      <div className="car-form-performance-specs">
                        <TextField
                          fullWidth
                          id="power"
                          name="power"
                          label="Moc (KM) *"
                          type="number"
                          value={formik.values.power}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.power && Boolean(formik.errors.power)}
                          helperText={formik.touched.power && formik.errors.power}
                          required
                          className="car-form-text-field"
                          inputProps={{ min: 0 }}
                        />

                        <TextField
                          fullWidth
                          id="acceleration"
                          name="acceleration"
                          label="0-100 km/h (s) *"
                          type="number"
                          value={formik.values.acceleration}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.acceleration && Boolean(formik.errors.acceleration)}
                          helperText={formik.touched.acceleration && formik.errors.acceleration}
                          required
                          className="car-form-text-field"
                          inputProps={{ min: 0, step: 0.1 }}
                        />

                        <TextField
                          fullWidth
                          id="maxSpeed"
                          name="maxSpeed"
                          label="V-max (km/h) *"
                          type="number"
                          value={formik.values.maxSpeed}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.maxSpeed && Boolean(formik.errors.maxSpeed)}
                          helperText={formik.touched.maxSpeed && formik.errors.maxSpeed}
                          required
                          className="car-form-text-field"
                          inputProps={{ min: 0 }}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>                {/* Technical Specifications */}
                <Grid item xs={12}>
                  <div className="car-form-section">
                    <div className="car-form-section-separator"></div>
                    <Typography variant="h5" component="h2" className="car-form-section-title">
                      <SettingsIcon className="car-form-section-icon" />
                      Specyfikacja techniczna
                    </Typography>
                    <div className="car-form-field-group">
                      <div className="car-form-fuel-transmission">
                        <TextField
                          fullWidth
                          id="fuelType"
                          name="fuelType"
                          label="Rodzaj paliwa *"
                          value={formik.values.fuelType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
                          helperText={formik.touched.fuelType && formik.errors.fuelType}
                          required
                          select
                          className="car-form-text-field"
                        >
                          <MenuItem value="Benzyna">Benzyna</MenuItem>
                          <MenuItem value="Diesel">Diesel</MenuItem>
                          <MenuItem value="Elektryczny">Elektryczny</MenuItem>
                          <MenuItem value="Hybryda">Hybryda</MenuItem>
                          <MenuItem value="Plug-in Hybrid">Plug-in Hybrid</MenuItem>
                        </TextField>

                        <TextField
                          fullWidth
                          id="transmission"
                          name="transmission"
                          label="Skrzynia biegów *"
                          value={formik.values.transmission}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.transmission && Boolean(formik.errors.transmission)}
                          helperText={formik.touched.transmission && formik.errors.transmission}
                          required
                          select
                          className="car-form-text-field"
                        >
                          <MenuItem value="Manual">Manualna</MenuItem>
                          <MenuItem value="Automatic">Automatyczna</MenuItem>
                          <MenuItem value="Semi-Automatic">Półautomatyczna</MenuItem>
                          <MenuItem value="CVT">CVT</MenuItem>
                          <MenuItem value="Dual-Clutch">Dual-Clutch</MenuItem>
                        </TextField>

                        <TextField
                          fullWidth
                          id="drivetrain"
                          name="drivetrain"
                          label="Napęd *"
                          value={formik.values.drivetrain}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.drivetrain && Boolean(formik.errors.drivetrain)}
                          helperText={formik.touched.drivetrain && formik.errors.drivetrain}
                          required
                          select
                          className="car-form-text-field"
                        >
                          <MenuItem value="FWD">FWD (przód)</MenuItem>
                          <MenuItem value="RWD">RWD (tył)</MenuItem>
                          <MenuItem value="AWD">AWD (wszystkie koła)</MenuItem>
                          <MenuItem value="4WD">4WD (4x4)</MenuItem>
                        </TextField>

                        <TextField
                          fullWidth
                          id="type"
                          name="type"
                          label="Typ *"
                          value={formik.values.type}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.type && Boolean(formik.errors.type)}
                          helperText={formik.touched.type && formik.errors.type}
                          required
                          select
                          className="car-form-text-field"
                        >
                          <MenuItem value="Sports">Sportowy</MenuItem>
                          <MenuItem value="Luxury">Luksusowy</MenuItem>
                          <MenuItem value="SUV">SUV</MenuItem>
                          <MenuItem value="Sedan">Sedan</MenuItem>
                          <MenuItem value="Coupe">Coupe</MenuItem>
                          <MenuItem value="Convertible">Kabriolet</MenuItem>
                          <MenuItem value="Supercar">Supercar</MenuItem>
                          <MenuItem value="Hypercar">Hypercar</MenuItem>
                        </TextField>
                      </div>
                    </div>
                  </div>
                </Grid>

                {/* Price Section na pełną szerokość */}
                <Grid item xs={12}>
                  <div className="car-form-section">
                    <div className="car-form-section-separator"></div>
                    <div className="car-form-field-group">
                      <Typography variant="h5" component="h2" className="car-form-section-title">
                        <PriceIcon className="car-form-section-icon" />
                        Cennik podstawowy
                      </Typography>
                      <TextField
                        fullWidth
                        id="grossPrice"
                        name="grossPrice"
                        label="Cena podstawowa (PLN/dzień) *"
                        type="number"
                        value={formik.values.grossPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.grossPrice && Boolean(formik.errors.grossPrice)}
                        helperText={formik.touched.grossPrice && formik.errors.grossPrice}
                        required
                        className="car-form-text-field"
                        inputProps={{ min: 0 }}
                      />
                    </div>
                  </div>
                </Grid>

                {/* Images Section na pełną szerokość */}
                <Grid item xs={12}>
                  <Accordion className="car-form-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="car-form-accordion-icon" />}
                      aria-controls="images-content"
                      id="images-header"
                      className="car-form-accordion-summary"
                    >
                      <Typography variant="h6" className="car-form-accordion-title">
                        <ImageIcon className="car-form-section-icon" />
                        Obrazy
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="car-form-accordion-details">
                      {/* Image Upload Component */}
                      {isEditMode && (
                        <Box sx={{ mb: 4 }}>
                          {loadingImages ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                              <CircularProgress size={30} className="car-form-loading-spinner" />
                            </Box>
                          ) : (
                            <ImageUpload 
                              carId={id} 
                              initialImages={carImages} 
                              onImagesUpdate={handleImagesUpdate} 
                            />
                          )}
                          <Divider className="car-form-divider" sx={{ my: 3 }} />
                          <Typography variant="subtitle1" gutterBottom sx={{ color: '#a6a6a6' }}>
                            Alternatywne linki do obrazów (opcjonalnie):
                          </Typography>
                        </Box>
                      )}
                      
                      {!isEditMode && (
                        <Box className="car-form-image-section">
                          <ImageIcon sx={{ fontSize: 48, color: '#C3845E', mb: 2 }} />
                          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                            Zarządzanie obrazami
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#a6a6a6', mb: 2 }}>
                            Obrazy można dodać po utworzeniu samochodu w systemie
                          </Typography>
                        </Box>
                      )}

                      {/* URL-based images */}
                      {formik.values.images.map((image, index) => (
                        <Box key={index} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                          <TextField
                            fullWidth
                            label={`Obraz ${index + 1}`}
                            value={image}
                            onChange={(e) => {
                              const updatedImages = [...formik.values.images];
                              updatedImages[index] = e.target.value;
                              formik.setFieldValue('images', updatedImages);
                            }}
                            placeholder="Nazwa pliku obrazu"
                            className="car-form-text-field"
                          />
                          <IconButton 
                            onClick={() => handleRemoveImage(index)}
                            disabled={formik.values.images.length <= 1}
                            className="car-form-delete-image-button"
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={handleAddImage}
                        variant="outlined"
                        size="small"
                        className="car-form-add-image-button"
                        sx={{ mt: 1 }}
                      >
                        Dodaj obraz
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Description Section */}
                <Grid item xs={12}>
                  <Accordion className="car-form-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="car-form-accordion-icon" />}
                      aria-controls="description-content"
                      id="description-header"
                      className="car-form-accordion-summary"
                    >
                      <Typography variant="h6" className="car-form-accordion-title">
                        <DescriptionIcon className="car-form-section-icon" />
                        Opis szczegółowy
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="car-form-accordion-details">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="description.title"
                            name="description.title"
                            label="Tytuł opisu"
                            value={formik.values.description.title}
                            onChange={formik.handleChange}
                            className="car-form-text-field"
                            placeholder="np. Najszybszy drogowy Lamborghini"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="description.mainText"
                            name="description.mainText"
                            label="Główny tekst"
                            value={formik.values.description.mainText}
                            onChange={formik.handleChange}
                            multiline
                            rows={4}
                            className="car-form-text-field"
                            placeholder="Wprowadź główny opis samochodu..."
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description.performance"
                            name="description.performance"
                            label="Osiągi"
                            value={formik.values.description.performance}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            className="car-form-text-field"
                            placeholder="Opis osiągów..."
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description.accelerationDetails"
                            name="description.accelerationDetails"
                            label="Szczegóły przyspieszenia"
                            value={formik.values.description.accelerationDetails}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            className="car-form-text-field"
                            placeholder="Szczegóły przyspieszenia..."
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description.interior"
                            name="description.interior"
                            label="Wnętrze"
                            value={formik.values.description.interior}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            className="car-form-text-field"
                            placeholder="Opis wnętrza..."
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description.craftsmanship"
                            name="description.craftsmanship"
                            label="Wykonanie i jakość"
                            value={formik.values.description.craftsmanship}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            className="car-form-text-field"
                            placeholder="Opis wykonania..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="description.conclusion"
                            name="description.conclusion"
                            label="Podsumowanie"
                            value={formik.values.description.conclusion}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            className="car-form-text-field"
                            placeholder="Podsumowanie i wnioski..."
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Pricing Section */}
                <Grid item xs={12}>
                  <Accordion className="car-form-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="car-form-accordion-icon" />}
                      aria-controls="pricing-content"
                      id="pricing-header"
                      className="car-form-accordion-summary"
                    >
                      <Typography variant="h6" className="car-form-accordion-title">
                        <PriceIcon className="car-form-section-icon" />
                        Cennik i opcje wypożyczenia
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="car-form-accordion-details">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ color: '#a6a6a6', mb: 2 }}>
                            Ustaw różne ceny dla różnych okresów wypożyczenia. Jeśli pole zostanie puste, 
                            zostanie użyta cena podstawowa.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="pricing.daily"
                            name="pricing.daily"
                            label="Cena za dzień (PLN)"
                            type="number"
                            value={formik.values.pricing.daily}
                            onChange={formik.handleChange}
                            placeholder="Domyślnie cena podstawowa"
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="pricing.twoDays"
                            name="pricing.twoDays"
                            label="Cena za 2 dni (PLN)"
                            type="number"
                            value={formik.values.pricing.twoDays}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="pricing.threeDays"
                            name="pricing.threeDays"
                            label="Cena za 3 dni (PLN)"
                            type="number"
                            value={formik.values.pricing.threeDays}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="pricing.weekly"
                            name="pricing.weekly"
                            label="Cena tygodniowa (PLN)"
                            type="number"
                            value={formik.values.pricing.weekly}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="pricing.monthly"
                            name="pricing.monthly"
                            label="Cena miesięczna (PLN)"
                            type="number"
                            value={formik.values.pricing.monthly}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Mileage Information Section */}
                <Grid item xs={12}>
                  <Accordion className="car-form-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="car-form-accordion-icon" />}
                      aria-controls="mileage-content"
                      id="mileage-header"
                      className="car-form-accordion-summary"
                    >
                      <Typography variant="h6" className="car-form-accordion-title">
                        <SpeedIcon className="car-form-section-icon" />
                        Informacje o przebiegu
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="car-form-accordion-details">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ color: '#a6a6a6', mb: 2 }}>
                            Określ limity kilometrów i opłaty za przekroczenie.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="mileageInfo.dailyLimit"
                            name="mileageInfo.dailyLimit"
                            label="Dzienny limit km"
                            type="number"
                            value={formik.values.mileageInfo.dailyLimit}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0 }}
                            className="car-form-text-field"
                            placeholder="np. 200"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            id="mileageInfo.excessFee"
                            name="mileageInfo.excessFee"
                            label="Opłata za przekroczenie (PLN/km)"
                            type="number"
                            value={formik.values.mileageInfo.excessFee}
                            onChange={formik.handleChange}
                            inputProps={{ min: 0, step: 0.1 }}
                            className="car-form-text-field"
                            placeholder="np. 2.5"
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            id="mileageInfo.includedKm"
                            name="mileageInfo.includedKm"
                            label="Informacje o włączonych km"
                            value={formik.values.mileageInfo.includedKm}
                            onChange={formik.handleChange}
                            placeholder="np. Unlimited for weekly rentals"
                            className="car-form-text-field"
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </form>
          </Paper>

          {/* Submit Section */}
          <Paper className="car-form-submit-section" elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/cars')}
                className="car-form-cancel-button"
                size="large"
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={submitLoading}
                className="car-form-submit-button"
                size="large"
                onClick={formik.handleSubmit}
              >
                {submitLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'inherit' }} />
                    Zapisywanie...
                  </>
                ) : (
                  isEditMode ? 'Zapisz zmiany' : 'Dodaj samochód'
                )}
              </Button>
            </Box>
          </Paper>
        </div>
      </Fade>
    </div>
  );
};

export default CarForm;
