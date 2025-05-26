import React from 'react';
import "./ourCollection.css";
import Navbar from '../../components/Navbar/Navbar';
import OurCollectionHero from '../../components/OurCollectionHero/OurCollectionHero';
import OurCollectionList from '../../components/OurCollectionList/OurCollectionList';

const OurCollection = () => {
  return (
    <div className='ourCollection'>
        <Navbar />
        <OurCollectionHero />
        <OurCollectionList />
    </div>
  )
}

export default OurCollection