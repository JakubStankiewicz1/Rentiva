import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Speed as SpeedIcon,
  Settings as SettingsIcon,
  LocalGasStation as GasIcon,
  Build as BuildIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
  Add as AddIcon,
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  DeleteOutline as DeleteOutlineIcon
} from '@mui/icons-material';
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
  };
  if (loading) {
    return (
      <Box className="car-details-loading">
        <CircularProgress className="car-details-loading-spinner" size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="car-details-container">
        <Alert severity="error" className="car-details-error">
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/cars')}
          className="car-details-btn-back"
        >
          Powrót do listy samochodów
        </Button>
      </Box>
    );
  }

  if (!car) {
    return (
      <Box className="car-details-container">
        <Alert severity="warning" className="car-details-warning">
          Nie znaleziono samochodu o ID: {id}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/cars')}
          className="car-details-btn-back"
        >
          Powrót do listy samochodów
        </Button>
      </Box>
    );
  }
  return (
    <Box className="car-details-container car-details-fade-in">
      <Box className="car-details-header">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" className="car-details-title">
              {car.title}
            </Typography>
            <Box className="car-details-chips">
              <Chip 
                label={car.brand} 
                size="small"
                className="car-details-chip-brand"
              />
              <Chip 
                label={car.type} 
                size="small"
                className="car-details-chip-type"
              />
            </Box>
          </Box>
          <Box className="car-details-actions">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/cars')}
              className="car-details-btn-back"
            >
              Powrót
            </Button>            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => {
                console.log('Navigating to:', `/cars/edit/${id}`);
                navigate(`/cars/edit/${id}`);
              }}
              className="car-details-btn-edit"
            >
              Edytuj
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              className="car-details-btn-delete"
            >
              Usuń
            </Button>
          </Box>
        </Box>
      </Box>      <Grid container spacing={4}>        {/* Image Gallery and Basic Info */}
        <Grid item xs={12} md={5}>
          {/* Main Image Gallery */}
          <Paper className="car-details-gallery-card car-details-hover-effect" sx={{ mb: 3 }}>
            <Box className="car-details-gallery-header">
              <Typography variant="h6" className="car-details-gallery-title">
                <PhotoCameraIcon sx={{ mr: 1 }} />
                Galeria zdjęć
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setAddImageDialogOpen(true)}
                className="car-details-gallery-add-btn"
              >
                Dodaj
              </Button>
            </Box>
            
            {/* Main Image Display */}
            <Box className="car-details-gallery-main">
              <Card className="car-details-gallery-main-card">
                <CardMedia
                  component="img"
                  image={getCurrentImage()}
                  alt={`${car.title} - Image ${selectedImageIndex + 1}`}
                  className="car-details-gallery-main-image"
                />
                {car.images && car.images.length > 1 && (
                  <Box className="car-details-gallery-counter">
                    {selectedImageIndex + 1} / {car.images.length}
                  </Box>
                )}
              </Card>
            </Box>

            {/* Thumbnail Gallery */}
            {car.images && car.images.length > 1 && (
              <Box className="car-details-gallery-thumbnails">
                {getCarImages().map((image, index) => (
                  <Box
                    key={index}
                    className={`car-details-gallery-thumbnail ${
                      selectedImageIndex === index ? 'active' : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="car-details-gallery-thumbnail-image"
                    />
                    {car.images.length > 1 && (
                      <IconButton
                        size="small"
                        className="car-details-gallery-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Paper>

          <Paper className="car-details-info-card car-details-hover-effect" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom className="car-details-section-title">
              <Box className="car-details-section-icon">
                <CarIcon />
              </Box>
              Podstawowe informacje
            </Typography>
            <Divider className="car-details-divider" />
            
            <TableContainer className="car-details-table">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">ID</TableCell>
                    <TableCell className="car-details-table-cell">{car.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Marka</TableCell>
                    <TableCell className="car-details-table-cell">{car.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Model</TableCell>
                    <TableCell className="car-details-table-cell">{car.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Typ</TableCell>
                    <TableCell className="car-details-table-cell">{car.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Cena (dzień)</TableCell>
                    <TableCell className="car-details-table-cell">
                      <Typography className="car-details-price">{car.grossPrice} PLN</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper className="car-details-info-card car-details-hover-effect" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom className="car-details-section-title">
              <Box className="car-details-section-icon">
                <SettingsIcon />
              </Box>
              Specyfikacja
            </Typography>
            <Divider className="car-details-divider" />
            
            <TableContainer className="car-details-table">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Silnik</TableCell>
                    <TableCell className="car-details-table-cell">{car.engine}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Moc</TableCell>
                    <TableCell className="car-details-table-cell">{car.power} KM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">0-100 km/h</TableCell>
                    <TableCell className="car-details-table-cell">{car.acceleration} s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Prędkość max.</TableCell>
                    <TableCell className="car-details-table-cell">{car.maxSpeed} km/h</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Paliwo</TableCell>
                    <TableCell className="car-details-table-cell">{car.fuelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Skrzynia biegów</TableCell>
                    <TableCell className="car-details-table-cell">{car.transmission}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" className="car-details-table-cell-label">Napęd</TableCell>
                    <TableCell className="car-details-table-cell">{car.drivetrain}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>        {/* Opis, cennik i limity przebiegu */}
        <Grid item xs={12} md={7}>
          <Paper className="car-details-description-card car-details-hover-effect" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom className="car-details-description-title">
              Opis
            </Typography>
            <Divider className="car-details-divider" />
            
            {car.description ? (
              <Box>
                <Typography variant="subtitle1" className="car-details-description-label" gutterBottom>
                  {car.description.title}
                </Typography>
                
                <Typography variant="body1" paragraph className="car-details-description-text">
                  {car.description.mainText}
                </Typography>
                
                {car.description.performance && (
                  <Typography variant="body2" paragraph className="car-details-description-text">
                    <Typography component="span" className="car-details-description-label">Osiągi: </Typography>
                    {car.description.performance}
                  </Typography>
                )}
                
                {car.description.accelerationDetails && (
                  <Typography variant="body2" paragraph className="car-details-description-text">
                    <Typography component="span" className="car-details-description-label">Szczegóły przyspieszenia: </Typography>
                    {car.description.accelerationDetails}
                  </Typography>
                )}
                
                {car.description.interior && (
                  <Typography variant="body2" paragraph className="car-details-description-text">
                    <Typography component="span" className="car-details-description-label">Wnętrze: </Typography>
                    {car.description.interior}
                  </Typography>
                )}
                
                {car.description.craftsmanship && (
                  <Typography variant="body2" paragraph className="car-details-description-text">
                    <Typography component="span" className="car-details-description-label">Wykonanie: </Typography>
                    {car.description.craftsmanship}
                  </Typography>
                )}
                
                {car.description.conclusion && (
                  <Typography variant="body2" paragraph className="car-details-description-text">
                    <Typography component="span" className="car-details-description-label">Podsumowanie: </Typography>
                    {car.description.conclusion}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" className="car-details-no-data">
                Brak opisu dla tego samochodu.
              </Typography>
            )}
          </Paper>          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className="car-details-pricing-card car-details-hover-effect" sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom className="car-details-section-title">
                  <Box className="car-details-section-icon">
                    <SpeedIcon />
                  </Box>
                  Cennik
                </Typography>
                <Divider className="car-details-divider" />
                
                {car.pricing ? (
                  <List dense>
                    <ListItem className="car-details-list-item">
                      <ListItemText 
                        primary="1 dzień" 
                        secondary={`${car.pricing.daily || car.grossPrice} PLN`}
                        primaryTypographyProps={{ className: 'car-details-list-primary' }}
                        secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                      />
                    </ListItem>
                    {car.pricing.twoDays && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="2 dni" 
                          secondary={`${car.pricing.twoDays} PLN`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.threeDays && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="3 dni" 
                          secondary={`${car.pricing.threeDays} PLN`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.weekly && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="Tydzień" 
                          secondary={`${car.pricing.weekly} PLN`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.monthly && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="Miesiąc" 
                          secondary={`${car.pricing.monthly} PLN`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" className="car-details-no-data">
                    Brak danych cennika.
                  </Typography>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className="car-details-pricing-card car-details-hover-effect" sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom className="car-details-section-title">
                  <Box className="car-details-section-icon">
                    <BuildIcon />
                  </Box>
                  Limity przebiegu
                </Typography>
                <Divider className="car-details-divider" />
                
                {car.mileageInfo ? (
                  <List dense>
                    {car.mileageInfo.dailyLimit && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="Dzienny limit" 
                          secondary={`${car.mileageInfo.dailyLimit} km`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                    {car.mileageInfo.excessFee && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="Opłata za przekroczenie" 
                          secondary={`${car.mileageInfo.excessFee} PLN/km`}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                    {car.mileageInfo.includedKm && (
                      <ListItem className="car-details-list-item">
                        <ListItemText 
                          primary="Dodatkowe informacje" 
                          secondary={car.mileageInfo.includedKm}
                          primaryTypographyProps={{ className: 'car-details-list-primary' }}
                          secondaryTypographyProps={{ className: 'car-details-list-secondary' }}
                        />
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" className="car-details-no-data">
                    Brak danych o limitach przebiegu.
                  </Typography>
                )}
              </Paper>            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Add Image Dialog */}
      <Dialog
        open={addImageDialogOpen}
        onClose={() => setAddImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        className="car-details-add-image-dialog"
      >
        <DialogTitle className="car-details-dialog-title">
          <PhotoCameraIcon sx={{ mr: 1 }} />
          Dodaj nowe zdjęcie
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL zdjęcia"
            type="url"
            fullWidth
            variant="outlined"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="car-details-dialog-input"
          />
        </DialogContent>
        <DialogActions className="car-details-dialog-actions">
          <Button
            onClick={() => setAddImageDialogOpen(false)}
            className="car-details-dialog-cancel"
          >
            Anuluj
          </Button>
          <Button
            onClick={handleAddImage}
            variant="contained"
            disabled={!newImageUrl.trim()}
            className="car-details-dialog-add"
          >
            Dodaj zdjęcie
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarDetails;
