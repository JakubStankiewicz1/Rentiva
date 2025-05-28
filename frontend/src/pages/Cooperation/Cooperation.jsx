import React from 'react';
import "./cooperation.css";
import Navbar from '../../components/Navbar/Navbar';
import CooperationHero from '../../components/CooperationHero/CooperationHero';
import CooperationWhyUs from '../../components/CooperationWhyUs/CooperationWhyUs';
import CooperationHowToStart from '../../components/CooperationHowToStart/CooperationHowToStart';

const Cooperation = () => {
  return (
    <div className='cooperation'>
        <Navbar />
        <CooperationHero />
        <CooperationWhyUs />
        <CooperationHowToStart />
    </div>
  )
}

export default Cooperation