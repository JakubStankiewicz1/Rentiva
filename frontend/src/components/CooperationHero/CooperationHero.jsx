import React from "react";
import "./cooperationHero.css";
import assets from "../../assets/assets";

const CooperationHero = () => {
  return (
    <div className="cooperationHero">
      <div className="cooperationHeroContainer">
        {/* Top Part */}
        <div className="cooperationHeroContainerTop">
          <div className="cooperationHeroContainerTopContainer">
            {" "}
            <div className="cooperationHeroContainerTopContainerOne">
              <div className="cooperationHeroContainerTopContainerOneContainer">
                <p className="cooperationHeroContainerTopContainerOneContainerText bai-jamjuree-regular">Partnership with Rentiva</p>
              </div>
            </div>
            <div className="cooperationHeroContainerTopContainerTwo">
              <div className="cooperationHeroContainerTopContainerTwoContainer">
                <p className="cooperationHeroContainerTopContainerTwoContainerText bai-jamjuree-regular">Join the Rentiva Partner Network</p>
              </div>
            </div>
            <div className="cooperationHeroContainerTopContainerThree">
              <div className="cooperationHeroContainerTopContainerThreeContainer">
                <p className="cooperationHeroContainerTopContainerThreeContainerText bai-jamjuree-regular">
                  Transform your vehicle into a steady income source!
                </p>
              </div>
            </div>
            <div className="cooperationHeroContainerTopContainerFour">
              <div className="cooperationHeroContainerTopContainerFourContainer">
                <p className="cooperationHeroContainerTopContainerFourContainerText bai-jamjuree-regular">
                  Share your car on our platform and start earning today!
                </p>
              </div>
            </div>
            <div className="cooperationHeroContainerTopContainerFive">
              <div className="cooperationHeroContainerTopContainerFiveContainer">
                <p className="cooperationHeroContainerTopContainerFiveContainerText bai-jamjuree-regular">
                  Do you own an exceptional vehicle that can generate profits? Rentiva offers you the opportunity to monetize your car while
                  maintaining the highest safety standards and comprehensive customer service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="cooperationHeroContainerBottom">
          <div className="cooperationHeroContainerBottomContainer" style={{ position: "relative" }}>
            <img src={assets.CooperationHeroImage} alt="" className="cooperationHeroContainerBottomContainerImage" />
            <div className="cooperationHeroContainerBottomContainerOverlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CooperationHero;
