import React from "react";
import { useParams } from "react-router-dom";
import "./CarDetails.css";
import { useRentiva } from "../../Context/context.jsx";
import Navbar from "../../components/Navbar/Navbar";
import CarDetailsHero from "../../components/CarDetailsHero/CarDetailsHero";
import CarDetailsSpecs from "../../components/CarDetailsSpecs/CarDetailsSpecs";
import CarDetailsInfo from "../../components/CarDetailsInfo/CarDetailsInfo";
import CarDetailsTariff from "../../components/CarDetailsTariff/CarDetailsTariff";
import CarDetailsKilometers from "../../components/CarDetailsKilometers/CarDetailsKilometers";
import CarDetailsPayment from "../../components/CarDetailsPayment/CarDetailsPayment";
import CarDetailsContact from "../../components/CarDetailsContact/CarDetailsContact";
import Fotter from "../../components/Fotter/Fotter";

const CarDetails = () => {
  const { id } = useParams();
  const { getCarById, selectCar, loading, error } = useRentiva();
  
  const [car, setCar] = React.useState(null);
  const [carLoading, setCarLoading] = React.useState(true);
  const [carError, setCarError] = React.useState(null);

  React.useEffect(() => {
    const fetchCar = async () => {
      try {
        setCarLoading(true);
        setCarError(null);
        const carData = await getCarById(id);
        setCar(carData);
        
        if (carData) {
          selectCar(id);
        }
      } catch (err) {
        console.error('Error fetching car details:', err);
        setCarError('Nie udało się załadować szczegółów samochodu');
      } finally {
        setCarLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  if (loading || carLoading) {
    return (
      <div className="carDetails">
        <div className="carDetails__container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  if (error || carError) {
    return (
      <div className="carDetails">
        <div className="carDetails__container">
          <h1>Błąd: {error || carError}</h1>
        </div>
      </div>
    );
  }
  if (!car) {
    return (
      <div className="carDetails">
        <div className="carDetails__container">
          <h1>Samochód nie został znaleziony</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="carDetails">
        {/* <Navbar /> */}

        <div className="carDetailsContainer">
          
            <div className="carDetailsContainerContainerDiv">

                {/* Top Part */}
                <div className="carDetailsContainerContainerDivTop">
                    <div className="carDetailsContainerContainerDivTopContainer">

                        <div className="carDetailsContainerContainerDivTopContainerLeft">
                            <CarDetailsSpecs car={car} />
                        </div>

                        <div className="carDetailsContainerContainerDivTopContainerRight">
                            <CarDetailsHero car={car} />
                        </div>

                    </div>
                </div>

            </div>
        </div>        
        
        <CarDetailsInfo car={car} />

        <CarDetailsTariff car={car} />

        <CarDetailsKilometers car={car} />

        <CarDetailsPayment car={car} />

        <CarDetailsContact car={car} />

        <Fotter />
    </div>
  );
};

export default CarDetails;
