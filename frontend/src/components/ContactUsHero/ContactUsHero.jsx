import React from 'react';
import "./contactUsHero.css";
import { FaArrowDownLong } from "react-icons/fa6";
import assets from '../../assets/assets';

const ContactUsHero = () => {
  return (
    <div className='contactUsHero'>
        <div className="contactUsHeroContainer">

            {/* Image */}
            <div className="contactUsHeroContainerImage">
                <div className="contactUsHeroContainerImageContainer">
                    <img src={assets.HomeHeroImageOne} alt="" className='contactUsHeroContainerImageContainerImage' />
                    <div className="contactUsHeroContainerImageOverlay" />
                </div>
            </div>


            {/* Info */}
            <div className="contactUsHeroContainerInfo">
                <div className="contactUsHeroContainerInfoContainer">

                    {/* Top Part */}
                    <div className="contactUsHeroContainerInfoContainerTop">
                        <div className="contactUsHeroContainerInfoContainerTopContainer">
                            <div className="contactUsHeroContainerInfoContainerTopContainerOne">
                                <div className="contactUsHeroContainerInfoContainerTopContainerOneDiv" />
                            </div>
                            
                            <div className="contactUsHeroContainerInfoContainerTopContainerTwo">
                                <div className="contactUsHeroContainerInfoContainerTopContainerTwoContainer">
                                    <p className="contactUsHeroContainerInfoContainerTopContainerTwoContainerText bai-jamjuree-regular">
                                        Luxury & Sport Car Rental
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Part */}
                    <div className="contactUsHeroContainerInfoContainerMiddle">
                        <div className="contactUsHeroContainerInfoContainerMiddleContainer">
                            <p className="contactUsHeroContainerInfoContainerMiddleContainerText bai-jamjuree-regular">
                                Contact Us
                            </p>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="contactUsHeroContainerInfoContainerBottom">
                        <div className="contactUsHeroContainerInfoContainerBottomContainer">
                            <div className="contactUsHeroContainerInfoContainerBottomContainerButton">
                                <div className="contactUsHeroContainerInfoContainerBottomContainerButtonContainer">
                                    <FaArrowDownLong className='contactUsHeroContainerInfoContainerBottomContainerButtonContainerIcon' />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default ContactUsHero