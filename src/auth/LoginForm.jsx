import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "../css/auth.css"
function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }
    setError(newErr)
    return valid
  }
  async function handle_submit(e) {
    e.preventDefault()
    if (validateForm()) {
      const item = { email, password }
      let result = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify(item)
      })
      result = await result.json()
      if (result.error) {
        setError({ data: result.error })
      } else {
        localStorage.setItem('user_info', JSON.stringify(result))
        navigate("/")
      }
    }

  }

  return (
    <div className="container auth  " >
      <div className='d-flex justify-content-center align-items-center vh-100 ' >
        <div className='col-6 p-4 '>
          <div className='p-5'>
            <h1 className='fs-1' style={{ color: "orange" }}>E-SHIRT</h1>
            <p className='fw-bold  fs-5'> Discover a winning lineup of football themed shirts tailored for fans of the game.</p>
          </div>
        </div>
        <div className='col-6'>
          <div className='login'>
            <form action="" onSubmit={handle_submit}>
              <div>
                <label>Email<span className="text-danger">*</span></label>
                <div className='input-group'>
                  <div className="input-group-text"><i className="fa-solid fa-envelope"></i></div>
                  <input type="text" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email"></input>
                </div>
                <span>{error && error.email}</span>
              </div>
              <div className='mt-4'>
              <label>Password<span className="text-danger">*</span></label>
              <div className='input-group '>
                <div className="input-group-text"><i className="fas fa-lock"></i></div>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password"></input>
              </div>
              <span>{error && error.password}</span>
              </div>
              <span>{error && error.data}</span>
              
              <div className='mt-4 px-5'>
                <button type='submit' className='btn btn-primary  form-control'>Login</button>
              </div>
            </form>
            <hr />
            <div className='d-flex justify-content-center'>
            <Link to={"/register"} className='btn fs-5 btn-success'>Create New Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default LoginForm;
