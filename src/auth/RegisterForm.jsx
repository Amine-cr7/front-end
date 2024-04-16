import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom"
import { useHistory } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [error, setError] = useState({});
  const validateForm = () => {
    let valid = true
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErr = {}
    if (!email) {
      newErr.email = "this field is required *"
      valid = false
    } else if (!validEmail.test(email)) {
      newErr.email = "Invalid email address *";
      valid = false;
    }
    if (!password) {
      newErr.password = "this  filed is required *"
      valid = false
    }else if(!password.length >= 8 ){
      newErr.password = "At Least 8 Characthers *"
      valid = false
    }
    if(!name){
      newErr.name = "this  filed is required *"
      valid = false
    }
    setError(newErr)
    return valid
  }
  async function handle_submit(e) {
    
    e.preventDefault()
    if(validateForm()){
    const item = { name, email, password }
    let result = await fetch("http://localhost:8000/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(item)
    })
    result = await result.json()
    if(result.message){
      setError({data:result.message})
    }else{
      navigate("/login")
    }
    }
  }
  return (
    <div className='container ' >
      <div className='d-flex justify-content-center  align-items-center vh-100' >
        <div className='login w-50' style={{height:"420px"}}>
          <form action="" onSubmit={handle_submit}>
            <div>
              <label>Email<span className="text-danger">*</span></label>
              <div className='input-group'>
                <div className="input-group-text"><i className="fa-solid fa-envelope"></i></div>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email"></input>
              </div>
              <span className='text-danger'>{error && error.email}</span>
            </div>
            <span className='text-danger'>{error && error.data}</span>
            <div className='mt-4'>
              <label>UserName<span className="text-danger">*</span></label>
              <div className='input-group '>
                <div className="input-group-text"><i className="fas fa-user"></i></div>
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Username"></input>
              </div>
              <span className='text-danger'>{error && error.name}</span>
            </div>
            <div className='mt-4'>
              <label>Password<span className="text-danger">*</span></label>
              <div className='input-group '>
                <div className="input-group-text"><i className="fas fa-lock"></i></div>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password"></input>
              </div>
              <span className='text-danger'>{error && error.password}</span>
            </div>
            <div className='mt-4 px-5'>
              <button type='submit' className='btn btn-primary  form-control'>SIGN UP</button>
            </div>
            <p className='text-center mt-2'>Already Have Account ? <Link to={"/login"}>  Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;