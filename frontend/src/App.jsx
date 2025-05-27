import React from 'react';
import "./app.css";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import OurCollection from './pages/OurCollection/OurCollection';
import CarDetails from './pages/CarDetails/CarDetails';
import ContactUs from './pages/ContactUs/ContactUs';

const App = () => {
  return (
    <div className='app'>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<OurCollection />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
      
    </div>
  )
}

export default App