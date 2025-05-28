import React from 'react';
import "./contactUs.css";
import ContactUsHero from '../../components/ContactUsHero/ContactUsHero';
import Navbar from '../../components/Navbar/Navbar';
import ContactUsForm from '../../components/ContactUsForm/ContactUsForm';
import ContactUsBusinessOffer from '../../components/ContactUsBusinessOffer/ContactUsBusinessOffer';
import ContactUsRent from '../../components/ContactUsRent/ContactUsRent';

const ContactUs = () => {
  return (
    <div className="contactUs">
        <Navbar />
        <ContactUsHero />
        <ContactUsForm />
        <ContactUsBusinessOffer />
        <ContactUsRent />
    </div>
  )
}

export default ContactUs