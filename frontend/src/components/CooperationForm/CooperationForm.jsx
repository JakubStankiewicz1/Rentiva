import React, { useRef, useState } from 'react';
import "./cooperationForm.css";
import { TfiEmail } from "react-icons/tfi";
import { BiPhone } from "react-icons/bi";
import assets from '../../assets/assets';
import ReCAPTCHA from "react-google-recaptcha";

const CooperationForm = () => {
      const recaptchaRef = useRef(null);
      const [recaptchaValue, setRecaptchaValue] = useState(null);
      const [openIndex, setOpenIndex] = useState(0);
      const [termsAccepted, setTermsAccepted] = useState(false);
      const [marketingConsent, setMarketingConsent] = useState(false);

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

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleTermsClick = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleMarketingClick = () => {
    setMarketingConsent(!marketingConsent);
  };

  
  return (
    <div
      className='cooperationForm'
      style={{
        backgroundImage: `url(${assets.CooperationFormImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div className="cooperationFormBgOverlay"></div>
      <div className="cooperationFormContainer">

          {/* Overlay */}
          <div className="cooperationFormContainerOverlay">
              <div className="cooperationFormContainerOverlayContainer">

                  {/* Form Container */}
                  <div className="cooperationFormContainerOverlayContainerForm">
                      <div className="cooperationFormContainerOverlayContainerFormContainer">

                          <div className="cooperationFormContainerOverlayContainerFormContainerOne">
                              <div className="cooperationFormContainerOverlayContainerFormContainerOneContainer">                                  <p className="cooperationFormContainerOverlayContainerFormContainerOneContainerText bai-jamjuree-regular">
                                      Capital Partnership Model
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerTwo">
                              <div className="cooperationFormContainerOverlayContainerFormContainerTwoContainer">                                  <p className="cooperationFormContainerOverlayContainerFormContainerTwoContainerText bai-jamjuree-regular">
                                      The perfect solution for luxury vehicle owners who want to generate steady rental income without personal involvement. Your car joins the Rentiva fleet, where we provide comprehensive management - from marketing and promotion, through technical service, to full logistics. This allows you to earn passive income while your car works efficiently and safely.
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerThree">
                              <div className="cooperationFormContainerOverlayContainerFormContainerThreeContainer">                                  <p className="cooperationFormContainerOverlayContainerFormContainerThreeContainerText bai-jamjuree-regular">
                                      Contact Us
                                  </p>
                              </div>
                          </div>
                          
                          <div className="cooperationFormContainerOverlayContainerFormContainerFour">
                              <div className="cooperationFormContainerOverlayContainerFormContainerFourContainer">                                  <p className="cooperationFormContainerOverlayContainerFormContainerFourContainerText bai-jamjuree-regular">
                                      <span className='cooperationFormContainerOverlayContainerFormContainerFourContainerTextColor bai-jamjuree-regular'>Ready to transform your vehicle into a source of income?</span> Contact our team of experts to learn about cooperation details and join the Rentiva partner community.
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerFive">
                              <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainerOne">
                                      <TfiEmail className='cooperationFormContainerOverlayContainerFormContainerFiveContainerOneIcon' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainerTwo">                                      <p className="cooperationFormContainerOverlayContainerFormContainerFiveContainerTwoText bai-jamjuree-regular">
                                          Email: contact@rentiva.com
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerSix">
                              <div className="cooperationFormContainerOverlayContainerFormContainerSixContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerSixContainerOne">
                                      <BiPhone className='cooperationFormContainerOverlayContainerFormContainerSixContainerOneIcon' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerSixContainerTwo">                                      <p className="cooperationFormContainerOverlayContainerFormContainerSixContainerTwoText bai-jamjuree-regular">
                                          Phone: +48 123 456 789
                                      </p>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="cooperationFormContainerOverlayContainerFormContainerSeven">
                              <div className="cooperationFormContainerOverlayContainerFormContainerSevenContainer">                                  <p className="cooperationFormContainerOverlayContainerFormContainerSevenContainerText bai-jamjuree-regular">
                                      Fill out the form
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerEight">
                              <div className="cooperationFormContainerOverlayContainerFormContainerEightContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerEightContainerDiv" />
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerNine">
                              <div className="cooperationFormContainerOverlayContainerFormContainerNineContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerOne">
                                      <input type="text" placeholder='Full Name' className='cooperationFormContainerOverlayContainerFormContainerNineContainerOneInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerTwo">
                                      <input type="text" placeholder='Email Address' className='cooperationFormContainerOverlayContainerFormContainerNineContainerTwoInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerThree">
                                      <input type="text" placeholder='Phone Number' className='cooperationFormContainerOverlayContainerFormContainerNineContainerThreeInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFour">
                                      <textarea name="" id="" placeholder='Describe your vehicle and expectations' className='cooperationFormContainerOverlayContainerFormContainerNineContainerFourTextarea'></textarea>
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFive">
                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveOne">
                                          <input 
                                              type="checkbox" 
                                              className='cooperationFormContainerOverlayContainerFormContainerNineContainerFiveOneInput'
                                              checked={termsAccepted}
                                              onChange={() => setTermsAccepted(!termsAccepted)}
                                          />
                                      </div>                                      <div 
                                          className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveTwo"
                                          onClick={handleTermsClick}
                                          style={{ cursor: 'pointer' }}
                                      >
                                          <p className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveTwoText bai-jamjuree-regular">
                                              I declare that I have read and agree to the terms and privacy policy of the rentiva.com service.
                                          </p>
                                      </div>
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerSix">
                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixOne">
                                          <input 
                                              type="checkbox" 
                                              className='cooperationFormContainerOverlayContainerFormContainerNineContainerSixOneInput'
                                              checked={marketingConsent}
                                              onChange={() => setMarketingConsent(!marketingConsent)}
                                          />
                                      </div>                                      <div 
                                          className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixTwo"
                                          onClick={handleMarketingClick}
                                          style={{ cursor: 'pointer' }}
                                      >
                                          <p className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixTwoText bai-jamjuree-regular">
                                              I consent to the processing of my personal data by Rentiva Sp. z o.o. for marketing and offer purposes, including through the following communication channels: email, SMS, phone.
                                          </p>
                                      </div>
                                  </div>

                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerTen">
                            <div className="cooperationFormContainerOverlayContainerFormContainerTenContainer">
                                <ReCAPTCHA
                                          ref={recaptchaRef}
                                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                          onChange={onChange}
                                          onExpired={onExpired}
                                          onErrored={onErrored}
                                          theme="dark"
                                          size="normal"
                                      />
                            </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerEleven">
                              <div className="cooperationFormContainerOverlayContainerFormContainerElevenContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerElevenContainerButton">
                                      <div className="cooperationFormContainerOverlayContainerFormContainerElevenContainerButtonContainer">                                          <p className="cooperationFormContainerOverlayContainerFormContainerElevenContainerButtonContainerText bai-jamjuree-regular">
                                              Send Inquiry
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
  )
}

export default CooperationForm