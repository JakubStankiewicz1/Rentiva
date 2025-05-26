import React from 'react';
import "./ourCollectionHero.css";
import assets from '../../assets/assets';
import { FaArrowDownLong } from "react-icons/fa6";

const OurCollectionHero = () => {
  return (
    <div className='ourCollectionHero'>
        <div className="ourCollectionHeroContainer">

            {/* Image */}
            <div className="ourCollectionHeroContainerImage">
                <div className="ourCollectionHeroContainerImageContainer">
                    <img src={assets.OurCollectionImageTwo} alt="" className='ourCollectionHeroContainerImageContainerImage' />
                    <div className="ourCollectionHeroContainerImageOverlay"></div>
                </div>

                {/* Info przeniesione tutaj, aby było nad zdjęciem */}
                <div className="ourCollectionHeroContainerInfo">
                    <div className="ourCollectionHeroContainerInfoContainer">

                        {/* Top Part */}
                        <div className="ourCollectionHeroContainerInfoContainerTop">
                            <div className="ourCollectionHeroContainerInfoContainerTopContainer">
                                <div className="ourCollectionHeroContainerInfoContainerTopContainerOne">
                                    <div className="ourCollectionHeroContainerInfoContainerTopContainerOneDiv" />
                                </div>

                                <div className="ourCollectionHeroContainerInfoContainerTopContainerTwo">
                                    <p className="ourCollectionHeroContainerInfoContainerTopContainerTwoText bai-jamjuree-regular">
                                        Discover JustCars Premium Collection
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Middle Part */}
                        <div className="ourCollectionHeroContainerInfoContainerMiddle">
                            <p className="ourCollectionHeroContainerInfoContainerMiddleText bai-jamjuree-regular">
                                Rent a Dream
                            </p>
                        </div>

                        {/* Bottom Part */}
                        <div className="ourCollectionHeroContainerInfoContainerBottom">
                            <div className="ourCollectionHeroContainerInfoContainerBottomContainer">
                                <div className="ourCollectionHeroContainerInfoContainerBottomContainerButton">
                                    <FaArrowDownLong className='ourCollectionHeroContainerInfoContainerBottomContainerButtonIcon' />
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

export default OurCollectionHero