import React from 'react';
import "./homeHero.css";
import assets from '../../assets/assets';
import { GoArrowRight } from "react-icons/go";

const HomeHero = () => {

    const cars = [
        {
            image: assets.HomeHeroImageOne,
            brand: "Lamborghini",
            model: "Huracan",
            power: "610",
            acceleration: "3.2",
        }
    ]

  return (
    <div className='homeHero'>
        <div className="homeHeroContainer">

            {/* Image */}
            <div className="homeHeroContainerImage">
                <div className="homeHeroContainerImageContainer">
                    <img src={assets.HomeHeroImageOne} alt="" className='homeHeroContainerImageContainerImage' />
                    <div className="homeHeroContainerImageContainerOverlay"></div>
                </div>
            </div>


            {/* Info */}
            <div className="homeHeroContainerInfo">
                <div className="homeHeroContainerInfoContainer">
                    {/* Left Part */}
                    <div className="homeHeroContainerInfoContainerLeft">
                        <div className="homeHeroContainerInfoContainerLeftContainer">
                            <div className="homeHeroContainerInfoContainerLeftContainerTop">
                                <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainer">
                                    <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerOne">
                                        <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerOneDiv" />
                                    </div>

                                    <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerTwo">
                                        <p className="homeHeroContainerInfoContainerLeftContainerTopCOntainerTwoText">
                                            luxury & sport car rental
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="homeHeroContainerInfoContainerLeftContainerMiddle">
                                <div className="homeHeroContainerInfoContainerLeftContainerMiddleContainer">
                                    <p className="homeHeroContainerInfoContainerLeftContainerMiddleContainerText">
                                        Just Cars Premium
                                    </p>
                                </div>
                            </div>

                            <div className="homeHeroContainerInfoContainerLeftContainerBottom">
                                <div className="homeHeroContainerInfoContainerLeftContainerBottomContainer">
                                    {/* Left Part */}
                                    <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeft">
                                        <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeftContainer">
                                            <p className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeftContainerText">
                                                Discover car collection
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Part */}
                                    <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerRight">
                                        <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerRightContainer">
                                            <GoArrowRight className='homeHeroContainerInfoContainerLeftContainerBottomContainerRightContainerIcon' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Part */}
                    <div className="homeHeroContainerInfoContainerRight">
                        <div className="homeHeroContainerInfoContainerRightContainer">
                            <div className="homeHeroContainerInfoContainerRightContainerContainer">
                                {/* Top Part */}
                                <div className="homeHeroContainerInfoContainerRightContainerContainerTop">
                                    <div className="homeHeroContainerInfoContainerRightContainerContainerTopContainer">
                                        <p className="homeHeroContainerInfoContainerRightContainerContainerTopContainerTextOne">
                                            Lamborghini
                                        </p>

                                        <p className="homeHeroContainerInfoContainerRightContainerContainerTopContainerTextTwo">
                                            huracan
                                        </p>
                                    </div>
                                </div>

                                {/* Middle Part */}
                                <div className="homeHeroContainerInfoContainerRightContainerContainerMiddle">
                                    <div className="homeHeroContainerInfoContainerRightContainerContainerMiddleDiv" />
                                </div>

                                {/* Bottom Part */}
                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottom">
                                    <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainer">
                                        <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOne">
                                            <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainer">
                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerOne">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerOneText">
                                                        610hp
                                                    </p>
                                                </div>

                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerTwo">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerTwoText">
                                                        power
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwo">
                                            <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainer">
                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerOne">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerOneText">
                                                        2.9
                                                    </p>
                                                </div>

                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerTwo">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerTwoText">
                                                        0-100 km/h
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default HomeHero