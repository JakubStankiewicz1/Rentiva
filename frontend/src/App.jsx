import React from 'react';
import "./app.css";
import { Routes, Route } from 'react-router-dom';
import { RentivaProvider } from './Context/context.jsx';
import Home from './pages/Home/Home';
import OurCollection from './pages/OurCollection/OurCollection';
import CarDetails from './pages/CarDetails/CarDetails';
import ContactUs from './pages/ContactUs/ContactUs';
import Cooperation from './pages/Cooperation/Cooperation';
import Navbar from './components/Navbar/Navbar.jsx';
import CarDelivery from './pages/CarDelivery/CarDelivery.jsx';

const App = () => {
  return (
    <RentivaProvider>
      <div className='app'>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<OurCollection />} />
          <Route path="/cooperation" element={<Cooperation />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/car-delivery" element={<CarDelivery />} />
          {/* <Route path="/car/:id/edit" element={<CarDetails />} /> */}
        </Routes>
        
      </div>
    </RentivaProvider>
  )
}

export default App