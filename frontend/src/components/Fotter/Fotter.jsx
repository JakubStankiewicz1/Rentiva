import React from 'react';
import "./fotter.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const Fotter = () => {
  return (
    <div className='fotter'>
        <div className="fotterContainer">

            {/* Hr Divider */}
            <div className="fotterContainerHr">
                <div className="fotterContainerHrContainer">
                    <div className="fotterContainerHrContainerDiv" />
                </div>
            </div>




            {/* Main Container */}
            <div className="fotterContainerMain">
                <div className="fotterContainerMainContainer">
                    {/* Left Part */}
                    <div className="fotterContainerMainContainerLeft">
                        <div className="fotterContainerMainContainerLeftContainer">
                            {/* Top Part */}
                            <div className="fotterContainerMainContainerLeftContainerTop">
                                <div className="fotterContainerMainContainerLeftContainerTopContainer">

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerTopContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerTopContainerElementContainer">
                                            <p className="fotterContainerMainContainerLeftContainerTopContainerElementContainerText bai-jamjuree-regular">
                                                Home Page
                                            </p>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerTopContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerTopContainerElementContainer">
                                            <p className="fotterContainerMainContainerLeftContainerTopContainerElementContainerText bai-jamjuree-regular">
                                                Our Cars
                                            </p>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerTopContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerTopContainerElementContainer">
                                            <p className="fotterContainerMainContainerLeftContainerTopContainerElementContainerText bai-jamjuree-regular">
                                                Faq
                                            </p>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerTopContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerTopContainerElementContainer">
                                            <p className="fotterContainerMainContainerLeftContainerTopContainerElementContainerText bai-jamjuree-regular">
                                                Blog
                                            </p>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerTopContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerTopContainerElementContainer">
                                            <p className="fotterContainerMainContainerLeftContainerTopContainerElementContainerText bai-jamjuree-regular">
                                                Contact
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Bottom Part */}
                            <div className="fotterContainerMainContainerLeftContainerBottom">
                                <div className="fotterContainerMainContainerLeftContainerBottomContainer">

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerBottomContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainer">
                                            <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainerDiv">
                                                <AiOutlineYoutube className='fotterContainerMainContainerLeftContainerBottomContainerElementContainerDivIcon' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerBottomContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainer">
                                            <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainerDiv">
                                                <FaFacebookF className='fotterContainerMainContainerLeftContainerBottomContainerElementContainerDivIcon' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Element */}
                                    <div className="fotterContainerMainContainerLeftContainerBottomContainerElement">
                                        <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainer">
                                            <div className="fotterContainerMainContainerLeftContainerBottomContainerElementContainerDiv">
                                                <FaInstagram className='fotterContainerMainContainerLeftContainerBottomContainerElementContainerDivIcon' />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="fotterContainerMainContainerRight">
                        <div className="fotterContainerMainContainerRightContainer">
                            <div className="fotterContainerMainContainerRightContainerOne">
                                <div className="fotterContainerMainContainerRightContainerOneContainer">
                                    <p className="fotterContainerMainContainerRightContainerOneContainerText bai-jamjuree-regular">
                                        Be the first to hear about new cars and offers!
                                    </p>
                                </div>
                            </div>

                            <div className="fotterContainerMainContainerRightContainerTwo">
                                <div className="fotterContainerMainContainerRightContainerTwoContainer">
                                    <div className="fotterContainerMainContainerRightContainerTwoContainerOne">
                                        <div className="fotterContainerMainContainerRightContainerTwoContainerOneContainer">
                                            <input type="text" className='fotterContainerMainContainerRightContainerTwoContainerOneContainerInput' placeholder='E-mail address' />
                                        </div>
                                    </div>

                                    <div className="fotterContainerMainContainerRightContainerTwoContainerTwo">
                                        <div className="fotterContainerMainContainerRightContainerTwoContainerTwoContainer">
                                            <div className="fotterContainerMainContainerRightContainerTwoContainerTwoContainerButton">
                                                <div className="fotterContainerMainContainerRightContainerTwoContainerTwoContainerButtonContainer">
                                                    <p className="fotterContainerMainContainerRightContainerTwoContainerTwoContainerButtonContainerText bai-jamjuree-regular">
                                                        Sing Up!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="fotterContainerMainContainerRightContainerThree">
                                <div className="fotterContainerMainContainerRightContainerThreeContainer">
                                    <div className="fotterContainerMainContainerRightContainerThreeContainerOne">
                                        <div className="fotterContainerMainContainerRightContainerThreeContainerOneContainer">
                                            <input type="checkbox" className='fotterContainerMainContainerRightContainerThreeContainerOneContainerInput' />
                                        </div>
                                    </div>

                                    <div className="fotterContainerMainContainerRightContainerThreeContainerTwo">
                                        <div className="fotterContainerMainContainerRightContainerThreeContainerTwoContainer">
                                            <p className="fotterContainerMainContainerRightContainerThreeContainerTwoContainerText bai-jamjuree-regular">
                                                I consent to the processing of my personal data provided by me in order to receive the newsletter.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* Hr Divider */}
            <div className="fotterContainerHrOne">
                <div className="fotterContainerHrContainer">
                    <div className="fotterContainerHrContainerDiv" />
                </div>
            </div>

            {/* Bottom Part */}
            <div className="fotterContainerBottom">
                <div className="fotterContainerBottomContainer">
                    {/* Left Part */}
                    <div className="fotterContainerBottomContainerLeft">
                        <div className="fotterContainerBottomContainerLeftContainer">
                            <div className="fotterContainerBottomContainerLeftContainerOne">
                                <p className="fotterContainerBottomContainerLeftContainerOneText bai-jamjuree-regular">
                                    Privacy Policy
                                </p>
                            </div>

                            <div className="fotterContainerBottomContainerLeftContainerTwo">
                                <p className="fotterContainerBottomContainerLeftContainerTwoText bai-jamjuree-regular">
                                    Terms & Conditions
                                </p>
                            </div>

                            <div className="fotterContainerBottomContainerLeftContainerThree">
                                <p className="fotterContainerBottomContainerLeftContainerThreeText bai-jamjuree-regular">
                                    Topczarter.pl
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="fotterContainerBottomContainerRight">
                        <div className="fotterContainerBottomContainerRightContaine">
                            <p className="fotterContainerBottomContainerRightContaineText">
                                © 2025 Car Rental. All rights reserved. | Build by Jakub Stankiewicz
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Fotter