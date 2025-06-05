import React, { useState } from 'react';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';
import './carsFilter.css';

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
  const [isFiltering, setIsFiltering] = useState(false);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Real-time search with debounce could be added here
  };
  
  const applyFilters = async () => {
    setIsFiltering(true);
    try {
      await onFilter(filters);
    } finally {
      setIsFiltering(false);
    }
  };
  
  const applySearch = async () => {
    if (searchQuery.trim()) {
      setIsFiltering(true);
      try {
        await onSearch(searchQuery);
      } finally {
        setIsFiltering(false);
      }
    }
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
    setIsFiltering(false);
    onClear();
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';  return (
    <div className={`rentivaAdminCarsFilter ${isFiltering ? 'rentivaAdminCarsFilter--loading' : ''}`}>
      <div className="rentivaAdminCarsFilter__header">
        <FilterIcon className="rentivaAdminCarsFilter__icon" />
        <h2 className="rentivaAdminCarsFilter__title">Filtrowanie i wyszukiwanie</h2>
        {hasActiveFilters && (
          <span style={{ 
            color: '#C3845E', 
            fontSize: '12px', 
            fontWeight: '500',
            background: 'rgba(195, 132, 94, 0.1)',
            padding: '4px 8px',
            borderRadius: '4px',
            marginLeft: 'auto'
          }}>
            Aktywne filtry
          </span>
        )}
      </div>
      
      {/* Search Section */}
      <div className="rentivaAdminCarsFilter__searchSection">
        <div className="rentivaAdminCarsFilter__searchContainer">
          <input
            type="text"
            className="rentivaAdminCarsFilter__searchInput"
            placeholder="Szukaj samochodu po nazwie lub marce..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                applySearch();
              }
            }}
          />
          <SearchIcon 
            className="rentivaAdminCarsFilter__searchIcon" 
            onClick={applySearch}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      
      {/* Filters Grid */}
      <div className="rentivaAdminCarsFilter__filtersGrid">
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Marka</label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="rentivaAdminCarsFilter__select"
          >
            <option value="">Wszystkie marki</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Typ</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="rentivaAdminCarsFilter__select"
          >
            <option value="">Wszystkie typy</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Min. moc (KM)</label>
          <input
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            placeholder="np. 150"
            min="0"
            className="rentivaAdminCarsFilter__numberInput"
          />        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Sortowanie</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="rentivaAdminCarsFilter__select"
          >
            <option value="">Domyślne</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
            <option value="power">Moc: malejąco</option>
            <option value="name">Alfabetycznie</option>
          </select>
        </div>
      </div>
      
      {/* Price Range Section */}
      <div className="rentivaAdminCarsFilter__priceSection">
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Zakres cenowy (PLN/dzień)</label>
          <div className="rentivaAdminCarsFilter__priceRange">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min. cena"
              min="0"
              className="rentivaAdminCarsFilter__numberInput"
            />
            <span className="rentivaAdminCarsFilter__priceSeparator">-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max. cena"
              min="0"
              className="rentivaAdminCarsFilter__numberInput"
            />
          </div>
        </div>
      </div>
        {/* Action Buttons */}
      <div className="rentivaAdminCarsFilter__actions">
        <button
          className="rentivaAdminCarsFilter__applyButton"
          onClick={applyFilters}
          disabled={isFiltering}
        >
          <FilterIcon style={{ width: '16px', height: '16px' }} />
          {isFiltering ? 'Filtrowanie...' : 'Zastosuj filtry'}
        </button>
        
        <button
          className="rentivaAdminCarsFilter__clearButton"
          onClick={clearFilters}
          disabled={isFiltering}
        >
          <ClearIcon style={{ width: '16px', height: '16px' }} />
          Wyczyść filtry
        </button>
      </div>
    </div>
  );
};

export default CarsFilter;
