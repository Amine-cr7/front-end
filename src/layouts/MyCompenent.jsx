import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/app.css';
import { Link } from 'react-router-dom';

export default function MyCompenent({ Compenent }) {
  return (
    <div className="wrapper">



      <Navbar />
      <div className="content mb-5 container-fluid">
        <Compenent />
        {window.location.pathname !== "/" &&
          <div className='mt-5 text-center'>
            <Link to={"/"}>Return to Home Page</Link>
          </div>
        }

      </div>
      <Footer />
    </div>
  );
}