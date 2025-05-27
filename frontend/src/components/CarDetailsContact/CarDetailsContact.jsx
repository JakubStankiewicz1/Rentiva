import React, { useRef, useState } from 'react';
import "./carDetailsContact.css";
import { FiSmartphone } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";

const CarDetailsContact = () => {
  const recaptchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptchaValue(value);
  }

  function onExpired() {
    console.log("Captcha expired");
    setRecaptchaValue(null);
  }

  function onErrored() {
    console.log("Captcha error");
    setRecaptchaValue(null);
  }

  return (
    <div className='carDetailsContact'>
        <div className="carDetailsContactContainer">

            {/* Top Part */}
            <div className="carDetailsContactContainerTop">
                <div className="carDetailsContactContainerTopContainer">

                    {/* Left Part */}
                    <div className="carDetailsContactContainerTopContainerLeft">
                        <div className="carDetailsContactContainerTopContainerLeftContainer">
                            <div className="carDetailsContactContainerTopContainerLeftContainerOne">
                                <div className="carDetailsContactContainerTopContainerLeftContainerOneContainer">
                                    <p className="carDetailsContactContainerTopContainerLeftContainerOneContainerTextOne bai-jamjuree-regular">
                                        To rent this car
                                    </p>

                                    <p className="carDetailsContactContainerTopContainerLeftContainerOneContainerTextTwo bai-jamjuree-regular">
                                        call or email us.
                                    </p>
                                </div>
                            </div>

                            <div className="carDetailsContactContainerTopContainerLeftContainerTwo">
                                <div className="carDetailsContactContainerTopContainerLeftContainerTwoContainer phone-animate-bg">
                                    <div className="carDetailsContactContainerTopContainerLeftContainerTwoContainerDiv">
                                        <FaPhone className='carDetailsContactContainerTopContainerLeftContainerTwoContainerDivIcon phone-animate-icon' />
                                    </div>
                                </div>
                            </div>

                            <div className="carDetailsContactContainerTopContainerLeftContainerThree">
                                <div className="carDetailsContactContainerTopContainerLeftContainerThreeContainer">
                                    <div className="carDetailsContactContainerTopContainerLeftContainerThreeContainerOne">
                                        <FiSmartphone className='carDetailsContactContainerTopContainerLeftContainerThreeContainerOneIcon' />
                                    </div>

                                    <div className="carDetailsContactContainerTopContainerLeftContainerThreeContainerTwo">
                                        <div className="carDetailsContactContainerTopContainerLeftContainerThreeContainerTwoContainer">
                                            <p className="carDetailsContactContainerTopContainerLeftContainerThreeContainerTwoContainerText bai-jamjuree-regular">
                                                Phone
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="carDetailsContactContainerTopContainerLeftContainerFour">
                                <div className="carDetailsContactContainerTopContainerLeftContainerFourContainer">
                                    <p className="carDetailsContactContainerTopContainerLeftContainerFourContainerText bai-jamjuree-regular">
                                        tel. +48 123 123 123
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Part */}
                    <div className="carDetailsContactContainerTopContainerRight">
                        <div className="carDetailsContactContainerTopContainerRightContainer">

                            <div className="carDetailsContactContainerTopContainerRightContainerOne">
                                <div className="carDetailsContactContainerTopContainerRightContainerOneContainer">
                                    <div className="carDetailsContactContainerTopContainerRightContainerOneContainerOne">
                                        <input type="text" className='carDetailsContactContainerTopContainerRightContainerOneContainerOneInput' placeholder='Name' />
                                    </div>

                                    <div className="carDetailsContactContainerTopContainerRightContainerOneContainerTwo">
                                        <input type="text" className='carDetailsContactContainerTopContainerRightContainerOneContainerTwoInput' placeholder='Second name' />
                                    </div>
                                </div>
                            </div>



                            <div className="carDetailsContactContainerTopContainerRightContainerTwo">
                                <div className="carDetailsContactContainerTopContainerRightContainerTwoContainer">
                                    <div className="carDetailsContactContainerTopContainerRightContainerTwoContainerOne">
                                        <input type="text" className='carDetailsContactContainerTopContainerRightContainerTwoContainerOneInput' placeholder='E-mail address' />
                                    </div>

                                    <div className="carDetailsContactContainerTopContainerRightContainerTwoContainerTwo">
                                        <input type="text" className='carDetailsContactContainerTopContainerRightContainerTwoContainerTwoInput' placeholder='Call us to hire this car' />
                                    </div>
                                </div>
                            </div>

                            <div className="carDetailsContactContainerTopContainerRightContainerThree">
                                <div className="carDetailsContactContainerTopContainerRightContainerThreeContainer">
                                    <textarea
                                        name=""
                                        id=""
                                        className='carDetailsContactContainerTopContainerRightContainerThreeContainerTextarea'
                                        placeholder="Type in Rental period, pick-up and drop-off location, and discount code (if you have one)."
                                    ></textarea>
                                </div>
                            </div>







                            <div className="carDetailsContactContainerTopContainerRightContainerFour">
                                <div className="carDetailsContactContainerTopContainerRightContainerFourContainer">

                                    <div className="carDetailsContactContainerTopContainerRightContainerFourContainerOne">
                                        <label className="carDetailsContactCheckboxLabel" htmlFor="regulations">
                                            <input
                                                type="checkbox"
                                                className='carDetailsContactContainerTopContainerRightContainerFourContainerOneContainerOneInput'
                                                id="regulations"
                                            />
                                            <span className="carDetailsContactContainerTopContainerRightContainerFourContainerOneContainerTwoText bai-jamjuree-regular">
                                                I declare that I have familiarized myself with the <b>regulations</b> i <b>privacy policy</b> of justcarspremium.com website.
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div className="carDetailsContactContainerTopContainerRightContainerFourContainerTwo">
                                        <label className="carDetailsContactCheckboxLabel" htmlFor="marketing">
                                            <input
                                                type="checkbox"
                                                className='carDetailsContactContainerTopContainerRightContainerFourContainerTwoContainerOneInput'
                                                id="marketing"
                                            />
                                            <span className="carDetailsContactContainerTopContainerRightContainerFourContainerTwoContainerTwoText bai-jamjuree-regular">
                                                I consent to the processing of my personal data by Car Justart Sp. z o.o. for marketing and offering purposes including the following communication channels email, sms, phone.
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div className="carDetailsContactContainerTopContainerRightContainerFive">
                                <div className="carDetailsContactContainerTopContainerRightContainerFiveContainer">
                                    <div className="carDetailsContactRecaptchaWrapper">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            onChange={onChange}
                                            onExpired={onExpired}
                                            onErrored={onErrored}
                                            theme="light"
                                            size="normal"
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="carDetailsContactContainerTopContainerRightContainerSix">
                                <div className="carDetailsContactContainerTopContainerRightContainerSixContainer">
                                    <div className="carDetailsContactContainerTopContainerRightContainerSixContainerButton">
                                        <div className="carDetailsContactContainerTopContainerRightContainerSixContainerButtonContainer">
                                            <p className="carDetailsContactContainerTopContainerRightContainerSixContainerButtonContainerText bai-jamjuree-regular">
                                                Book this car
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>



            {/* Bottom Part */}
            <div className="carDetailsContactContainerBottom"></div>

        </div>
    </div>
  )
}

export default CarDetailsContact