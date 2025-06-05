import React from 'react';
import "./carDetailsTariff.css";

const CarDetailsTariff = ({ car }) => {
  if (!car || !car.pricing) {
    return null;
  }

  const { pricing } = car;

  return (
    <div className='carDetailsTariff'>
      <div className="carDetailsTariffContainer">

        {/* Top Part */}
        <div className="carDetailsTariffContainerTop">
          <div className="carDetailsTariffContainerTopContainer">
            <p className="carDetailsTariffContainerTopContainerText bai-jamjuree-regular">
              Tariff
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="carDetailsTariffTableWrapper">
          <table className="carDetailsTariffTable">
            <thead>
              <tr>
                <th>
                  <p className="carDetailsTariffTableDay bai-jamjuree-regular">
                    Day
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDaTwo bai-jamjuree-regular">
                    2-3 days
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDayThree bai-jamjuree-regular">
                    4-6 days
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDayWeek bai-jamjuree-regular">
                    Week
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDayWeekTwo bai-jamjuree-regular">
                    Two weeks
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDayMonth bai-jamjuree-regular">
                    Month
                  </p>
                </th>
                <th>
                  <p className="carDetailsTariffTableDayDeposit bai-jamjuree-regular">
                    Deposit
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueTextOne bai-jamjuree-regular">{pricing.daily} PLN</p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubText bai-jamjuree-regular">
                      gross / day
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueText bai-jamjuree-regular">
                      {pricing.twoDays} PLN
                    </p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubText bai-jamjuree-regular">
                      gross / 2 days
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueText bai-jamjuree-regular">
                      {pricing.threeDays} PLN
                    </p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubText bai-jamjuree-regular">
                      gross / 3 days
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueTextTwo bai-jamjuree-regular">
                      {pricing.weekly} PLN
                    </p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubTextTwo bai-jamjuree-regular">
                      gross / 7 days
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueTextTwo bai-jamjuree-regular">
                      {Math.round(pricing.weekly * 2 * 0.9)} PLN
                    </p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubTextTwo bai-jamjuree-regular">
                      gross / 14 days
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueTextTwo bai-jamjuree-regular">
                      {pricing.monthly} PLN
                    </p>
                  </span>
                  <span className="carDetailsTariffTableSub">
                    <p className="carDetailsTariffTableSubTextTwo bai-jamjuree-regular">
                      gross / month
                    </p>
                  </span>
                </td>
                <td>
                  <span className="carDetailsTariffTableValue">
                    <p className="carDetailsTariffTableValueText bai-jamjuree-regular">
                      {Math.round(pricing.daily * 10)} PLN
                    </p>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Part */}
        <div className="carDetailsTariffContainerBottom">
          <div className="carDetailsTariffContainerBottomContainer">
            <p className="carDetailsTariffContainerBottomContainerText bai-jamjuree-regular">
              <span className="carDetailsTariffNote">*NOTE</span> - IF YOU WOULD LIKE A QUOTE FOR A NON-STANDARD RENTAL PERIOD, NOT INCLUDED IN THE PRICE LIST, PLEASE CONTACT OUR <span className="carDetailsTariffCustomer">CUSTOMER SERVICE</span>.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CarDetailsTariff;