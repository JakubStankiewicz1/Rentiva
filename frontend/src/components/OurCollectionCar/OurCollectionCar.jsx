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

  const displayImage = images && images.length > 0 ? images[0] : image;

  return (
    <div className="ourCollectionCar" onClick={handleClick} tabIndex={0} style={{ cursor: "pointer" }}>
      <div className="ourCollectionCarContainer">
        {/* Top Part */}
        <div className="ourCollectionCarContainerTop">
          <div className="ourCollectionCarContainerTopContainer">
            <img src={displayImage} alt={title} className="ourCollectionCarContainerTopContainerImage" />
          </div>
        </div>
        {/* Bottom Part */}
        <div className="ourCollectionCarContainerBottom">
          <div className="ourCollectionCarContainerBottomContainer">
            <div className="ourCollectionCarContainerBottomContainerTitle">
              <p className="ourCollectionCarContainerBottomContainerTitleText bai-jamjuree-regular">
                {title}
              </p>
            </div>
            <div className="ourCollectionCarContainerBottomContainerSpecs">
              <div className="ourCollectionCarContainerBottomContainerSpecsContainer">
                <div className="ourCollectionCarContainerBottomContainerSpecsContainerOne">
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerOneIcon">
                    <PiEngineBold />
                  </div>
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerOneValue">
                    <p className="ourCollectionCarContainerBottomContainerSpecsContainerOneValueText bai-jamjuree-regular">
                      {engine}
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCarContainerBottomContainerSpecsContainerTwo">
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerTwoIcon">
                    <IoMdSpeedometer />
                  </div>
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerTwoValue">
                    <p className="ourCollectionCarContainerBottomContainerSpecsContainerTwoValueText bai-jamjuree-regular">
                      {power}
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCarContainerBottomContainerSpecsContainerThree">
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerThreeIcon">
                    <MdOutlineTimer />
                  </div>
                  <div className="ourCollectionCarContainerBottomContainerSpecsContainerThreeValue">
                    <p className="ourCollectionCarContainerBottomContainerSpecsContainerThreeValueText bai-jamjuree-regular">
                      {acceleration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ourCollectionCarContainerBottomContainerCta">
              <div className="ourCollectionCarContainerBottomContainerCtaContainer">
                <div className="ourCollectionCarContainerBottomContainerCtaContainerLeft">
                  <div className="ourCollectionCarContainerBottomContainerCtaContainerLeftContainer">
                    <p className="ourCollectionCarContainerBottomContainerCtaContainerLeftContainerText">
                      Book Car
                    </p>
                  </div>
                </div>
                <div className="ourCollectionCarContainerBottomContainerCtaContainerRight">
                  <div className="ourCollectionCarContainerBottomContainerCtaContainerRightContainer">
                    <GoArrowRight className="ourCollectionCarContainerBottomContainerCtaContainerRightContainerIcon" />
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
