import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiEngineBold } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import ReservationModal from "../ReservationModal/ReservationModal";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const handleClick = () => {
    navigate(`/car/${car.id}`);
  };

  const handleBookCar = (e) => {
    e.stopPropagation();
    setIsReservationModalOpen(true);
  };

  const handleReservationSubmit = (reservation) => {
    setReservationData(reservation);
    setShowSuccessNotification(true);
    console.log("Reservation created:", reservation);
  };

  const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;

  return (
    <div className="carCard" onClick={handleClick} tabIndex={0} style={{ cursor: "pointer" }}>
      <div className="carCardContainer">
        {/* Top Part */}
        <div className="carCardContainerTop">
          <div className="carCardContainerTopContainer">
            <img src={displayImage} alt={car.title} className="carCardContainerTopContainerImage" />
          </div>
        </div>
        {/* Bottom Part */}
        <div className="carCardContainerBottom">
          <div className="carCardContainerBottomContainer">
            <div className="carCardContainerBottomContainerTitle">
              {" "}
              <p className="carCardContainerBottomContainerTitleText bai-jamjuree-regular">{car.title}</p>
            </div>
            <div className="carCardContainerBottomContainerSpecs">
              <div className="carCardContainerBottomContainerSpecsContainer">
                <div className="carCardContainerBottomContainerSpecsContainerOne">
                  <div className="carCardContainerBottomContainerSpecsContainerOneIcon">
                    <PiEngineBold />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerOneValue">
                    {" "}
                    <p className="carCardContainerBottomContainerSpecsContainerOneValueText bai-jamjuree-regular">{car.engine}</p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerSpecsContainerTwo">
                  <div className="carCardContainerBottomContainerSpecsContainerTwoIcon">
                    <IoMdSpeedometer />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerTwoValue">
                    {" "}
                    <p className="carCardContainerBottomContainerSpecsContainerTwoValueText bai-jamjuree-regular">{car.power}</p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerSpecsContainerThree">
                  <div className="carCardContainerBottomContainerSpecsContainerThreeIcon">
                    <MdOutlineTimer />
                  </div>
                  <div className="carCardContainerBottomContainerSpecsContainerThreeValue">
                    {" "}
                    <p className="carCardContainerBottomContainerSpecsContainerThreeValueText bai-jamjuree-regular">{car.acceleration}</p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="carCardContainerBottomContainerCta" onClick={handleBookCar}>
              <div className="carCardContainerBottomContainerCtaContainer">
                <div className="carCardContainerBottomContainerCtaContainerLeft">
                  <div className="carCardContainerBottomContainerCtaContainerLeftContainer">
                    <p className="carCardContainerBottomContainerCtaContainerLeftContainerText">Book Car</p>
                  </div>
                </div>
                <div className="carCardContainerBottomContainerCtaContainerRight">
                  <div className="carCardContainerBottomContainerCtaContainerRightContainer">
                    <GoArrowRight className="carCardContainerBottomContainerCtaContainerRightContainerIcon" />
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        car={car}
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onSubmit={handleReservationSubmit}
      />

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
        reservationId={reservationData?.id}
        carName={car.title}
      />
    </div>
  );
};

export default CarCard;
