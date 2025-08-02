import React, { useState } from "react";
import "./carDetailsInfo.css";
import { IoIosArrowRoundDown } from "react-icons/io";
import ReservationModal from "../ReservationModal/ReservationModal";
import SuccessNotification from "../SuccessNotification/SuccessNotification";

const CarDetailsInfo = ({ car }) => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  if (!car || !car.description) {
    return null;
  }

  const { description, images } = car;
  const leftImage = images && images.length > 2 ? images[2] : images[0];
  const rightImage = images && images.length > 3 ? images[3] : images[0];

  const handleBookCar = () => {
    console.log('=== BOOK CAR CLICKED ===');
    console.log('Car:', car);
    console.log('Opening reservation modal...');
    setIsReservationModalOpen(true);
  };

  const handleReservationSubmit = (reservation) => {
    console.log('=== RESERVATION SUBMITTED ===');
    console.log('Reservation data:', reservation);
    
    setReservationData(reservation);
    setShowSuccessNotification(true);
    console.log("Reservation created:", reservation);
  };

  const handleReservationError = (error) => {
    console.error('=== RESERVATION ERROR ===');
    console.error('Error:', error);
    // Możemy tu dodać dodatkową obsługę błędów
  };

  return (
    <div className="carDetailsInfo">
      <div className="carDetailsInfoContainer">
        
        {" "}
        {/* Top Part */}
        <div className="carDetailsInfoContainerTop">
          <div className="carDetailsInfoContainerTopContainer">
            <p className="carDetailsInfoContainerTopContainerText bai-jamjuree-regular">{description.title}</p>
          </div>
        </div>

        {/* Middle Part */}
        <div className="carDetailsInfoContainerMiddle">
          <div className="carDetailsInfoContainerMiddleContainer">

            {/* Left Part */}
            <div className="carDetailsInfoContainerMiddleContainerLeft">
              <div className="carDetailsInfoContainerMiddleContainerLeftContiner">
                {" "}
                <div className="carDetailsInfoContainerMiddleContainerLeftContinerTop">
                  <div className="carDetailsInfoContainerMiddleContainerLeftContinerTopContainer">
                    <img src={leftImage} alt={car.title} className="carDetailsInfoContainerMiddleContainerLeftContinerTopContainerImage" />
                  </div>
                </div>
                <div className="carDetailsInfoContainerMiddleContainerLeftContinerBottom">
                  <div className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainer">
                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextOne bai-jamjuree-regular">
                      {description.mainText}
                    </p>

                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextTwo bai-jamjuree-regular">
                      {description.performance}
                    </p>

                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextThree bai-jamjuree-regular">
                      {description.accelerationDetails}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Part */}
            <div className="carDetailsInfoContainerMiddleContainerRight">
              <div className="carDetailsInfoContainerMiddleContainerRightContainer">
                {" "}
                <div className="carDetailsInfoContainerMiddleContainerRightContainerTop">
                  <div className="carDetailsInfoContainerMiddleContainerRightContainerTopContainer">
                    <img src={rightImage} alt={car.title} className="carDetailsInfoContainerMiddleContainerRightContainerTopContainerImage" />
                  </div>
                </div>
                <div className="carDetailsInfoContainerMiddleContainerRightContainerBottom">
                  <div className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainer">
                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextOne bai-jamjuree-regular">
                      {description.interior}
                    </p>

                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextTwo bai-jamjuree-regular">
                      {description.craftsmanship}
                    </p>

                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextThree bai-jamjuree-regular">
                      {description.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}

        {/* Bottom Part */}
        <div className="carDetailsInfoContainerBottom">
          <div className="carDetailsInfoContainerBottomContainer">
            <div className="carDetailsInfoContainerBottomContainerButton" onClick={handleBookCar}>
              <div className="carDetailsInfoContainerBottomContainerButtonContainer">
                <p className="carDetailsInfoContainerBottomContainerButtonContainerText bai-jamjuree-regular">Book this car</p>
              </div>
            </div>

            <div className="carDetailsInfoContainerBottomContainerArrow" onClick={handleBookCar}>
              <div className="carDetailsInfoContainerBottomContainerArrowContainer">
                <IoIosArrowRoundDown className="carDetailsInfoContainerBottomContainerArrowContainerIcon" />
              </div>
            </div>
          </div>
        </div>

      </div>{" "}

      {/* Reservation Modal */}
      <ReservationModal
        car={car}
        isOpen={isReservationModalOpen}
        onClose={() => {
          console.log('Closing reservation modal');
          setIsReservationModalOpen(false);
        }}
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

export default CarDetailsInfo;
