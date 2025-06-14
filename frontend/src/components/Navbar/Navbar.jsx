import React, { useState } from "react";
import "./navbar.css";
import { IoIosArrowDown } from "react-icons/io";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavigation = () => {
    // Close dropdown when navigating
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        {/* Left Part */}
        <div className="navbarContainerLeft">
          <div className="navbarContainerLeftContainer">
            {" "}
            <div className="navbarContainerLeftContainerOne">
              <NavLink to="/" className="navbarContainerLeftContainerOneContainer" onClick={handleNavigation}>
                <p className="navbarContainerLeftContainerOneContainerText bai-jamjuree-regular">Rentiva</p>
              </NavLink>
            </div>
            <div className="navbarContainerLeftContainerTwo">
              <div className="navbarContainerLeftContainerTwoContainer">
                <p className="navbarContainerLeftContainerTwoContainerText bai-jamjuree-regular">The cars your want</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="navbarContainerRight">
          <div className="navbarContainerRightContainer">
            <div
              className="navbarContainerRightContainerOne"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >





              <div className="navbarContainerRightContainerOneContainer">
                {/* {" "} */}
                <div className="navbarContainerRightContainerOneContainerOne">
                  <p className="navbarContainerRightContainerOneContainerOneText bai-jamjuree-regular">Additional Services</p>
                </div>
                <div className="navbarContainerRightContainerOneContainerTwo">
                  <IoIosArrowDown className={`navbarContainerRightContainerOneContainerTwoIcon ${isDropdownOpen ? "rotated" : ""}`} />
                </div>
              </div>












              {/* Dropdown Menu */}
              <div className={`navbarContainerRightContainerOneDropdown ${isDropdownOpen ? "navbarContainerRightContainerOneDropdownOpen" : ""}`}>
                {/* <div className="navbarContainerRightContainerOneDropdownItem">
                  <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Insurance</p>
                </div>{" "} */}
                <NavLink to="/car-delivery" className="navbarContainerRightContainerOneDropdownItem" onClick={handleNavigation}>
                  <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Car Delivery</p>
                </NavLink>
                {/* <div className="navbarContainerRightContainerOneDropdownItem">
                  <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Additional Driver</p>
                </div> */}
                {/* <div className="navbarContainerRightContainerOneDropdownItem">
                  <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Chauffeur Service</p>
                </div> */}
              </div>
            </div>{" "}
            <div className="navbarContainerRightContainerTwo">
              <NavLink to="/cooperation" className="navbarContainerRightContainerTwoContainer" onClick={handleNavigation}>
                <p className="navbarContainerRightContainerTwoContainerText bai-jamjuree-regular">Partnership</p>
              </NavLink>
            </div>
            <div className="navbarContainerRightContainerFour">
              <NavLink to="/contact-us" className="navbarContainerRightContainerFourContainer" onClick={handleNavigation}>
                <p className="navbarContainerRightContainerFourContainerText bai-jamjuree-regular">Contact Us</p>
              </NavLink>
            </div>
            <div className="navbarContainerRightContainerFive">
              <div className="navbarContainerRightContainerFiveContainer">
                {" "}
                <div className="navbarContainerRightContainerFiveContainerButton">
                  <NavLink to="/collection" className="navbarContainerRightContainerFiveContainerButtonContainer" onClick={handleNavigation}>
                    <p className="navbarContainerRightContainerFiveContainerButtonContainerText bai-jamjuree-regular">Our collection</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
