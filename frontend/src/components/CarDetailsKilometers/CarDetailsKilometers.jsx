import React from 'react';
import './carDetailsKilometers.css';

const CarDetailsKilometers = () => {
  return (
    <div className='carDetailsKilometers'>
        <div className="carDetailsKilometersContainer">
            {/* Top Part */}
            <div className="carDetailsKilometersTop">
                <div className="carDetailsKilometersTopContainer">
                    <p className="carDetailsKilometersTopContainerText">
                        Kilometers
                    </p>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="carDetailsKilometersBottom">
                <div className="carDetailsKilometersBottomContainer">
                    <div className="carDetailsKilometersTableWrapper">
                      <table className="carDetailsKilometersTable">
                        <thead>
                          <tr>
                            <th>
                                <p className="carDetailsKilometersTableText bai-jamjuree-regular">
                                    Daily mileage limit
                                </p>
                            </th>
                            <th>
                                <p className="carDetailsKilometersTableText bai-jamjuree-regular">
                                    Monthly mileage limit
                                </p>
                            </th>
                            <th>
                                <p className="carDetailsKilometersTableText bai-jamjuree-regular">
                                    Cost of additional kilometer
                                </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                                <p className="carDetailsKilometersTableTextTwo bai-jamjuree-regular">
                                    50-90
                                </p>
                            </td>
                            <td>
                                <p className="carDetailsKilometersTableTextTwo bai-jamjuree-regular">
                                    1500
                                </p>
                            </td>
                            <td>
                                <p className="carDetailsKilometersTableTextTwo bai-jamjuree-regular">
                                    550 PLN
                                </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarDetailsKilometers