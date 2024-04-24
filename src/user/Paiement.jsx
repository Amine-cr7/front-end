import React, { useState } from 'react'
import "../css/paiement.css"
import useFetch from '../api/useFetch'
import { useNavigate, useParams } from 'react-router-dom';
export default function Paiement() {
  const [id,setId] = useState('')
    const user = JSON.parse(localStorage.getItem('user_info'));
    const userId = user ? user.id : null
    const [method, setMethod] = useState('credit')
    const navigate = useNavigate();
    const {data:info} = useFetch(`http://localhost:8000/api/paiement/${userId}`)
    
    const valider = async () => {
        const paiement_info = {method,userId}
        let result = await fetch("http://localhost:8000/api/paiement",{
            method:"POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body:JSON.stringify(paiement_info)
        })
        navigate(`/review`)
        
        window.location.reload()
            
        
    }
    return (
        <div className='container'>
            <div className=''>
                
                <h3>Payment</h3>
                <p>Choose method payment</p>
            </div>
            <div className='row  justify-content-center ' style={{ gap: "50px" }}>
                <div onClick={() => setMethod('paypal')} className={`col-4 border  ${method == "paypal" ? "border-success border-4" : ""} d-flex align-items-center `} style={{ backgroundColor: "lightgrey", height: "150px" }}>
                    <img src="paypal.png" className='img-fluid' alt="" />
                </div>
                <div onClick={() => setMethod('credit')} className={`col-4 border  ${method == "credit" ? "border-success border-4" : ""} d-flex align-items-center `} style={{ backgroundColor: "lightgrey", height: "150px" }}>
                    <img src="credit.png" alt="" className='img-fluid ' srcset="" />
                </div>
            </div>
            <div className='mt-5  '>
                <div className='w-100'>
                    {method == "credit" &&
                        <>
                            <h4><strong>Credit Card Info</strong></h4>
                            <div className='d-flex flex-wrap' style={{ gap: "5px" }}>
                                <div className='form-group  mt-4 '>
                                    <label htmlFor="">Card Holder Name</label>
                                    <input type="text"  className='form-control ' />
                                </div>
                                <div className='form-group  mt-4 '>
                                    <label htmlFor="">Card Number</label>
                                    <input type="text"  placeholder='1234-1234-1234-1234' className='form-control ' />
                                </div>

                                <div className='form-group  mt-4 '>
                                    <label htmlFor="">Expiration Date</label>
                                    <input type="date"  className='form-control ' />
                                </div>
                                <div className='form-group  mt-4 '>
                                    <label htmlFor="">Cvc Number</label>
                                    <input type="text"  placeholder='1234' className='form-control ' />
                                </div>
                                <div className='form-group w-100  mt-4'>
                                    <button className='btn btn-dark form-control' onClick={valider}>Valide Payment</button>
                                </div>
                            </div>
                        </>
                    }
                    {method == "paypal" &&
                        <>
                            <h4><strong>PayPal Info</strong></h4>
                            <p>Enter your PayPal account email </p>
                            <div className='form-group mt-4'>
                                <label htmlFor="">PayPal Account Email</label>
                                <input type="email"  className='form-control' />
                            </div>
                            <div className='form-group w-100 mt-4'>
                                <button className='btn btn-dark form-control' onClick={valider}>Valide Payment</button>
                            </div>
                        </>
                    }
                </div>

            </div>
        </div>
    )
}