import React from 'react';
import "./carDelivery.css";
import { CarDeliveryTop } from '../../components/CarDeliveryTop/CarDeliveryTop';
import CarDeliveryMain from '../../components/CarDeliveryMain/CarDeliveryMain';
import Fotter from '../../components/Fotter/Fotter';

const CarDelivery = () => {
  return (
    <div className='carDelivery'>
      <CarDeliveryTop />
      <CarDeliveryMain />
      <Fotter />
    </div>
  )
}

export default CarDelivery