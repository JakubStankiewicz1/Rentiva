import React from "react";
import "./CarDetailsSpecs.css";
import { IoMdSpeedometer } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import { RiTimerLine } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";

const CarDetailsSpecs = ({ car }) => {
  const specs = [
    {
      icon: IoMdSpeedometer,
      value: car.engine,
      label: "power"
    },
    {
      icon: PiEngineBold,
      value: car.power,
      label: "engine"
    },
    {
      icon: RiTimerLine,
      value: car.acceleration,
      label: "0-100km/h"
    },
    {
      icon: CiDollar,
      value: `${car.grossPrice}zł`,
      label: "gross 7day"
    }
  ];

  return (
    <div className="car-details-specs">
      <div className="car-details-specs__container">
        
        <div className="car-details-specs__title">
          <h1 className="car-details-specs__title-text bai-jamjuree-regular">
            {car.title}
          </h1>
        </div>

        <div className="car-details-specs__list">
          {specs.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div key={index}>
                <div className="car-details-specs__item">
                  <div className="car-details-specs__item-icon">
                    <IconComponent className="car-details-specs__icon" />
                  </div>
                  <div className="car-details-specs__item-value">
                    <p className="car-details-specs__value-text bai-jamjuree-regular">
                      {spec.value}
                    </p>
                  </div>
                  <div className="car-details-specs__item-label">
                    <p className="car-details-specs__label-text bai-jamjuree-regular">
                      {spec.label}
                    </p>
                  </div>
                </div>
                {index < specs.length - 1 && (
                  <div className="car-details-specs__divider">
                    <div className="car-details-specs__divider-line" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CarDetailsSpecs;
