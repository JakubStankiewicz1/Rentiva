import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CarService from '../../services/car.service';
import { toast } from 'react-toastify';

import "./dashboard.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    sportsCars: 0,
    luxuryCars: 0,
    highPowerCars: 0
  });
  const [recentCars, setRecentCars] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get total number of cars
        const totalCars = await CarService.getCarCount();
        
        // Get cars of type "Sports"
        const sportsCars = await CarService.getCarsByType('Sports');
        
        // Get cars of type "Luxury"
        const luxuryCars = await CarService.getCarsByType('Luxury');
        
        // Get cars with high power (> 500 HP)
        const highPowerCars = await CarService.getCarsByMinimumPower(500);
        
        // Get all cars (used to show the most recent)
        const allCars = await CarService.getAllCars();
        // Sort by ID (assuming newer have higher ID) and get 5 most recent
        const recent = allCars.slice(0, 5);

        setStats({
          totalCars,
          sportsCars: sportsCars.length,
          luxuryCars: luxuryCars.length,
          highPowerCars: highPowerCars.length
        });
        
        setRecentCars(recent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('An error occurred while loading data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return (
      <div className="rentivaDashboard__loading">
        <div className="rentivaDashboard__loadingSpinner"></div>
      </div>
    );
  }
  return (
    <div className="rentivaDashboard">
      <div className="rentivaDashboard__container">
        <div className="rentivaDashboard__header">
          <p className="rentivaDashboard__title">Dashboard</p>
          <NavLink 
            to="/cars/new"
            className="rentivaDashboard__addButton"
          >
            Add new car
          </NavLink>
        </div>

        {/* Statistics */}
        <div className="rentivaDashboard__statsGrid">
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--primary">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon">🚗</div> */}
              <p className="rentivaDashboard__statLabel">All Cars</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.totalCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--sports">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--sports">🏎️</div> */}
              <p className="rentivaDashboard__statLabel">Sports Cars</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.sportsCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--luxury">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--luxury">💎</div> */}
              <p className="rentivaDashboard__statLabel">Luxury Cars</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.luxuryCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--power">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--power">⚡</div> */}
              <p className="rentivaDashboard__statLabel">High Power (&gt;500 HP)</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.highPowerCars}</p>
          </div>
        </div>

        {/* Recently added cars */}
        <div className="rentivaDashboard__recentSection">
          <p className="rentivaDashboard__sectionTitle">Recently Added Cars</p>
          <div className="rentivaDashboard__sectionDivider"></div>
          
          <div className="rentivaDashboard__carsGrid">
            {recentCars.length > 0 ? (
              recentCars.map((car) => (
                <div key={car.id} className="rentivaDashboard__carCard">
                  <div className="rentivaDashboard__carInfo">
                    <p className="rentivaDashboard__carTitle">{car.title}</p>
                    <p className="rentivaDashboard__carDetails">
                      {car.brand} • {car.model} • {car.engine} • {car.power} HP
                    </p>
                  </div>
                  <div className="rentivaDashboard__carActions">
                    <p className="rentivaDashboard__carPrice">{car.grossPrice} PLN/day</p>
                    <Link 
                      to={`/cars/${car.id}`}
                      className="rentivaDashboard__carButton"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rentivaDashboard__emptyCars">
                No cars available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
