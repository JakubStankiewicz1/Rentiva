import React from 'react';
import "./carDetailsPayment.css";
import assets from '../../assets/assets';

const CarDetailsPayment = () => {
  return (
    <div className='carDetailsPayment'>
        <div className="carDetailsPaymentContainer">
            {/* Top Part */}
            <div className="carDetailsPaymentContainerTop">
                <div className="carDetailsPaymentContainerTopContainer">
                    <p className="carDetailsPaymentContainerTopContainerText bai-jamjuree-regular">
                        Payment methods
                    </p>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="carDetailsPaymentContainerBottom">
                <div className="carDetailsPaymentContainerBottomContainer">
                    <img src={assets.CarDetailsPaymentImage} alt="" className='carDetailsPaymentContainerBottomContainerImage' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarDetailsPayment