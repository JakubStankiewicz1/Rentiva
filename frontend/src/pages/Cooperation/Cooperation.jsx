import React from 'react';
import "./cooperation.css";
import Navbar from '../../components/Navbar/Navbar';
import CooperationHero from '../../components/CooperationHero/CooperationHero';
import CooperationWhyUs from '../../components/CooperationWhyUs/CooperationWhyUs';
import CooperationHowToStart from '../../components/CooperationHowToStart/CooperationHowToStart';
import CooperationForm from '../../components/CooperationForm/CooperationForm';
import Fotter from '../../components/Fotter/Fotter';

const Cooperation = () => {
  return (
    <div className='cooperation'>
        <Navbar />
        <CooperationHero />
        <CooperationWhyUs />
        <CooperationHowToStart />
        <CooperationForm />
        <Fotter />
    </div>
  )
}

export default Cooperation