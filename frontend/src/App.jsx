import React from 'react';
import "./app.css";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import OurCollection from './pages/OurCollection/OurCollection';

const App = () => {
  return (
    <div className='app'>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<OurCollection />} />
      </Routes>
      
    </div>
  )
}

export default App