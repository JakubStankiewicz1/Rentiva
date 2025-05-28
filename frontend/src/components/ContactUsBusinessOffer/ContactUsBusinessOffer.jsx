import React from 'react';
import "./contactUsBusinessOffer.css";
import assets from '../../assets/assets';

const ContactUsBusinessOffer = () => {
  return (
    <div className='contactUsBusinessOffer'>
        <div className="contactUsBusinessOfferContainer">

            {/* Left Part */}
            <div className="contactUsBusinessOfferContainerLeft">
                <div className="contactUsBusinessOfferContainerLeftContainer">
                    <img src={assets.ContactUsBusinessOfferImage} alt="" className='contactUsBusinessOfferContainerLeftContainerImage' />
                </div>
            </div>


            {/* Right Part */}
            <div className="contactUsBusinessOfferContainerRight">
                <div className="contactUsBusinessOfferContainerRightContainer">
                    {/* Top Part */}
                    <div className="contactUsBusinessOfferContainerRightContainerTop">
                        <div className="contactUsBusinessOfferContainerRightContainerTopContainer">
                            <p className="contactUsBusinessOfferContainerRightContainerTopContainerText bai-jamjuree-regular">
                                Business Offer
                            </p>
                        </div>
                    </div>


                    {/* Bottom Part */}
                    <div className="contactUsBusinessOfferContainerRightContainerBottom">
                        <div className="contactUsBusinessOfferContainerRightContainerBottomContainer">
                            {/* Left Part */}
                            <div className="contactUsBusinessOfferContainerRightContainerBottomContainerLeft">
                                <div className="contactUsBusinessOfferContainerRightContainerBottomContainerLeftContainer">
                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerLeftContainerDiv" />
                                </div>
                            </div>

                            {/* Right Part */}
                            <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRight">
                                <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainer">
                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerOne">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerOneText bai-jamjuree-regular">
                                            At JustCars Premium, we believe that the right car emphasizes the business status, and that style and comfort should be a work standard.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerTwo">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerTwoText bai-jamjuree-regular">
                                            Our fleet of luxury cars will provide you with a comfortable and efficient journey, regardless of the destination and distance.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerThree">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerThreeText bai-jamjuree-regular">
                                            In our offer you will find a wide selection of premium cars, including models such as Bentley Continental GT, Lamborghini Urus, Lexus LS500 and many other luxury cars for rent.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFour">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFourText bai-jamjuree-regular">
                                            Our offer is tailored individually to the needs and requirements of our business clients.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFive">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFiveText bai-jamjuree-regular">
                                            We offer flexible rental modes that allow for short and long-term rental as well as for special occasions such as the airport/trainstation picking ups.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerSix">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerSixText bai-jamjuree-regular">
                                            Feel free to contact our team for more information about our corporate offer.
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
  )
}

export default ContactUsBusinessOffer