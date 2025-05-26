import React from "react";
import { useParams } from "react-router-dom";
import "./CarDetails.css";
import carsData from "../../assets/carsData.json";
import Navbar from "../../components/Navbar/Navbar";
import CarDetailsHero from "../../components/CarDetailsHero/CarDetailsHero";
import CarDetailsSpecs from "../../components/CarDetailsSpecs/CarDetailsSpecs";

const CarDetails = () => {
  const { id } = useParams();
  const car = carsData.find(car => car.id === id);

  if (!car) {
    return (
      <div className="carDetails">
        <div className="carDetails__container">
          <h1>Car not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="carDetails">
        <Navbar />

        <div className="carDetailsContainer">
            <div className="carDetailsContainerContainerDiv">

                {/* Top Part */}
                <div className="carDetailsContainerContainerDivTop">
                    <div className="carDetailsContainerContainerDivTopContainer">

                        {/* Left Part - Specifications */}
                        <div className="carDetailsContainerContainerDivTopContainerLeft">
                            <CarDetailsSpecs car={car} />
                        </div>

                        {/* Right Part - Hero Section */}
                        <div className="carDetailsContainerContainerDivTopContainerRight">
                            <CarDetailsHero car={car} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default CarDetails;
