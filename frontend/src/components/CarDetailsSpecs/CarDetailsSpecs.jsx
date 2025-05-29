import React from "react";
import "./CarDetailsSpecs.css";
import { IoMdSpeedometer } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import { RiTimerLine } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";

const CarDetailsSpecs = ({ car }) => {
  return (
    <div className="carDetailsSpecs">
      <div className="carDetailsSpecsContainer">

        {/* Top */}
        <div className="carDetailsSpecsContainerTop">
          <p className="carDetailsSpecsContainerTopText bai-jamjuree-regular">
            {car.title}
          </p>
        </div>

        {/* List */}
        <div className="carDetailsSpecsContainerList">



          {/* 1 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <IoMdSpeedometer className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.engine}
              </p>
            </div>

            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                power
              </p>
            </div>
            
          </div>


          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div>


          {/* 2 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <PiEngineBold className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.power}
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                engine
              </p>
            </div>
          </div>
          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div>
          {/* 3 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <RiTimerLine className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.acceleration}
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                0-100km/h
              </p>
            </div>
          </div>
          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div>
          {/* 4 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <CiDollar className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.grossPrice}zł
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                gross 7day
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarDetailsSpecs;
