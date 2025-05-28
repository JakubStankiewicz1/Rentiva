import React from 'react';
import "./contactUsForm.css";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsForm = () => {
  return (
    <div className='contactUsForm'>
      <div className="contactUsFormContainer">

        {/* Left Part */}
        <div className="contactUsFormContainerLeft">
          <div className="contactUsFormContainerLeftContainer">

            {/* Header */}
            <div className="contactUsFormHeader">
              <p className="contactUsFormHeaderTitle bai-jamjuree-bold">
                Contact
              </p>
              <p className="contactUsFormHeaderDesc bai-jamjuree-regular bai-jamjuree-regular">
                Contact our JustCars Premium Rent Team to book a selected car model, pick up or drop off the car, and to learn about an individual offer for business.
              </p>
            </div>

            {/* Phone Box */}
            <div className="contactUsFormBox">
              <div className="contactUsFormBoxHeaderBg">
                <div className="contactUsFormBoxHeader">
                  <span className="contactUsFormBoxIcon">
                    <IoMdPhonePortrait />
                  </span>
                  <span className="contactUsFormBoxLabel bai-jamjuree-regular">PHONE</span>
                </div>
              </div>
              <div className="contactUsFormBoxContent">
                <span className="contactUsFormBoxContentText bai-jamjuree-regular">tel. +48 695 712 712</span>
              </div>
            </div>

            {/* Email Box */}
            <div className="contactUsFormBox">
              <div className="contactUsFormBoxHeaderBg">
                <div className="contactUsFormBoxHeader">
                  <span className="contactUsFormBoxIcon">
                    <MdOutlineMail />
                  </span>
                  <span className="contactUsFormBoxLabel bai-jamjuree-regular">E-MAIL</span>
                </div>
              </div>
              <div className="contactUsFormBoxContentEmail">
                <span className="contactUsFormBoxContentText bai-jamjuree-regular">kontakt@justcarspremium.com</span>
              </div>
            </div>

            {/* Company Info Box */}
            <div className="contactUsFormCompanyBox">
              <div className="contactUsFormCompanyBoxContainer">
                <p className="contactUsFormCompanyBoxTextOne bai-jamjuree-regular">
                  CAR JUSTART POLSKA Sp. z o.o.
                </p>

                <p className="contactUsFormCompanyBoxTextTwo bai-jamjuree-regular">
                  Kubusia Puchatka Street 2, 05-082 Stare Babice
                </p>

                <p className="contactUsFormCompanyBoxTextThree bai-jamjuree-regular">
                  Account number:
                </p>

                <p className="contactUsFormCompanyBoxTextFour bai-jamjuree-regular">
                  44 1600 1462 1856 6897 5000 0001
                </p>

                <p className="contactUsFormCompanyBoxTextFive bai-jamjuree-regular">
                  Account number for deposit:
                </p>

                <p className="contactUsFormCompanyBoxTextSix bai-jamjuree-regular">
                  76 1600 1462 1856 6897 5000 0007
                </p>

              </div>
            </div>






          </div>
        </div>

        {/* Right Part */}
        <div className="contactUsFormContainerRight">
          <div className="contactUsFormContainerRightContainer">
            {/* Header */}
            <div className="contactUsFormFormHeader">
              <span className="contactUsFormFormHeaderText bai-jamjuree-bold">
                FILL THE FORM
              </span>
              <span className="contactUsFormFormHeaderLine" />
            </div>
            {/* Form */}
            <form className="contactUsFormForm">
              <input
                type="text"
                className="contactUsFormFormInput"
                placeholder="Name/Second Name"
                autoComplete="off"
              />
              <input
                type="email"
                className="contactUsFormFormInput"
                placeholder="E-mail address"
                autoComplete="off"
              />
              <input
                type="text"
                className="contactUsFormFormInput"
                placeholder="Call us to hire this car"
                autoComplete="off"
              />
              <textarea
                className="contactUsFormFormTextarea"
                placeholder="Type your message"
                rows={5}
              />
              <div className="contactUsFormFormCheckboxGroup">
                <label className="contactUsFormFormCheckboxLabel">
                  <input type="checkbox" className="contactUsFormFormCheckbox" />
                  <span>
                    I declare that I have familiarized myself with the <b>regulations</b> i <b>privacy policy</b> of justcarspremium.com website.
                  </span>
                </label>
                <label className="contactUsFormFormCheckboxLabel">
                  <input type="checkbox" className="contactUsFormFormCheckbox" />
                  <span>
                    I consent to the processing of my personal data by Car Justart Sp. z o.o. for marketing and offering purposes including the following communication channels email, sms, phone.
                  </span>
                </label>
              </div>
              <div className="contactUsFormFormRecaptcha">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  theme="light"
                />
              </div>
              <button type="submit" className="contactUsFormFormButton bai-jamjuree-bold">
                BOOK THIS CAR
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactUsForm;