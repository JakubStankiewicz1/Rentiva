import React, { useState } from 'react';
import Select from 'react-select';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';
import './carsFilter.css';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgba(24, 24, 24, 0.6)',
    border: '2px solid #393939',
    color: '#fff',
    minHeight: 52,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: 0,
    fontFamily: 'Bai Jamjuree, sans-serif',
    fontSize: 16,
    fontWeight: 400,
    paddingLeft: 0,
    '&:hover': {
      borderColor: 'rgba(195, 132, 94, 0.6)'
    }
  }),
  menu: (provided) => ({
    ...provided,
    background: '#181818',
    color: '#fff',
    borderRadius: 0,
    marginTop: 2,
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'rgba(195, 132, 94, 0.2)'
      : state.isFocused
      ? 'rgba(195, 132, 94, 0.1)'
      : '#181818',
    color: '#fff',
    borderRadius: 0,
    fontFamily: 'Bai Jamjuree, sans-serif',
    fontSize: 16,
    fontWeight: 400,
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
    fontFamily: 'Bai Jamjuree, sans-serif',
    fontSize: 16,
    fontWeight: 400,
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
    fontFamily: 'Bai Jamjuree, sans-serif',
    fontSize: 16,
    fontWeight: 400,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#C3845E',
    padding: 6,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
};

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
  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';
  const brandOptions = [
    { value: '', label: 'All brands' },
    ...brands.map((brand) => ({ value: brand, label: brand }))
  ];
  const typeOptions = [
    { value: '', label: 'All types' },
    ...types.map((type) => ({ value: type, label: type }))
  ];
  const sortByOptions = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: ascending' },
    { value: 'price-desc', label: 'Price: descending' },
    { value: 'power', label: 'Power: descending' },
    { value: 'name', label: 'Alphabetically' },
  ];
  return (
    <div className={`rentivaAdminCarsFilter ${isFiltering ? 'rentivaAdminCarsFilter--loading' : ''}`}>
      <div className="rentivaAdminCarsFilter__header">
        <FilterIcon className="rentivaAdminCarsFilter__icon" />
        <h2 className="rentivaAdminCarsFilter__title">Filter & Search</h2>
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
            Active filters
          </span>
        )}
      </div>
      
      {/* Search Section */}
      <div className="rentivaAdminCarsFilter__searchSection">
        <div className="rentivaAdminCarsFilter__searchContainer">
          <input
            type="text"
            className="rentivaAdminCarsFilter__searchInput"
            placeholder="Search car by name or brand..."
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
          <label className="rentivaAdminCarsFilter__label">Brand</label>
          <Select
            classNamePrefix="rentivaAdminCarsFilter__select"
            options={brandOptions}
            value={brandOptions.find(opt => opt.value === filters.brand)}
            onChange={option => setFilters(prev => ({ ...prev, brand: option.value }))}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Type</label>
          <Select
            classNamePrefix="rentivaAdminCarsFilter__select"
            options={typeOptions}
            value={typeOptions.find(opt => opt.value === filters.type)}
            onChange={option => setFilters(prev => ({ ...prev, type: option.value }))}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Min. power (HP)</label>
          <input
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            placeholder="e.g. 150"
            min="0"
            className="rentivaAdminCarsFilter__numberInput"
          />        </div>
        
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Sort by</label>
          <Select
            classNamePrefix="rentivaAdminCarsFilter__select"
            options={sortByOptions}
            value={sortByOptions.find(opt => opt.value === filters.sortBy)}
            onChange={option => setFilters(prev => ({ ...prev, sortBy: option.value }))}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
      </div>
      
      {/* Price Range Section */}
      <div className="rentivaAdminCarsFilter__priceSection">
        <div className="rentivaAdminCarsFilter__inputGroup">
          <label className="rentivaAdminCarsFilter__label">Price range (PLN/day)</label>
          <div className="rentivaAdminCarsFilter__priceRange">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min. price"
              min="0"
              className="rentivaAdminCarsFilter__numberInput"
            />
            <span className="rentivaAdminCarsFilter__priceSeparator">-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max. price"
              min="0"
              className="rentivaAdminCarsFilter__numberInput"
            />
          </div>
        </div>
      </div>
        {/* Action Buttons */}
      <div className="rentivaAdminCarsFilter__actions">
        <div
          className="rentivaAdminCarsFilter__applyButton"
          onClick={applyFilters}
          disabled={isFiltering}
        >
          <FilterIcon style={{ width: '16px', height: '16px' }} />
          {isFiltering ? 'Filtering...' : 'Apply filters'}
        </div>
        
        <div
          className="rentivaAdminCarsFilter__clearButton"
          onClick={clearFilters}
          disabled={isFiltering}
        >
          <ClearIcon style={{ width: '16px', height: '16px' }} />
          Clear filters
        </div>
      </div>
    </div>
  );
};

export default CarsFilter;
