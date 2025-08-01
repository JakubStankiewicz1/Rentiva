import React from "react";
import "./carDeliveryTop.css";

export const CarDeliveryTop = () => {
  return (
    <div className="carDeliveryTop">
      <div className="carDeliveryTopContainer">
        <div className="carDeliveryTopContainerDiv">
          {/* First Part */}
          <div className="carDeliveryTopContainerDivFirst">
            <div className="carDeliveryTopContainerDivFirstContainer">
              <p className="carDeliveryTopContainerDivFirstContainerText bai-jamjuree-regular">Car Delivery</p>
            </div>
          </div>

          {/* Second Part */}
          <div className="carDeliveryTopContainerDivSecond">
            <div className="carDeliveryTopContainerDivSecondContainer">
              <p className="carDeliveryTopContainerDivSecondContainerText bai-jamjuree-regular">
                At JustCars Premium, we deliver our cars wherever you choose. Take a look at the price list for deliveries to specific locations and
                the list of cars available in this offer:
              </p>
            </div>
          </div>

          {/* Third Part */}
          <div className="carDeliveryTopContainerDivThird">
            <div className="carDeliveryTopContainerDivThirdContainer">
              <div className="carDeliveryTopContainerDivThirdContainerOne">
                <p className="carDeliveryTopContainerDivThirdContainerOneText bai-jamjuree-regular">Pricing of car delivery:</p>
              </div>{" "}
              <div className="carDeliveryTopContainerDivThirdContainerTwo">
                <div className="carDeliveryTopContainerDivThirdContainerTwoContainer">
                  {" "}
                  <div className="pricingTable">
                    <div className="pricingTableRow pricingTableHeader">
                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">Lodz</p>
                      </div>

                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">Tri-Cities</p>
                      </div>

                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">Krakow</p>
                      </div>

                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">Katowice</p>
                      </div>
                    </div>
                    <div className="pricingTableRow pricingTableData">
                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">700 PLN</p>
                      </div>
                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">1699 PLN</p>
                      </div>
                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">1699 PLN</p>
                      </div>
                      <div className="pricingTableCell bai-jamjuree-regular">
                        <p className="pricingTableCellText bai-jamjuree-regular">1699 PLN</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Part */}
          <div className="carDeliveryTopContainerDivFourth">
            <div className="carDeliveryTopContainerDivFourthContainer">
              <p className="carDeliveryTopContainerDivFourthContainerText bai-jamjuree-regular">
                If you need car delivery to a location not listed in the table, please contact our Customer Service
              </p>
              <p className="carDeliveryTopContainerDivFourthContainerTextTwo bai-jamjuree-regular">Customer Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
