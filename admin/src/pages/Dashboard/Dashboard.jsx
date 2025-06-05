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
        
        // Pobierz liczbę wszystkich samochodów
        const totalCars = await CarService.getCarCount();
        
        // Pobierz samochody typu "Sports"
        const sportsCars = await CarService.getCarsByType('Sports');
        
        // Pobierz samochody typu "Luxury"
        const luxuryCars = await CarService.getCarsByType('Luxury');
        
        // Pobierz samochody o dużej mocy (> 500 KM)
        const highPowerCars = await CarService.getCarsByMinimumPower(500);
        
        // Pobierz wszystkie samochody (używane do pokazania najnowszych)
        const allCars = await CarService.getAllCars();
        // Posortuj po ID (zakładając, że nowsze mają większe ID) i pobierz 5 najnowszych
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
        console.error('Błąd podczas pobierania danych dla dashboard:', error);
        toast.error('Wystąpił błąd podczas ładowania danych');
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
            Dodaj samochód
          </NavLink>
        </div>

        {/* Statystyki */}
        <div className="rentivaDashboard__statsGrid">
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--primary">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon">🚗</div> */}
              <p className="rentivaDashboard__statLabel">Wszystkie Samochody</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.totalCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--sports">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--sports">🏎️</div> */}
              <p className="rentivaDashboard__statLabel">Samochody Sportowe</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.sportsCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--luxury">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--luxury">💎</div> */}
              <p className="rentivaDashboard__statLabel">Samochody Luksusowe</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.luxuryCars}</p>
          </div>
          
          <div className="rentivaDashboard__statCard rentivaDashboard__statCard--power">
            <div className="rentivaDashboard__statHeader">
              {/* <div className="rentivaDashboard__statIcon rentivaDashboard__statIcon--power">⚡</div> */}
              <p className="rentivaDashboard__statLabel">Duża moc (&gt;500 KM)</p>
            </div>
            <p className="rentivaDashboard__statValue">{stats.highPowerCars}</p>
          </div>
        </div>

        {/* Ostatnio dodane samochody */}
        <div className="rentivaDashboard__recentSection">
          <p className="rentivaDashboard__sectionTitle">Ostatnio Dodane Samochody</p>
          <div className="rentivaDashboard__sectionDivider"></div>
          
          <div className="rentivaDashboard__carsGrid">
            {recentCars.length > 0 ? (
              recentCars.map((car) => (
                <div key={car.id} className="rentivaDashboard__carCard">
                  <div className="rentivaDashboard__carInfo">
                    <p className="rentivaDashboard__carTitle">{car.title}</p>
                    <p className="rentivaDashboard__carDetails">
                      {car.brand} • {car.model} • {car.engine} • {car.power} KM
                    </p>
                  </div>
                  <div className="rentivaDashboard__carActions">
                    <p className="rentivaDashboard__carPrice">{car.grossPrice} PLN/dzień</p>
                    <Link 
                      to={`/cars/${car.id}`}
                      className="rentivaDashboard__carButton"
                    >
                      Szczegóły
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rentivaDashboard__emptyCars">
                Brak dostępnych samochodów
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
