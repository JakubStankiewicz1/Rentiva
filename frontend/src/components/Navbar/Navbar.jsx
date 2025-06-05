import React, { useState } from 'react';
import "./navbar.css";
import { IoIosArrowDown } from "react-icons/io";

import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='navbar'>
        <div className="navbarContainer">

            {/* Left Part */}
            <div className="navbarContainerLeft">
                <div className="navbarContainerLeftContainer">
                    <div className="navbarContainerLeftContainerOne">
                        <NavLink to="/" className="navbarContainerLeftContainerOneContainer">
                            <p className="navbarContainerLeftContainerOneContainerText bai-jamjuree-regular">
                                Rentiva
                            </p>
                        </NavLink>
                    </div>

                    <div className="navbarContainerLeftContainerTwo">
                        <div className="navbarContainerLeftContainerTwoContainer">
                            <p className="navbarContainerLeftContainerTwoContainerText bai-jamjuree-regular">
                                The cars your want
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Right Part */}
            <div className="navbarContainerRight">
                <div className="navbarContainerRightContainer">

                    <div className="navbarContainerRightContainerOne"
                         onMouseEnter={() => setIsDropdownOpen(true)}
                         onMouseLeave={() => setIsDropdownOpen(false)}>
                        <div className="navbarContainerRightContainerOneContainer">
                            <div className="navbarContainerRightContainerOneContainerOne">
                                <p className="navbarContainerRightContainerOneContainerOneText bai-jamjuree-regular">
                                    Usługi dodatkowe
                                </p>
                            </div>

                            <div className="navbarContainerRightContainerOneContainerTwo">
                                <IoIosArrowDown className={`navbarContainerRightContainerOneContainerTwoIcon ${isDropdownOpen ? 'rotated' : ''}`} />
                            </div>
                        </div>
                        
                        {/* Dropdown Menu */}
                        <div className={`navbarContainerRightContainerOneDropdown ${isDropdownOpen ? 'navbarContainerRightContainerOneDropdownOpen' : ''}`}>
                            <div className="navbarContainerRightContainerOneDropdownItem">
                                <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Ubezpieczenie</p>
                            </div>
                            <NavLink className="navbarContainerRightContainerOneDropdownItem">
                                <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Dowóz samochodów</p>
                            </NavLink>
                            <div className="navbarContainerRightContainerOneDropdownItem">
                                <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Dodatkowy kierowca</p>
                            </div>
                            <div className="navbarContainerRightContainerOneDropdownItem">
                                <p className="navbarContainerRightContainerOneDropdownItemText bai-jamjuree-regular">Wynajem z kierowcą</p>
                            </div>
                        </div>
                    </div>

                    <div className="navbarContainerRightContainerTwo">
                        <NavLink to="/cooperation" className="navbarContainerRightContainerTwoContainer">
                            <p className="navbarContainerRightContainerTwoContainerText bai-jamjuree-regular">
                                Współpraca
                            </p>
                        </NavLink>
                    </div>
                    
                    <div className="navbarContainerRightContainerFour">
                        <NavLink to='/contact-us' className="navbarContainerRightContainerFourContainer">
                            <p className="navbarContainerRightContainerFourContainerText bai-jamjuree-regular">
                                Contact Us
                            </p>
                        </NavLink>
                    </div>

                    <div className="navbarContainerRightContainerFive">
                        <div className="navbarContainerRightContainerFiveContainer">
                            <div className="navbarContainerRightContainerFiveContainerButton">
                                <NavLink to="/collection" className="navbarContainerRightContainerFiveContainerButtonContainer">
                                    <p className="navbarContainerRightContainerFiveContainerButtonContainerText bai-jamjuree-regular">
                                        Our collection
                                    </p>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar