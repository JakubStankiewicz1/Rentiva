import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  AlertTitle
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CarService from '../../services/car.service';
import CarCard from '../../components/Car/CarCard';
import CarsFilter from '../../components/Car/CarsFilter';
import { toast } from 'react-toastify';

const CarsPage = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    carId: null,
    carTitle: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const carsData = await CarService.getAllCars();
      setCars(carsData);
      setOriginalCars(carsData);
      
      // Ekstraktuj unikalne marki i typy dla filtrów
      const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
      const uniqueTypes = [...new Set(carsData.map(car => car.type))];
      
      setBrands(uniqueBrands);
      setTypes(uniqueTypes);
      
      setLoading(false);
    } catch (error) {
      console.error('Błąd podczas pobierania samochodów:', error);
      setError('Nie udało się pobrać danych samochodów. Spróbuj ponownie później.');
      setLoading(false);
    }
  };

  const handleFilterApply = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Tworzymy obiekt z tylko niepustymi filtrami
      const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      
      // Jeśli nie ma aktywnych filtrów, przywróć oryginalną listę
      if (Object.keys(activeFilters).length === 0) {
        setCars(originalCars);
        setLoading(false);
        return;
      }
      
      const filteredCars = await CarService.getAllCars(activeFilters);
      setCars(filteredCars);
      setLoading(false);
    } catch (error) {
      console.error('Błąd podczas filtrowania samochodów:', error);
      setError('Wystąpił błąd podczas filtrowania. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setCars(originalCars);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await CarService.searchCars(searchTerm);
      setCars(searchResults);
      setLoading(false);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania samochodów:', error);
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setCars(originalCars);
  };

  const handleDeleteClick = (carId) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      setDeleteDialog({
        open: true,
        carId,
        carTitle: car.title
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await CarService.deleteCar(deleteDialog.carId);
      
      // Usuń samochód z lokalnego stanu
      const updatedCars = cars.filter(car => car.id !== deleteDialog.carId);
      setCars(updatedCars);
      setOriginalCars(originalCars.filter(car => car.id !== deleteDialog.carId));
      
      toast.success(`Samochód "${deleteDialog.carTitle}" został usunięty`);
      
      // Zamknij dialog
      setDeleteDialog({ open: false, carId: null, carTitle: '' });
    } catch (error) {
      console.error('Błąd podczas usuwania samochodu:', error);
      toast.error('Nie udało się usunąć samochodu. Spróbuj ponownie.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, carId: null, carTitle: '' });
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
          Zarządzanie Samochodami
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          component={Link}
          to="/cars/new"
        >
          Dodaj Samochód
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          <AlertTitle>Błąd</AlertTitle>
          {error}
        </Alert>
      )}

      <CarsFilter 
        onFilter={handleFilterApply}
        onSearch={handleSearch}
        onClear={handleClearFilters}
        brands={brands}
        types={types}
      />

      {cars.length === 0 ? (
        <Alert severity="info" sx={{ mt: 4 }}>
          Nie znaleziono samochodów spełniających kryteria wyszukiwania.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <CarCard car={car} onDelete={handleDeleteClick} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog potwierdzenia usunięcia */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć samochód "{deleteDialog.carTitle}"? 
            Ta operacja jest nieodwracalna.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarsPage;
