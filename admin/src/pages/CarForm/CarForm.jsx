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
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import ImageUpload from '../../components/Car/ImageUpload';
import { toast } from 'react-toastify';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edytuj Samochód' : 'Dodaj Nowy Samochód'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/cars')}
        >
          Powrót
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Podstawowe informacje */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Podstawowe informacje
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            {isEditMode && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="id"
                  name="id"
                  label="ID (niemodyfikowalne)"
                  value={formik.values.id}
                  disabled
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Tytuł"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="brand"
                name="brand"
                label="Marka"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="model"
                name="model"
                label="Model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="engine"
                name="engine"
                label="Silnik"
                value={formik.values.engine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.engine && Boolean(formik.errors.engine)}
                helperText={formik.touched.engine && formik.errors.engine}
                required
                placeholder="np. 4.0L V8"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="power"
                name="power"
                label="Moc (KM)"
                type="number"
                value={formik.values.power}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.power && Boolean(formik.errors.power)}
                helperText={formik.touched.power && formik.errors.power}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="acceleration"
                name="acceleration"
                label="Przyspieszenie 0-100 km/h (s)"
                type="number"
                value={formik.values.acceleration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.acceleration && Boolean(formik.errors.acceleration)}
                helperText={formik.touched.acceleration && formik.errors.acceleration}
                required
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="maxSpeed"
                name="maxSpeed"
                label="Prędkość maksymalna (km/h)"
                type="number"
                value={formik.values.maxSpeed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.maxSpeed && Boolean(formik.errors.maxSpeed)}
                helperText={formik.touched.maxSpeed && formik.errors.maxSpeed}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="fuelType"
                name="fuelType"
                label="Rodzaj paliwa"
                value={formik.values.fuelType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
                helperText={formik.touched.fuelType && formik.errors.fuelType}
                required
                select
              >
                <MenuItem value="Benzyna">Benzyna</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Elektryczny">Elektryczny</MenuItem>
                <MenuItem value="Hybryda">Hybryda</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="transmission"
                name="transmission"
                label="Skrzynia biegów"
                value={formik.values.transmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.transmission && Boolean(formik.errors.transmission)}
                helperText={formik.touched.transmission && formik.errors.transmission}
                required
                placeholder="np. 7-biegowa DSG"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="drivetrain"
                name="drivetrain"
                label="Napęd"
                value={formik.values.drivetrain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.drivetrain && Boolean(formik.errors.drivetrain)}
                helperText={formik.touched.drivetrain && formik.errors.drivetrain}
                required
                select
              >
                <MenuItem value="FWD">FWD (przód)</MenuItem>
                <MenuItem value="RWD">RWD (tył)</MenuItem>
                <MenuItem value="AWD">AWD (wszystkie koła)</MenuItem>
                <MenuItem value="4WD">4WD (4x4)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="type"
                name="type"
                label="Typ"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                required
                select
              >
                <MenuItem value="Sports">Sportowy</MenuItem>
                <MenuItem value="Luxury">Luksusowy</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="Coupe">Coupe</MenuItem>
                <MenuItem value="Convertible">Kabriolet</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="grossPrice"
                name="grossPrice"
                label="Cena podstawowa (PLN/dzień)"
                type="number"
                value={formik.values.grossPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.grossPrice && Boolean(formik.errors.grossPrice)}
                helperText={formik.touched.grossPrice && formik.errors.grossPrice}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Obrazy */}
            <Grid item xs={12}>              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="images-content"
                  id="images-header"
                >
                  <Typography variant="h6">Obrazy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Nowy komponent ImageUpload */}
                  {isEditMode && (
                    <Box sx={{ mb: 4 }}>
                      {loadingImages ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                          <CircularProgress size={30} />
                        </Box>
                      ) : (
                        <ImageUpload 
                          carId={id} 
                          initialImages={carImages} 
                          onImagesUpdate={handleImagesUpdate} 
                        />
                      )}
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        Alternatywne linki do obrazów (opcjonalnie):
                      </Typography>
                    </Box>
                  )}
                  
                  {!isEditMode && (
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Obrazy można dodać po utworzeniu samochodu.
                    </Typography>
                  )}

                  {/* Istniejący kod dla linków do obrazów */}
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
                      />
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveImage(index)}
                        disabled={formik.values.images.length <= 1}
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
                    sx={{ mt: 1 }}
                  >
                    Dodaj obraz
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Opis */}
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="description-content"
                  id="description-header"
                >
                  <Typography variant="h6">Opis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description.title"
                        name="description.title"
                        label="Tytuł opisu"
                        value={formik.values.description.title}
                        onChange={formik.handleChange}
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
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description.performance"
                        name="description.performance"
                        label="Osiągi"
                        value={formik.values.description.performance}
                        onChange={formik.handleChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description.accelerationDetails"
                        name="description.accelerationDetails"
                        label="Szczegóły przyspieszenia"
                        value={formik.values.description.accelerationDetails}
                        onChange={formik.handleChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description.interior"
                        name="description.interior"
                        label="Wnętrze"
                        value={formik.values.description.interior}
                        onChange={formik.handleChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description.craftsmanship"
                        name="description.craftsmanship"
                        label="Wykonanie"
                        value={formik.values.description.craftsmanship}
                        onChange={formik.handleChange}
                        multiline
                        rows={2}
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
                        rows={2}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Cennik */}
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="pricing-content"
                  id="pricing-header"
                >
                  <Typography variant="h6">Cennik</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
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
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Informacje o przebiegu */}
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="mileage-content"
                  id="mileage-header"
                >
                  <Typography variant="h6">Informacje o przebiegu</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
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
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="mileageInfo.includedKm"
                        name="mileageInfo.includedKm"
                        label="Informacje o włączonych km"
                        value={formik.values.mileageInfo.includedKm}
                        onChange={formik.handleChange}
                        placeholder="np. Unlimited for weekly rentals"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Przyciski */}
            <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/cars')}
                sx={{ mr: 2 }}
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={submitLoading}
              >
                {submitLoading ? 'Zapisywanie...' : (isEditMode ? 'Zapisz zmiany' : 'Dodaj samochód')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CarForm;
