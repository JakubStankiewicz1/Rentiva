import React, { useRef, useState } from 'react';
import "./carDetailsContact.css";
import { FiSmartphone } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";

const FAQ_DATA = [
  {
    question: "WHAT IS THE AREA OF OUR SERVICES?",
    answer: (
      <>
        JustCars Premium Rent car rental is located in Warsaw. However, for an additional fee, we deliver and collect cars from the major cities in Poland. Detailed delivery prices to individual cities: ŁÓDŹ - PLN 999 | LUBLIN - PLN 1399 | POZNAŃ - 1999 PLN | KRAKOW - 1999 PLN | WROCLAW - 2149 | TRICITY - PLN 2099<br />
        The prices are net prices, including one-way transport of the vehicle.
      </>
    ),
  },
  {
    question: "CAN I RENT A CAR IN A HOURLY-RENTAL MODE?",
    answer: (
      <>
        The shortest rental period at JustCars Premium car rental is one day. We do not provide hourly rental services.
      </>
    ),
  },
  {
    question: "IS INSURANCE INCLUDED IN OUR SERVICES?",
    answer: (
      <>
        Yes, all cars are fully insured (OC/AC/NNW).
      </>
    ),
  },
  {
    question: "IS A DEPOSIT REQUIRED?",
    answer: (
      <>
        Yes, a deposit is required. The amount depends on the car model.
      </>
    ),
  },
  {
    question: "WHAT ARE THE CAR RETURNING TERMS & CONDITIONS?",
    answer: (
      <>
        The car must be returned with the same fuel level and in the same condition as at pickup.
      </>
    ),
  },
  {
    question: "CAN I BOOK A CAR IN ADVANCE?",
    answer: (
      <>
        Yes, you can book a car in advance via our website or by phone.
      </>
    ),
  },
  {
    question: "WHAT ARE ACCEPTED PAYMENT METHODS?",
    answer: (
      <>
        We accept credit cards, debit cards, and bank transfers.
      </>
    ),
  },
  {
    question: "CAN I DRIVE OUTSIDE POLANDS BORDER?",
    answer: (
      <>
        Yes, but you must inform us in advance and obtain written consent.
      </>
    ),
  },
  {
    question: "IS THERE A LIMIT TO HOW FAR I CAN GO?",
    answer: (
      <>
        There is a mileage limit depending on the rental package. Please check the tariff.
      </>
    ),
  },
];

const CarDetailsContact = ({ car }) => {
  
  const recaptchaRef = useRef();
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
                                              Send message
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
          <div className="carDetailsContactContainerBottom">
              <div className="carDetailsContactContainerBottomContainer">

                  {/* Top Part */}
                  <div className="carDetailsContactContainerBottomContainerTop">
                      <div className="carDetailsContactContainerBottomContainerTopContainer">
                          <p className="carDetailsContactContainerBottomContainerTopContainerText">
                              FAQ’s ABOUT LUXURY CAR RENTALS
                          </p>
                      </div>
                  </div>

                  {/* Bottom Part - FAQ Accordion */}
                  <div className="carDetailsContactContainerBottomContainerBototom">
                      <div className="carDetailsContactContainerBottomContainerBototomContainer">
                        {FAQ_DATA.map((item, idx) => (
                          <div
                            className={`faqAccordionItem${openIndex === idx ? " faqAccordionItem--open" : ""}`}
                            key={idx}
                          >
                            <button
                              className="faqAccordionItemHeader"
                              onClick={() => handleToggle(idx)}
                              aria-expanded={openIndex === idx}
                              aria-controls={`faq-panel-${idx}`}
                              type="button"
                            >
                              <span className="faqAccordionItemHeaderText">{item.question}</span>
                              <span className={`faqAccordionItemHeaderIcon${openIndex === idx ? " faqAccordionItemHeaderIcon--open" : ""}`}>
                                <FiPlus />
                              </span>
                            </button>
                            <div
                              className="faqAccordionItemPanel"
                              id={`faq-panel-${idx}`}
                              style={{
                                maxHeight: openIndex === idx ? 500 : 0,
                                opacity: openIndex === idx ? 1 : 0,
                                pointerEvents: openIndex === idx ? "auto" : "none",
                                transition: openIndex === idx
                                  ? "max-height 0.55s cubic-bezier(.4,0,.2,1), opacity 0.35s cubic-bezier(.4,0,.2,1)"
                                  : "max-height 0.45s cubic-bezier(.4,0,.2,1), opacity 0.25s cubic-bezier(.4,0,.2,1)"
                              }}
                            >
                              <div className="faqAccordionItemPanelInner">
                                <span dangerouslySetInnerHTML={{ __html: typeof item.answer === "string" ? item.answer : "" }} />
                                {typeof item.answer !== "string" && item.answer}
                              </div>
                            </div>
                            <div className="faqAccordionItemDivider" />
                          </div>
                        ))}
                      </div>
                  </div>

              </div>
          </div>

      </div>
    </div>
  )
}

export default CarDetailsContact