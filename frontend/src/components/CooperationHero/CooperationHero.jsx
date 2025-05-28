import React from 'react';
import "./cooperationHero.css"
import assets from '../../assets/assets';

const CooperationHero = () => {
  return (
    <div className='cooperationHero'>
        <div className="cooperationHeroContainer">

            {/* Top Part */}
            <div className="cooperationHeroContainerTop">
                <div className="cooperationHeroContainerTopContainer">

                    <div className="cooperationHeroContainerTopContainerOne">
                        <div className="cooperationHeroContainerTopContainerOneContainer">
                            <p className="cooperationHeroContainerTopContainerOneContainerText bai-jamjuree-regular">
                                Zostań partnerem JustCars Premium
                            </p>
                        </div>
                    </div>

                    <div className="cooperationHeroContainerTopContainerTwo">
                        <div className="cooperationHeroContainerTopContainerTwoContainer">
                            <p className="cooperationHeroContainerTopContainerTwoContainerText bai-jamjuree-regular">
                                Zostań partnerem JustCars Premium
                            </p>
                        </div>
                    </div>

                    <div className="cooperationHeroContainerTopContainerThree">
                        <div className="cooperationHeroContainerTopContainerThreeContainer">
                            <p className="cooperationHeroContainerTopContainerThreeContainerText bai-jamjuree-regular">
                                Osiągnij dochód pasywny dzięki swojemu samochodowi premium!
                            </p>
                        </div>
                    </div>

                    <div className="cooperationHeroContainerTopContainerFour">
                        <div className="cooperationHeroContainerTopContainerFourContainer">
                            <p className="cooperationHeroContainerTopContainerFourContainerText bai-jamjuree-regular">
                                Wstaw Twój samochód do naszej wypożyczalni i uwolnij moc pasywnego przychodu!
                            </p>
                        </div>
                    </div>

                    <div className="cooperationHeroContainerTopContainerFive">
                        <div className="cooperationHeroContainerTopContainerFiveContainer">
                            <p className="cooperationHeroContainerTopContainerFiveContainerText bai-jamjuree-regular">
                                Masz luksusowe auto, które może zarabiać? W JustCars Premium dajemy Ci możliwość maksymalizacji potencjału Twojego auta, jednocześnie gwarantując pełne bezpieczeństwo i profesjonalną obsługę.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            
            {/* Bottom Part */}
            <div className="cooperationHeroContainerBottom">
                <div className="cooperationHeroContainerBottomContainer" style={{position: "relative"}}>
                    <img src={assets.CooperationHeroImage} alt="" className='cooperationHeroContainerBottomContainerImage' />
                    <div className="cooperationHeroContainerBottomContainerOverlay"></div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CooperationHero