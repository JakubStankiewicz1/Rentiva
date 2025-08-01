import React from "react";
import "./cooperationWhyUs.css";
import { GoShieldCheck } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";

const CooperationWhyUs = () => {
  return (
    <div className="cooperationWhyUs">
      <div className="cooperationWhyUsContainer">
        {/* Top Part */}
        <div className="cooperationWhyUsContainerTop">
          <div className="cooperationWhyUsContainerTopContainer">
            {" "}
            <p className="cooperationWhyUsContainerTopContainerText bai-jamjuree-regular">Why partner with Rentiva?</p>
          </div>
        </div>{" "}
        {/* Bottom Part */}
        <div className="cooperationWhyUsContainerBottom">
          <div className="cooperationWhyUsContainerBottomContainer">
            {/* Element 1 - Security */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <GoShieldCheck className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>{" "}
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">
                        1. Maximum
                      </p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Security</p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      Your vehicle is in safe hands. Every client undergoes thorough verification, 24/7 GPS monitoring and comprehensive insurance
                      guarantee complete protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Element 2 - Earnings */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <FaDollarSign className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>

                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">2. High</p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Earnings</p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      Earn up to 80% from each rental. Competitive rates and regular payouts ensure steady passive income from your vehicle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Element 3 - Support */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <MdSupportAgent className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>

                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">3. Full</p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Support</p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      Our team is available 24/7. Customer service, technical support and earnings optimization guidance - all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Element 4 - Analytics */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <IoStatsChart className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>

                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">
                        4. Detailed
                      </p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Analytics</p>
                    </div>
                  </div>
                </div>{" "}
                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      Get complete insight into rental statistics. Partner dashboard shows revenue, rental frequency and profit forecasts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Element 5 - Professional Service */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <RiCustomerService2Fill className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>

                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">
                        5. Professional
                      </p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Service</p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      We handle everything - from client verification, through rental organization, to settlements. You just provide the car and
                      collect profits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Element 6 - Growth */}
            <div className="cooperationWhyUsContainerBottomContainerElement">
              <div className="cooperationWhyUsContainerBottomContainerElementContainer">
                {/* Top */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerTop">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainer">
                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOne">
                      <BsGraphUpArrow className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerOneIcon" />
                    </div>

                    <div className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwo">
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextOne bai-jamjuree-regular">
                        6. Continuous
                      </p>
                      <p className="cooperationWhyUsContainerBottomContainerElementContainerTopContainerTwoTextTwo bai-jamjuree-regular">Growth</p>
                    </div>
                  </div>
                </div>{" "}
                {/* Bottom */}
                <div className="cooperationWhyUsContainerBottomContainerElementContainerBottom">
                  <div className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainer">
                    <p className="cooperationWhyUsContainerBottomContainerElementContainerBottomContainerText bai-jamjuree-regular">
                      We continuously develop our platform for partners. New features, expanded market reach and growing earning opportunities are our
                      shared future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CooperationWhyUs;
