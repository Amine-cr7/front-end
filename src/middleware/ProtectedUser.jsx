import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import "../css/app.css"
import Footer from '../layouts/Footer';
export default function ProtectedUser({ Compenent }) {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate])
    return (
        <div className="wrapper">
          
    
          
          <Navbar />
          <div className="content mb-5 container-fluid">
            <Compenent />
          </div>
          
        </div>
      );
}