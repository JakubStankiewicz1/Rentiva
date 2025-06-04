import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Button,
  Grid,
  Typography
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';

const CarsFilter = ({ onFilter, onSearch, onClear, brands, types }) => {
  const [filters, setFilters] = useState({
    brand: '',
    type: '',
    minPower: '',
    minPrice: '',
    maxPrice: '',
    sortBy: ''
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const applyFilters = () => {
    onFilter(filters);
  };
  
  const applySearch = () => {
    onSearch(searchQuery);
  };
  
  const clearFilters = () => {
    setFilters({
      brand: '',
      type: '',
      minPower: '',
      minPrice: '',
      maxPrice: '',
      sortBy: ''
    });
    setSearchQuery('');
    onClear();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filtrowanie i wyszukiwanie</Typography>
      
      <Grid container spacing={2} alignItems="center">
        {/* Wyszukiwanie */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Szukaj samochodu"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ cursor: 'pointer' }} onClick={applySearch} />
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                applySearch();
              }
            }}
          />
        </Grid>
        
        {/* Filtry */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Marka</InputLabel>
            <Select
              name="brand"
              value={filters.brand}
              label="Marka"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Typ</InputLabel>
            <Select
              name="type"
              value={filters.type}
              label="Typ"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Min. moc (KM)"
            variant="outlined"
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Min. cena (PLN)"
            variant="outlined"
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Max. cena (PLN)"
            variant="outlined"
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sortowanie</InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              label="Sortowanie"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Domyślne</MenuItem>
              <MenuItem value="price-asc">Cena: rosnąco</MenuItem>
              <MenuItem value="price-desc">Cena: malejąco</MenuItem>
              <MenuItem value="power">Moc: malejąco</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="contained"
            startIcon={<FilterIcon />}
            onClick={applyFilters}
            fullWidth
          >
            Filtruj
          </Button>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            fullWidth
          >
            Wyczyść
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarsFilter;
