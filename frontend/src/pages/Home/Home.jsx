import React from 'react';
import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import HomeHero from '../../components/HomeHero/HomeHero';

const Home = () => {
  return (
    <div className='home'>
        <Navbar />
        <HomeHero />
    </div>
  )
}

export default Home