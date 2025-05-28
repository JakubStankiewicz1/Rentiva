import React from 'react';
import "./contactUsRent.css";

const ContactUsRent = () => {
  return (
    <div className='contactUsRent'>
        <div className="contactUsRentContainer">

            {/* Main Part */}
            <div className="contactUsRentContainerMain">
                <div className="contactUsRentContainerMainContainer">
                    {/* Top Part */}
                    <div className="contactUsRentContainerMainContainerTop">
                        <div className="contactUsRentContainerMainContainerTopContainer">
                            <p className="contactUsRentContainerMainContainerTopContainerText bai-jamjuree-regular">
                                Rentiva Premium Rent
                            </p>
                        </div>
                    </div>

                    {/* Middle Part */}
                    <div className="contactUsRentContainerMainContainerMiddle">
                        <div className="contactUsRentContainerMainContainerMiddleContainer">
                            <p className="contactUsRentContainerMainContainerMiddleContainerText bai-jamjuree-regular">
                                Premium Class Cars
                            </p>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="contactUsRentContainerMainContainerBottom">
                        <div className="contactUsRentContainerMainContainerBottomContainer">
                            <div className="contactUsRentContainerMainContainerBottomContainerButton">
                                <div className="contactUsRentContainerMainContainerBottomContainerButtonContainer">
                                    <p className="contactUsRentContainerMainContainerBottomContainerButtonContainerText bai-jamjuree-regular">
                                        Discover Car Collection
                                    </p>
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

export default ContactUsRent