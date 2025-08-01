import React from "react";
import "./contactUsForm.css";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsForm = () => {
  return (
    <div className="contactUsForm">
      <div className="contactUsFormContainer">

        {/* Left Part */}
        <div className="contactUsFormContainerLeft">
          <div className="contactUsFormContainerLeftContainer">
            {" "}
            {/* Header */}
            <div className="contactUsFormHeader">
              <p className="contactUsFormHeaderTitle bai-jamjuree-bold">Contact</p>
              <p className="contactUsFormHeaderDesc bai-jamjuree-regular bai-jamjuree-regular">
                Contact our Rentiva team to book your selected vehicle model, arrange pickup or drop-off services, and discover our personalized
                business solutions.
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
                <p className="contactUsFormBoxContentText bai-jamjuree-regular">tel. +48 123 456 789</p>
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
                <p className="contactUsFormBoxContentText bai-jamjuree-regular">kontakt@rentiva.com</p>
              </div>
            </div>{" "}

            {/* Company Info Box */}
            <div className="contactUsFormCompanyBox">
              <div className="contactUsFormCompanyBoxContainer">
                <p className="contactUsFormCompanyBoxTextOne bai-jamjuree-regular">RENTIVA Sp. z o.o.</p>

                <p className="contactUsFormCompanyBoxTextTwo bai-jamjuree-regular">3511 Harley Brook Lane, Howard, Pennsylvania</p>

                <p className="contactUsFormCompanyBoxTextThree bai-jamjuree-regular">Account number:</p>

                <p className="contactUsFormCompanyBoxTextFour bai-jamjuree-regular">PL86249018003112380896033138</p>

                <p className="contactUsFormCompanyBoxTextFive bai-jamjuree-regular">Deposit account number:</p>

                <p className="contactUsFormCompanyBoxTextSix bai-jamjuree-regular">PL86249018003112380896033138</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="contactUsFormContainerRight">
          <div className="contactUsFormContainerRightContainer">
            {" "}

            {/* Header */}
            <div className="contactUsFormFormHeader">
              <span className="contactUsFormFormHeaderText bai-jamjuree-bold">FILL THE FORM</span>
              <span className="contactUsFormFormHeaderLine" />
            </div>

            {/* Form */}
            <form className="contactUsFormForm">
              <input type="text" className="contactUsFormFormInput" placeholder="Full Name" autoComplete="off" />
              <input type="email" className="contactUsFormFormInput" placeholder="Email Address" autoComplete="off" />
              <input type="text" className="contactUsFormFormInput" placeholder="Phone Number" autoComplete="off" />
              <textarea className="contactUsFormFormTextarea" placeholder="Your Message" rows={5} />
              <div className="contactUsFormFormCheckboxGroup">
                <label className="contactUsFormFormCheckboxLabel">
                  <input type="checkbox" className="contactUsFormFormCheckbox" />
                  <span>
                    I declare that I have familiarized myself with the <b>terms and conditions</b> and <b>privacy policy</b> of rentiva.com website.
                  </span>
                </label>
                <label className="contactUsFormFormCheckboxLabel">
                  <input type="checkbox" className="contactUsFormFormCheckbox" />
                  <span>
                    I consent to the processing of my personal data by Rentiva Sp. z o.o. for marketing and promotional purposes including the
                    following communication channels: email, SMS, phone.
                  </span>
                </label>
              </div>
              <div className="contactUsFormFormRecaptcha">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" theme="light" />
              </div>
              <button type="submit" className="contactUsFormFormButton bai-jamjuree-bold">
                SEND MESSAGE
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
