import React from "react";
import "./ourCollectionList.css";
import assets from "../../assets/assets";
import { PiEngineBold } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import OurCollectionCar from "./OurCollectionCar";
import carsData from "../../assets/carsData.json";

const OurCollectionList = () => {
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
          <div className="ourCollectionListContainerBottomContainer">

            {carsData.map(car => (
              <OurCollectionCar
                key={car.id}
                id={car.id}
                image={assets[car.images[0]]}
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
