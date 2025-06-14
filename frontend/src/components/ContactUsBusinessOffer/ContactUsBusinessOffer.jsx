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
                        <div className="contactUsBusinessOfferContainerRightContainerTopContainer">                            <p className="contactUsBusinessOfferContainerRightContainerTopContainerText bai-jamjuree-regular">
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
                                <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainer">                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerOne">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerOneText bai-jamjuree-regular">
                                            At Rentiva, we believe that the right vehicle emphasizes business prestige, and that style and comfort should be the standard in professional work.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerTwo">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerTwoText bai-jamjuree-regular">
                                            Our fleet of luxury vehicles will provide you with a comfortable and efficient journey, regardless of destination and distance.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerThree">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerThreeText bai-jamjuree-regular">
                                            In our portfolio you will find an extensive selection of premium automobiles, including models such as Bentley Continental GT, Lamborghini Urus, Lexus LS500 and many other luxury cars for rental.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFour">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFourText bai-jamjuree-regular">
                                            Our services are individually tailored to meet the specific needs and requirements of our corporate clients.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFive">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerFiveText bai-jamjuree-regular">
                                            We provide flexible rental solutions that accommodate both short-term and long-term arrangements, as well as specialized services for executive transfers including airport and railway station pickups.
                                        </p>
                                    </div>

                                    <div className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerSix">
                                        <p className="contactUsBusinessOfferContainerRightContainerBottomContainerRightContainerSixText bai-jamjuree-regular">
                                            Please feel free to contact our professional team for detailed information about our corporate solutions.
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