import React, {Fragment} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom';
import Main from './pages/Main.js';
import ContactUs from './pages/ContactUs.js'; // Import Halaman Contact Us
import AboutUs from './pages/AboutUs.js'; // Import  Halaman About Us
import Navbar from './components/Navbar'; // Import Component Navbar

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Fragment>
      <Navbar/> {/* Memanggil Component Navbar */}
      <Routes>
        <Route path="/contact-us" element={<ContactUs/>}/> {/* Merender Halaman COntct Us pada path contact-us  */}
        <Route path="/about-us" element={<AboutUs/>}/>  {/* Merender Halaman About Us pada path contact-us  */}
        <Route exact path="/" element={<Main/>}/>  {/* Merender Halaman Main pada path contact-us  */}
      </Routes>
      
    </Fragment>
  </Router> ,
  document.getElementById('root')
);
