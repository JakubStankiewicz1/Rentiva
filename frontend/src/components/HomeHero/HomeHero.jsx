import React, { useState, useEffect, useRef } from 'react';
import "./homeHero.css";
import assets from '../../assets/assets';
import { GoArrowRight } from "react-icons/go";

const HomeHero = () => {
    const [currentCarIndex, setCurrentCarIndex] = useState(0);
    const progressRefs = useRef([]);
    const animationRef = useRef();
    const progressStartTime = useRef();

    const cars = [
        {
            image: assets.HomeHeroImageOne,
            brand: "Lamborghini",
            model: "Huracan",
            power: "610",
            acceleration: "3.2",
        },
        {
            image: assets.HomeHeroImageOne,
            brand: "Ferrari",
            model: "SF90",
            power: "1000",
            acceleration: "2.5",
        },
        {
            image: assets.HomeHeroImageOne,
            brand: "McLaren",
            model: "720S",
            power: "720",
            acceleration: "2.9",
        }
    ];

    const svgRefs = useRef([]);

    // Progress animation
    useEffect(() => {
        let running = true;
        function animate() {
            if (!running) return;
            const duration = 5000;
            if (!progressStartTime.current) progressStartTime.current = performance.now();
            const now = performance.now();
            const elapsed = now - progressStartTime.current;
            let percent = Math.min(elapsed / duration, 1);
            let deg = percent * 360;
            progressRefs.current.forEach((el, idx) => {
                if (el) {
                    el.style.setProperty('--progress', idx === currentCarIndex ? `${deg}deg` : '0deg');
                }
            });
            if (percent < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        }
        progressStartTime.current = null;
        animationRef.current = requestAnimationFrame(animate);
        return () => {
            running = false;
            cancelAnimationFrame(animationRef.current);
        };
    }, [currentCarIndex, cars.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarIndex((prevIndex) => 
                prevIndex === cars.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [cars.length]);

    const handleDotClick = (index) => {
        setCurrentCarIndex(index);
    };

    const currentCar = cars[currentCarIndex];

  return (
    <div className='homeHero'>
        <div className="homeHeroContainer">

            {/* Image */}
            <div className="homeHeroContainerImage">
                <div className="homeHeroContainerImageContainer">
                    <img 
                        src={currentCar.image} 
                        alt={`${currentCar.brand} ${currentCar.model}`} 
                        className='homeHeroContainerImageContainerImage' 
                        key={currentCarIndex}
                    />
                    <div className="homeHeroContainerImageContainerOverlay"></div>
                </div>
            </div>

            {/* Info */}
            <div className="homeHeroContainerInfo">
                <div className="homeHeroContainerInfoContainer">
                    {/* Left Part */}
                    <div className="homeHeroContainerInfoContainerLeft">

                        <div className="homeHeroContainerInfoContainerLeftDots">
                            <div className="homeHeroContainerInfoContainerLeftDotsContainer">
                                {cars.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`homeHeroContainerInfoContainerLeftDotsContainerOne ${
                                            index === currentCarIndex ? 'active' : ''
                                        }`}
                                        onClick={() => handleDotClick(index)}
                                    >
                                        <div
                                            className="progress-ring-svg"
                                            ref={el => progressRefs.current[index] = el}
                                        />
                                        <div className="dot-center" />
                                        <div className="homeHeroContainerInfoContainerLeftDotsContainerOneDiv" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="homeHeroContainerInfoContainerLeftContainer">
                            <div className="homeHeroContainerInfoContainerLeftContainerTop">
                                <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainer">
                                    <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerOne">
                                        <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerOneDiv" />
                                    </div>

                                    <div className="homeHeroContainerInfoContainerLeftContainerTopCOntainerTwo">
                                        <p className="homeHeroContainerInfoContainerLeftContainerTopCOntainerTwoText bai-jamjuree-regular">
                                            luxury & sport car rental
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="homeHeroContainerInfoContainerLeftContainerMiddle">
                                <div className="homeHeroContainerInfoContainerLeftContainerMiddleContainer">
                                    <p className="homeHeroContainerInfoContainerLeftContainerMiddleContainerText bai-jamjuree-regular">
                                        Just Cars Premium
                                    </p>
                                </div>
                            </div>

                            <div className="homeHeroContainerInfoContainerLeftContainerBottom">
                                <div className="homeHeroContainerInfoContainerLeftContainerBottomContainer">
                                    {/* Left Part */}
                                    <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeft">
                                        <div className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeftContainer">
                                            <p className="homeHeroContainerInfoContainerLeftContainerBottomContainerLeftContainerText bai-jamjuree-regular">
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
                                        <p className="homeHeroContainerInfoContainerRightContainerContainerTopContainerTextOne bai-jamjuree-regular animate-text" key={`brand-${currentCarIndex}`}>
                                            {currentCar.brand}
                                        </p>

                                        <p className="homeHeroContainerInfoContainerRightContainerContainerTopContainerTextTwo bai-jamjuree-regular animate-text" key={`model-${currentCarIndex}`}>
                                            {currentCar.model}
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
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerOneText bai-jamjuree-regular animate-text" key={`power-${currentCarIndex}`}>
                                                        {currentCar.power}hp
                                                    </p>
                                                </div>

                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerTwo">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerOneContainerTwoText bai-jamjuree-regular">
                                                        power
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwo">
                                            <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainer">
                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerOne">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerOneText bai-jamjuree-regular animate-text" key={`acceleration-${currentCarIndex}`}>
                                                        {currentCar.acceleration}
                                                    </p>
                                                </div>

                                                <div className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerTwo">
                                                    <p className="homeHeroContainerInfoContainerRightContainerContainerBottomContainerTwoContainerTwoText bai-jamjuree-regular">
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