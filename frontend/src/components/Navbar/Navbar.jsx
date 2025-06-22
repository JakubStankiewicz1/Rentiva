import React, { useState, useEffect } from "react";
import "./navbar.css";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className={`navbar ${isMobileMenuOpen ? 'mobileMenuActive' : ''}`}>
        <div className="navbarContainer">
          {/* Left Part */}
          <div className="navbarContainerLeft">
            <div className="navbarContainerLeftContainer">
              <div className="navbarContainerLeftContainerOne">
                <NavLink
                  to="/"
                  className="navbarContainerLeftContainerOneContainer"
                  onClick={handleNavigation}
                >
                  <p className="navbarContainerLeftContainerOneContainerText bai-jamjuree-regular">
                    Rentiva
                  </p>
                </NavLink>
              </div>
              <div className="navbarContainerLeftContainerTwo">
                <div className="navbarContainerLeftContainerTwoContainer">
                  <p className="navbarContainerLeftContainerTwoContainerText bai-jamjuree-regular">
                    The cars you want
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Part */}
          <div className="navbarContainerRight">
            <div className="navbarContainerRightContainer">
              <div
                className="navbarContainerRightContainerOne"
                onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
                onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
              >
                <div className="navbarContainerRightContainerOneContainer">
                  <div className="navbarContainerRightContainerOneContainerOne">
                    <p className="navbarContainerRightContainerOneContainerOneText bai-jamjuree-regular">
                      Additional Services
                    </p>
                  </div>
                  <div className="navbarContainerRightContainerOneContainerTwo">
                    <IoIosArrowDown
                      className={`navbarContainerRightContainerOneContainerTwoIcon ${
                        isDropdownOpen ? "rotated" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  className={`navbarContainerRightContainerOneDropdown ${
                    isDropdownOpen ? "navbarContainerRightContainerOneDropdownOpen" : ""
                  }`}
                >
                  <NavLink
                    to="/car-delivery"
                    className="navbarContainerRightContainerOneDropdownItem"
                    onClick={handleNavigation}
                  >
                    <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">
                      Car Delivery
                    </p>
                  </NavLink>
                </div>
              </div>

              <div className="navbarContainerRightContainerTwo">
                <NavLink
                  to="/cooperation"
                  className="navbarContainerRightContainerTwoContainer"
                  onClick={handleNavigation}
                >
                  <p className="navbarContainerRightContainerTwoContainerText bai-jamjuree-regular">
                    Partnership
                  </p>
                </NavLink>
              </div>

              <div className="navbarContainerRightContainerFour">
                <NavLink
                  to="/contact-us"
                  className="navbarContainerRightContainerFourContainer"
                  onClick={handleNavigation}
                >
                  <p className="navbarContainerRightContainerFourContainerText bai-jamjuree-regular">
                    Contact Us
                  </p>
                </NavLink>
              </div>

              <div className="navbarContainerRightContainerFive">
                <div className="navbarContainerRightContainerFiveContainer">
                  <div className="navbarContainerRightContainerFiveContainerButton">
                    <NavLink
                      to="/collection"
                      className="navbarContainerRightContainerFiveContainerButtonContainer"
                      onClick={handleNavigation}
                    >
                      <p className="navbarContainerRightContainerFiveContainerButtonContainerText bai-jamjuree-regular">
                        Our collection
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>


          

          {/* Mobile Hamburger Menu */}
          <div className="navbarContainerMobile">
            <div
              className={`hamburgerMenu ${
                isMobileMenuOpen ? "hamburgerMenuOpen" : ""
              }`}
              onClick={toggleMobileMenu}
            >
              <span className="hamburgerLine hamburgerLineTop"></span>
              <span className="hamburgerLine hamburgerLineMiddle"></span>
              <span className="hamburgerLine hamburgerLineBottom"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobileMenuOverlay ${
          isMobileMenuOpen ? "mobileMenuOverlayOpen" : ""
        }`}
      >
        <div className="mobileMenuContainer">
          <div className="mobileMenuHeader">
            <h2 className="mobileMenuTitle bai-jamjuree-regular">Menu</h2>
          </div>

          <div className="mobileMenuContent">
            <div className="mobileMenuSection">
              {/* <div className="mobileMenuSectionTitle">
                <p className="mobileMenuSectionTitleText bai-jamjuree-regular">
                  Services
                </p>
              </div> */}
              <NavLink
                to="/car-delivery"
                className="mobileMenuItem"
                onClick={handleNavigation}
              >
                <p className="mobileMenuItemText bai-jamjuree-regular">
                  Car Delivery
                </p>
              </NavLink>
            </div>

            <NavLink
              to="/cooperation"
              className="mobileMenuItem"
              onClick={handleNavigation}
            >
              <p className="mobileMenuItemText bai-jamjuree-regular">
                Partnership
              </p>
            </NavLink>

            <NavLink
              to="/contact-us"
              className="mobileMenuItem"
              onClick={handleNavigation}
            >
              <p className="mobileMenuItemText bai-jamjuree-regular">
                Contact Us
              </p>
            </NavLink>

            <div className="mobileMenuCTA">
              <NavLink
                to="/collection"
                className="mobileMenuCTAButton"
                onClick={handleNavigation}
              >
                <p className="mobileMenuCTAButtonText bai-jamjuree-regular">
                  Our Collection
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
