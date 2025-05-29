import React from "react";
import "./ourCollectionList.css";
import assets from "../../assets/assets";
import { PiEngineBold } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import CarCard from "../Car/CarCard";
import { useRentiva } from "../../Context/context.jsx";

const OurCollectionList = () => {
  const { cars, loading, error } = useRentiva();

  if (loading) {
    return (
      <div className="ourCollectionList">
        <div className="ourCollectionListContainer">
          <div className="ourCollectionListContainerBottom">
            <div className="ourCollectionListContainerBottomContainer">
              <p style={{ color: '#fff', textAlign: 'center', width: '100%' }}>Loading cars...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ourCollectionList">
        <div className="ourCollectionListContainer">
          <div className="ourCollectionListContainerBottom">
            <div className="ourCollectionListContainerBottomContainer">
              <p style={{ color: '#fff', textAlign: 'center', width: '100%' }}>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ourCollectionList">
      <div className="ourCollectionListContainer">
        {/* Top Part */}
        <div className="ourCollectionListContainerTop">
          <div className="ourCollectionListContainerTopContainer">
            {/* Top Part */}
            <div className="ourCollectionListContainerTopContainerTop">
              <div className="ourCollectionListContainerTopContainerTopContainer">
                {/* Element */}
                <div className="ourCollectionListContainerTopContainerTopContainerElement">
                  <div className="ourCollectionListContainerTopContainerTopContainerElementContainer">
                    {/* Image */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImage">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainer">
                        <img
                          src={assets.OurCollectionListImageOne}
                          alt=""
                          className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainerImage"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerText">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainer">
                        <p className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainerText bai-jamjuree-regular">
                          Sports
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerTopContainerElement">
                  <div className="ourCollectionListContainerTopContainerTopContainerElementContainer">
                    {/* Image */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImage">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainer">
                        <img
                          src={assets.roma}
                          alt=""
                          className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainerImage"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerText">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainer">
                        <p className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainerText">Convertible</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerTopContainerElement">
                  <div className="ourCollectionListContainerTopContainerTopContainerElementContainer">
                    {/* Image */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImage">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainer">
                        <img
                          src={assets.OurCollectionListImageThree}
                          alt=""
                          className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainerImage"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerText">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainer">
                        <p className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainerText">Luxury</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerTopContainerElement">
                  <div className="ourCollectionListContainerTopContainerTopContainerElementContainer">
                    {/* Image */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImage">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainer">
                        <img
                          src={assets.OurCollectionListImageFour}
                          alt=""
                          className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainerImage"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerText">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainer">
                        <p className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainerText">Suv</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerTopContainerElement">
                  <div className="ourCollectionListContainerTopContainerTopContainerElementContainer">
                    {/* Image */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImage">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainer">
                        <img
                          src={assets.OurCollectionListImageFive}
                          alt=""
                          className="ourCollectionListContainerTopContainerTopContainerElementContainerImageContainerImage"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="ourCollectionListContainerTopContainerTopContainerElementContainerText">
                      <div className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainer">
                        <p className="ourCollectionListContainerTopContainerTopContainerElementContainerTextContainerText">Electric</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Part */}
            <div className="ourCollectionListContainerTopContainerBottom">
              <div className="ourCollectionListContainerTopContainerBottomContainer">
                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">All</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Bugatti</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Lamborghini</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Ferrari</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">McLaren</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Rolls Royce</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Bentley</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">BMW</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Mercedes Benz</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Corvette</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Porsche</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Aston Martin</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Range Rover</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Cadillac</p>
                  </div>
                </div>

                {/* Element */}
                <div className="ourCollectionListContainerTopContainerBottomContainerElement">
                  <div className="ourCollectionListContainerTopContainerBottomContainerElementContainer">
                    <p className="ourCollectionListContainerTopContainerBottomContainerElementContainerText">Tesla</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="ourCollectionListContainerBottom">
          <div className="ourCollectionListContainerBottomContainer">            {cars.map(car => (
              <CarCard
                key={car.id}
                id={car.id}
                images={car.images}
                title={car.title}
                engine={car.engine}
                power={car.power}
                acceleration={car.acceleration}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCollectionList;
