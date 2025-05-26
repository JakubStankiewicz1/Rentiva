import React from "react";
import { useNavigate } from "react-router-dom";
import { PiEngineBold } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import "./OurCollectionCar.css";

const OurCollectionCar = ({ id, image, images, title, engine, power, acceleration }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/car/${id}`);
  };

  // Jeśli przekazano images, użyj images[0], jeśli nie, użyj image
  const displayImage = images && images.length > 0 ? images[0] : image;

  return (
    <div className="ourCollectionCar" onClick={handleClick} tabIndex={0} style={{ cursor: "pointer" }}>
      <div className="ourCollectionCar__container">
        {/* Top Part */}
        <div className="ourCollectionCar__top">
          <div className="ourCollectionCar__top-container">
            <img src={displayImage} alt={title} className="ourCollectionCar__image" />
          </div>
        </div>
        {/* Bottom Part */}
        <div className="ourCollectionCar__bottom">
          <div className="ourCollectionCar__bottom-container">
            <div className="ourCollectionCar__title">
              <p className="ourCollectionCar__title-text bai-jamjuree-regular">
                {title}
              </p>
            </div>
            <div className="ourCollectionCar__specs">
              <div className="ourCollectionCar__specs-container">
                <div className="ourCollectionCar__spec">
                  <div className="ourCollectionCar__spec-icon">
                    <PiEngineBold />
                  </div>
                  <div className="ourCollectionCar__spec-value">
                    <p className="ourCollectionCar__spec-value-text bai-jamjuree-regular">
                      {engine}
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCar__spec">
                  <div className="ourCollectionCar__spec-icon">
                    <IoMdSpeedometer />
                  </div>
                  <div className="ourCollectionCar__spec-value">
                    <p className="ourCollectionCar__spec-value-text bai-jamjuree-regular">
                      {power}
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCar__spec">
                  <div className="ourCollectionCar__spec-icon">
                    <MdOutlineTimer />
                  </div>
                  <div className="ourCollectionCar__spec-value">
                    <p className="ourCollectionCar__spec-value-text bai-jamjuree-regular">
                      {acceleration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ourCollectionCar__cta">
              <div className="ourCollectionCar__cta-container">
                <div className="ourCollectionCar__cta-left">
                  <div className="ourCollectionCar__cta-left-container">
                    <p className="ourCollectionCar__cta-left-text">
                      Book Car
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCar__cta-right">
                  <div className="ourCollectionCar__cta-right-container">
                    <GoArrowRight className="ourCollectionCar__cta-right-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCollectionCar;
