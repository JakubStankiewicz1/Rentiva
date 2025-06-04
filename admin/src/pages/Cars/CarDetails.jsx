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
  ImageListItem
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
  Image as ImageIcon
} from '@mui/icons-material';
import CarService from '../../services/car.service';
import FileService from '../../services/file.service';
import { toast } from 'react-toastify';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

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
  };

  // Funkcja do ekstrakcji pierwszego obrazu z listy
  const getFirstImage = () => {
    if (car?.images && car.images.length > 0) {
      return `/images/${car.images[0]}.jpg`;
    }
    return '/images/car-placeholder.jpg'; // Domyślne zdjęcie
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/cars')}
        >
          Powrót do listy samochodów
        </Button>
      </Box>
    );
  }

  if (!car) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Nie znaleziono samochodu o ID: {id}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/cars')}
        >
          Powrót do listy samochodów
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {car.title}
          </Typography>
          <Chip 
            label={car.brand} 
            color="primary" 
            size="small"
            sx={{ ml: 2 }}
          />
          <Chip 
            label={car.type} 
            variant="outlined" 
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/cars')}
            sx={{ mr: 2 }}
          >
            Powrót
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/cars/edit/${id}`)}
            sx={{ mr: 2 }}
          >
            Edytuj
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Usuń
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Zdjęcie i podstawowe informacje */}
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image={getFirstImage()}
              alt={car.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CarIcon sx={{ mr: 1 }} /> Podstawowe informacje
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell>{car.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Marka</TableCell>
                    <TableCell>{car.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Model</TableCell>
                    <TableCell>{car.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Typ</TableCell>
                    <TableCell>{car.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Cena (dzień)</TableCell>
                    <TableCell><Typography color="primary" fontWeight="bold">{car.grossPrice} PLN</Typography></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ mr: 1 }} /> Specyfikacja
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Silnik</TableCell>
                    <TableCell>{car.engine}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Moc</TableCell>
                    <TableCell>{car.power} KM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>0-100 km/h</TableCell>
                    <TableCell>{car.acceleration} s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Prędkość max.</TableCell>
                    <TableCell>{car.maxSpeed} km/h</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Paliwo</TableCell>
                    <TableCell>{car.fuelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Skrzynia biegów</TableCell>
                    <TableCell>{car.transmission}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Napęd</TableCell>
                    <TableCell>{car.drivetrain}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Opis, cennik i limity przebiegu */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Opis
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {car.description ? (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {car.description.title}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {car.description.mainText}
                </Typography>
                
                {car.description.performance && (
                  <Typography variant="body2" paragraph>
                    <Typography component="span" fontWeight="bold">Osiągi: </Typography>
                    {car.description.performance}
                  </Typography>
                )}
                
                {car.description.accelerationDetails && (
                  <Typography variant="body2" paragraph>
                    <Typography component="span" fontWeight="bold">Szczegóły przyspieszenia: </Typography>
                    {car.description.accelerationDetails}
                  </Typography>
                )}
                
                {car.description.interior && (
                  <Typography variant="body2" paragraph>
                    <Typography component="span" fontWeight="bold">Wnętrze: </Typography>
                    {car.description.interior}
                  </Typography>
                )}
                
                {car.description.craftsmanship && (
                  <Typography variant="body2" paragraph>
                    <Typography component="span" fontWeight="bold">Wykonanie: </Typography>
                    {car.description.craftsmanship}
                  </Typography>
                )}
                
                {car.description.conclusion && (
                  <Typography variant="body2" paragraph>
                    <Typography component="span" fontWeight="bold">Podsumowanie: </Typography>
                    {car.description.conclusion}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                Brak opisu dla tego samochodu.
              </Typography>
            )}
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Cennik
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {car.pricing ? (
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="1 dzień" 
                        secondary={`${car.pricing.daily || car.grossPrice} PLN`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                        secondaryTypographyProps={{ color: 'primary', fontWeight: 'bold' }}
                      />
                    </ListItem>
                    {car.pricing.twoDays && (
                      <ListItem>
                        <ListItemText 
                          primary="2 dni" 
                          secondary={`${car.pricing.twoDays} PLN`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.threeDays && (
                      <ListItem>
                        <ListItemText 
                          primary="3 dni" 
                          secondary={`${car.pricing.threeDays} PLN`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.weekly && (
                      <ListItem>
                        <ListItemText 
                          primary="Tydzień" 
                          secondary={`${car.pricing.weekly} PLN`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                    {car.pricing.monthly && (
                      <ListItem>
                        <ListItemText 
                          primary="Miesiąc" 
                          secondary={`${car.pricing.monthly} PLN`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center">
                    Brak danych cennika.
                  </Typography>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Limity przebiegu
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {car.mileageInfo ? (
                  <List dense>
                    {car.mileageInfo.dailyLimit && (
                      <ListItem>
                        <ListItemText 
                          primary="Dzienny limit" 
                          secondary={`${car.mileageInfo.dailyLimit} km`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                    {car.mileageInfo.excessFee && (
                      <ListItem>
                        <ListItemText 
                          primary="Opłata za przekroczenie" 
                          secondary={`${car.mileageInfo.excessFee} PLN/km`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                    {car.mileageInfo.includedKm && (
                      <ListItem>
                        <ListItemText 
                          primary="Dodatkowe informacje" 
                          secondary={car.mileageInfo.includedKm}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center">
                    Brak danych o limitach przebiegu.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* Lista wszystkich obrazów */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Obrazy
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {car.images && car.images.length > 0 ? (
              <List dense>
                {car.images.map((image, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${image}`} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                Brak obrazów dla tego samochodu.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarDetails;
