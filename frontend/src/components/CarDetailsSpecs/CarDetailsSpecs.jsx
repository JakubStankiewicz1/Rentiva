import React from "react";
import "./CarDetailsSpecs.css";
import { IoMdSpeedometer } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import { RiTimerLine } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { GiCarWheel } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";

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

          {/* 2 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <IoMdSpeedometer className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.power}km
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



                   {/* 1 */}
          <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <PiEngineBold className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.engine}
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
            </div>            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.acceleration}s
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
            </div>            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                gross 7day
              </p>
            </div>
          </div>


          {/* <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div> */}













          
          {/* 5 - Max Speed */}
          {/* <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <MdSpeed className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.maxSpeed} km/h
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                max speed
              </p>
            </div>
          </div>
          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div> */}

          {/* 6 - Fuel Type */}
          {/* <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <BsFuelPump className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.fuelType}
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                fuel type
              </p>
            </div>
          </div>
          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div> */}

          {/* 7 - Transmission */}
          {/* <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <TbManualGearbox className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.transmission}
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                transmission
              </p>
            </div>
          </div>
          <div className="carDetailsSpecsContainerDivider">
            <div className="carDetailsSpecsContainerDividerLine" />
          </div> */}

          {/* 8 - Drivetrain */}
          {/* <div className="carDetailsSpecsContainerListItem">
            <div className="carDetailsSpecsContainerListItemIcon">
              <GiCarWheel className="carDetailsSpecsContainerIcon" />
            </div>
            <div className="carDetailsSpecsContainerListItemValue">
              <p className="carDetailsSpecsContainerListItemValueText bai-jamjuree-regular">
                {car.drivetrain}
              </p>
            </div>
            <div className="carDetailsSpecsContainerListItemLabel">
              <p className="carDetailsSpecsContainerListItemLabelText bai-jamjuree-regular">
                drivetrain
              </p>
            </div>
          </div> */}



        </div>

      </div>
    </div>
  );
};

export default CarDetailsSpecs;
