import React from 'react';
import "./carDetailsInfo.css";
import { IoIosArrowRoundDown } from "react-icons/io";
import assets from '../../assets/assets';

const CarDetailsInfo = () => {
  return (
    <div className='carDetailsInfo'>
        <div className="carDetailsInfoContainer">

            {/* Top Part */}
            <div className="carDetailsInfoContainerTop">
                <div className="carDetailsInfoContainerTopContainer">
                    <p className="carDetailsInfoContainerTopContainerText bai-jamjuree-regular">
                        Bugatti Chiron "110 Ans" – Esencja francuskiej perfekcji i mocy
                    </p>
                </div>
            </div>

            {/* Middle Part */}
            <div className="carDetailsInfoContainerMiddle">
                <div className="carDetailsInfoContainerMiddleContainer">

                    {/* Left Part */}
                    <div className="carDetailsInfoContainerMiddleContainerLeft">
                        <div className="carDetailsInfoContainerMiddleContainerLeftContiner">
                            <div className="carDetailsInfoContainerMiddleContainerLeftContinerTop">
                                <div className="carDetailsInfoContainerMiddleContainerLeftContinerTopContainer">
                                    <img src={assets.BugattiChironThree} alt="" className='carDetailsInfoContainerMiddleContainerLeftContinerTopContainerImage' />
                                </div>
                            </div>

                            <div className="carDetailsInfoContainerMiddleContainerLeftContinerBottom">
                                <div className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainer">
                                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextOne bai-jamjuree-regular">
                                        Bugatti Chiron 110 Ans to nie tylko samochód – to ekskluzywna celebracja 110-lecia marki, będąca hołdem dla francuskiego dziedzictwa, inżynieryjnej precyzji i niepowtarzalnego luksusu. Powstało jedynie 20 egzemplarzy tego modelu, co czyni go jedną z najbardziej pożądanych i kolekcjonerskich wersji Chirona. To auto, które łączy bezkompromisową moc z wyrafinowanym designem i najbardziej zaawansowaną technologią dostępną we współczesnej motoryzacji.
                                    </p>

                                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextTwo bai-jamjuree-regular">
                                        Pod maską Chirona 110 Ans pracuje 8.0-litrowy silnik W16 z poczwórnym turbodoładowaniem, generujący oszałamiające 1 500 KM mocy i 1 600 Nm momentu obrotowego. Napęd przekazywany jest na wszystkie cztery koła za pośrednictwem 7-biegowej dwusprzęgłowej przekładni DSG.
                                    </p>

                                    <p className="carDetailsInfoContainerMiddleContainerLeftContinerBottomContainerTextThree bai-jamjuree-regular">
                                        Rezultat? Przyspieszenie od 0 do 100 km/h w zaledwie 2,4 sekundy, od 0 do 200 km/h w około 6,1 sekundy, a prędkość maksymalna została elektronicznie ograniczona do 420 km/h – choć potencjał techniczny pozwala na jeszcze więcej. To jeden z najszybszych samochodów produkcyjnych świata, a zarazem dzieło sztuki inżynierskiej.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="carDetailsInfoContainerMiddleContainerRight">
                        <div className="carDetailsInfoContainerMiddleContainerRightContainer">
                            <div className="carDetailsInfoContainerMiddleContainerRightContainerTop">
                                <div className="carDetailsInfoContainerMiddleContainerRightContainerTopContainer">
                                    <img src={assets.BugattiChironThree} alt="" className='carDetailsInfoContainerMiddleContainerRightContainerTopContainerImage' />
                                </div>
                            </div>

                            <div className="carDetailsInfoContainerMiddleContainerRightContainerBottom">
                                <div className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainer">
                                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextOne bai-jamjuree-regular">
                                        Kabina Bugatti Chiron 110 Ans to mistrzowskie połączenie sportowego minimalizmu z najwyższej jakości wykończeniem. Fotele pokryte skórą w kolorze Deep Blue Alcantara, detale z włókna węglowego oraz elementy inspirowane francuską flagą sprawiają, że wnętrze jest równie wyjątkowe jak nadwozie.
                                    </p>

                                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextTwo bai-jamjuree-regular">
                                        Każdy szczegół, od ręcznych szwów, po przyciski i wskaźniki, został wykonany z niespotykaną dbałością o detale. Mimo ultraluksusowego charakteru, kokpit pozostał maksymalnie zorientowany na kierowcę – bez zbędnych rozpraszaczy, za to z ergonomią godną hipersamochodu.
                                    </p>

                                    <p className="carDetailsInfoContainerMiddleContainerRightContainerBottomContainerTextThree bai-jamjuree-regular">
                                        Bugatti Chiron 110 Ans to kwintesencja motoryzacyjnej perfekcji – hipersamochód stworzony z myślą o tych, którzy nie uznają kompromisów. To nie tylko wyjątkowa maszyna pod względem osiągów, ale też dzieło sztuki oddające ducha francuskiej marki. Limitowana edycja, wybitna technologia, design z charakterem i nieosiągalna dla innych moc sprawiają, że ten model zapisuje się złotymi literami w historii motoryzacji.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            {/* Bottom Part */}
            <div className="carDetailsInfoContainerBottom">
                <div className="carDetailsInfoContainerBottomContainer">
                    <div className="carDetailsInfoContainerBottomContainerButton">
                        <div className="carDetailsInfoContainerBottomContainerButtonContainer">
                            <p className="carDetailsInfoContainerBottomContainerButtonContainerText bai-jamjuree-regular">
                                Book this car
                            </p>
                        </div>
                    </div>

                    <div className="carDetailsInfoContainerBottomContainerArrow">
                        <div className="carDetailsInfoContainerBottomContainerArrowContainer">
                            <IoIosArrowRoundDown className='carDetailsInfoContainerBottomContainerArrowContainerIcon' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CarDetailsInfo