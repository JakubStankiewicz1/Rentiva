import React from "react";
import { useNavigate } from "react-router-dom";
import { PiEngineBold } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import "./CarCard.css";

const CarCard = ({ id, image, images, title, engine, power, acceleration }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/car/${id}`);
  };

  const displayImage = images && images.length > 0 ? images[0] : image;

  return (
    <div className="carCard" onClick={handleClick} tabIndex={0} style={{ cursor: "pointer" }}>
      <div className="carCardContainer">
        {/* Top Part */}
        <div className="carCardContainerTop">
          <div className="carCardContainerTopContainer">
            <img src={displayImage} alt={title} className="carCardContainerTopContainerImage" />
          </div>
        </div>
        {/* Bottom Part */}
        <div className="carCardContainerBottom">
          <div className="carCardContainerBottomContainer">
            <div className="carCardContainerBottomContainerTitle">
              <p className="carCardContainerBottomContainerTitleText bai-jamjuree-regular">
                {title}
              </p>
            </div>
            <div className="carCardContainerBottomContainerSpecs">
              <div className="carCardContainerBottomContainerSpecsContainer">
                <div className="carCardContainerBottomContainerSpecsContainerOne">
                  <div className="carCardContainerBottomContainerSpecsContainerOneIcon">
                    <PiEngineBold />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerOneValue">
                    <p className="carCardContainerBottomContainerSpecsContainerOneValueText bai-jamjuree-regular">
                      {engine}
                    </p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerSpecsContainerTwo">
                  <div className="carCardContainerBottomContainerSpecsContainerTwoIcon">
                    <IoMdSpeedometer />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerTwoValue">
                    <p className="carCardContainerBottomContainerSpecsContainerTwoValueText bai-jamjuree-regular">
                      {power}
                    </p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerSpecsContainerThree">
                  <div className="carCardContainerBottomContainerSpecsContainerThreeIcon">
                    <MdOutlineTimer />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerThreeValue">
                    <p className="carCardContainerBottomContainerSpecsContainerThreeValueText bai-jamjuree-regular">
                      {acceleration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carCardContainerBottomContainerCta">
              <div className="carCardContainerBottomContainerCtaContainer">
                <div className="carCardContainerBottomContainerCtaContainerLeft">
                  <div className="carCardContainerBottomContainerCtaContainerLeftContainer">
                    <p className="carCardContainerBottomContainerCtaContainerLeftContainerText">
                      Book Car
                    </p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerCtaContainerRight">
                  <div className="carCardContainerBottomContainerCtaContainerRightContainer">
                    <GoArrowRight className="carCardContainerBottomContainerCtaContainerRightContainerIcon" />
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

export default CarCard;