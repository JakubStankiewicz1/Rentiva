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
                              <div className="cooperationFormContainerOverlayContainerFormContainerOneContainer">
                                  <p className="cooperationFormContainerOverlayContainerFormContainerOneContainerText bai-jamjuree-regular">
                                      Model kapitałowy
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerTwo">
                              <div className="cooperationFormContainerOverlayContainerFormContainerTwoContainer">
                                  <p className="cooperationFormContainerOverlayContainerFormContainerTwoContainerText bai-jamjuree-regular">
                                      To idealne rozwiązanie dla właścicieli luksusowych samochodów, którzy chcą generować regularne zyski z wynajmu, nie angażując się w jego obsługę. Samochód trafia do naszej floty, gdzie zajmujemy się pełnym zarządzaniem - od promocji, przez serwis, po logistykę. Dzięki temu właściciel może czerpać dochody pasywne, a jego auto pracuje na siebie w sposób bezpieczny i efektywny.
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerThree">
                              <div className="cooperationFormContainerOverlayContainerFormContainerThreeContainer">
                                  <p className="cooperationFormContainerOverlayContainerFormContainerThreeContainerText bai-jamjuree-regular">
                                      Skontaktuj się z nami
                                  </p>
                              </div>
                          </div>
                          
                          <div className="cooperationFormContainerOverlayContainerFormContainerFour">
                              <div className="cooperationFormContainerOverlayContainerFormContainerFourContainer">
                                  <p className="cooperationFormContainerOverlayContainerFormContainerFourContainerText bai-jamjuree-regular">
                                      <span className='cooperationFormContainerOverlayContainerFormContainerFourContainerTextColor bai-jamjuree-regular'>Gotowy, by Twój samochód zaczął zarabiać?</span> Skontaktuj się z naszym zespołem, aby poznać szczegóły współpracy i stać się częścią JustCars Premium.
                                  </p>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerFive">
                              <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainerOne">
                                      <TfiEmail className='cooperationFormContainerOverlayContainerFormContainerFiveContainerOneIcon' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerFiveContainerTwo">
                                      <p className="cooperationFormContainerOverlayContainerFormContainerFiveContainerTwoText bai-jamjuree-regular">
                                          Email: kontakt@justcarspremium.com
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div className="cooperationFormContainerOverlayContainerFormContainerSix">
                              <div className="cooperationFormContainerOverlayContainerFormContainerSixContainer">
                                  <div className="cooperationFormContainerOverlayContainerFormContainerSixContainerOne">
                                      <BiPhone className='cooperationFormContainerOverlayContainerFormContainerSixContainerOneIcon' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerSixContainerTwo">
                                      <p className="cooperationFormContainerOverlayContainerFormContainerSixContainerTwoText bai-jamjuree-regular">
                                          Telefon: +48 669 712 712
                                      </p>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="cooperationFormContainerOverlayContainerFormContainerSeven">
                              <div className="cooperationFormContainerOverlayContainerFormContainerSevenContainer">
                                  <p className="cooperationFormContainerOverlayContainerFormContainerSevenContainerText bai-jamjuree-regular">
                                      Fill the form
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
                                      <input type="text" placeholder='Name/Second Name' className='cooperationFormContainerOverlayContainerFormContainerNineContainerOneInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerTwo">
                                      <input type="text" placeholder='E-mail address' className='cooperationFormContainerOverlayContainerFormContainerNineContainerTwoInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerThree">
                                      <input type="text" placeholder='Call us to hire this car' className='cooperationFormContainerOverlayContainerFormContainerNineContainerThreeInput' />
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFour">
                                      <textarea name="" id="" placeholder='Type your message' className='cooperationFormContainerOverlayContainerFormContainerNineContainerFourTextarea'></textarea>
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFive">
                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveOne">
                                          <input type="checkbox" className='cooperationFormContainerOverlayContainerFormContainerNineContainerFiveOneInput' />
                                      </div>

                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveTwo">
                                          <p className="cooperationFormContainerOverlayContainerFormContainerNineContainerFiveTwoText bai-jamjuree-regular">
                                              I declare that I have familiarized myself with the regulations i privacy policy of justcarspremium.com website.
                                          </p>
                                      </div>
                                  </div>

                                  <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerSix">
                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixOne">
                                          <input type="checkbox" className='cooperationFormContainerOverlayContainerFormContainerNineContainerSixOneInput' />
                                      </div>

                                      <div className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixTwo">
                                          <p className="cooperationFormContainerOverlayContainerFormContainerNineContainerSixTwoText bai-jamjuree-regular">
                                              I consent to the processing of my personal data by Car Justart Sp. z o.o. for marketing and offering purposes including the following communication channels email, sms, phone.
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
                                      <div className="cooperationFormContainerOverlayContainerFormContainerElevenContainerButtonContainer">
                                          <p className="cooperationFormContainerOverlayContainerFormContainerElevenContainerButtonContainerText bai-jamjuree-regular">
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

      </div>
    </div>
  )
}

export default CooperationForm