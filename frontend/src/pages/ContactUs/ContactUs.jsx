import React from 'react';
import "./contactUs.css";
import ContactUsHero from '../../components/ContactUsHero/ContactUsHero';
import Navbar from '../../components/Navbar/Navbar';

const ContactUs = () => {
  return (
    <div className="contactUs">
        <Navbar />
        <ContactUsHero />
    </div>
  )
}

export default ContactUs