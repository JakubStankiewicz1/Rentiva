import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CarService from "../../services/car.service";
import CarCard from "../../components/Car/CarCard";
import CarsFilter from "../../components/Car/CarsFilter";
import { toast } from "react-toastify";
import "./CarsPage.css";

const CarsPage = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    carId: null,
    carTitle: "",
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

      // Extract unique brands and types for filters
      const uniqueBrands = [...new Set(carsData.map((car) => car.brand))];
      const uniqueTypes = [...new Set(carsData.map((car) => car.type))];

      setBrands(uniqueBrands);
      setTypes(uniqueTypes);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to fetch car data. Please try again later.");
      setLoading(false);
    }
  };

  const handleFilterApply = async (filters) => {
    try {
      setLoading(true);
      setError(null);

      // Create an object with only non-empty filters
      const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      // If there are no active filters, restore the original list
      if (Object.keys(activeFilters).length === 0) {
        setCars(originalCars);
        setLoading(false);
        return;
      }

      const filteredCars = await CarService.getAllCars(activeFilters);
      setCars(filteredCars);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering cars:", error);
      setError("An error occurred while filtering. Please try again.");
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
      console.error("Error searching cars:", error);
      setError("An error occurred while searching. Please try again.");
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setCars(originalCars);
  };

  const handleDeleteClick = (carId) => {
    const car = cars.find((c) => c.id === carId);
    if (car) {
      setDeleteDialog({
        open: true,
        carId,
        carTitle: car.title,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await CarService.deleteCar(deleteDialog.carId);

      // Remove the car from the local state
      const updatedCars = cars.filter((car) => car.id !== deleteDialog.carId);
      setCars(updatedCars);
      setOriginalCars(originalCars.filter((car) => car.id !== deleteDialog.carId));

      toast.success(`Car "${deleteDialog.carTitle}" has been deleted`);

      // Close the dialog
      setDeleteDialog({ open: false, carId: null, carTitle: "" });
    } catch (error) {
      console.error("Error deleting car:", error);
      
      // Handle specific error message from backend
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        toast.error(
          <div>
            <div>{errorMessage}</div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              Please delete all reservations for this car first in the Reservations section.
            </div>
          </div>,
          { autoClose: 8000 }
        );
      } else if (error.message && error.message.includes("associated reservation")) {
        toast.error(
          <div>
            <div>{error.message}</div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              Please delete all reservations for this car first in the Reservations section.
            </div>
          </div>,
          { autoClose: 8000 }
        );
      } else {
        toast.error("Failed to delete the car. Please try again.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, carId: null, carTitle: "" });
  };
  if (loading) {
    return (
      <div className="cars-page-loading">
        <div className="cars-page-spinner"></div>
      </div>
    );
  }
  return (
    <div className="cars-page-container">
      <div
        className="cars-page-header"
        // style={{
          // borderRadius: 0,
          // border: "1px solid #393939",
          // boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          // marginBottom: 32,
          // paddingBottom: 20,
          // borderBottom: "1px solid #393939",
        // }}
      >
        <div className="cars-page-header-actions">
          <p className="cars-page-title">
            Cars
          </p>
          <NavLink
            to="/cars/new"
            className="cars-page-add-button"
            // style={{ borderRadius: 0, fontWeight: 600, fontSize: 16, textTransform: 'uppercase', padding: '12px 24px', boxShadow: '0 4px 12px rgba(195, 132, 94, 0.2)' }}
          >
            {/* <div className="cars-page-add-icon">+</div> */}
            Add New Car
          </NavLink>
        </div>
      </div>
















      <div className="cars-page-content">
        {error && (
          <div className="cars-page-error">
            <div className="cars-page-error-title">Error</div>
            {error}
          </div>
        )}
        <CarsFilter onFilter={handleFilterApply} onSearch={handleSearch} onClear={handleClearFilters} brands={brands} types={types} />
        {/* <div style={{ marginBottom: 0 }}></div> */}
        {cars.length === 0 ? (
          <div className="cars-page-info">No cars found matching the search criteria.</div>
        ) : (
          <div className="cars-page-grid">
            {cars.map((car) => (
              <div key={car.id} className="cars-page-grid-item">
                <CarCard car={car} onDelete={handleDeleteClick} />
              </div>
            ))}
          </div>
        )}
        {/* Delete confirmation dialog */}
        {deleteDialog.open && (
          <div className="cars-page-dialog-overlay" onClick={handleDeleteCancel}>
            <div className="cars-page-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="cars-page-dialog-header">
                <h3>Confirm Deletion</h3>
              </div>
              <div className="cars-page-dialog-content">
                <p>Are you sure you want to delete the car "{deleteDialog.carTitle}"? This action cannot be undone.</p>
              </div>
              <div className="cars-page-dialog-actions">
                <button onClick={handleDeleteCancel} className="cars-page-dialog-cancel">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="cars-page-dialog-confirm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>




















    </div>
  );
};

export default CarsPage;
