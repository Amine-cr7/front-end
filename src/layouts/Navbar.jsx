import React, { useEffect, useState } from 'react'
import "../css/navbar.css"
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import useFetch from '../api/useFetch'
export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user_info'));
  const [len,setLen] = useState(0)
  const [lenCart,setLenCart] = useState(0)
  useEffect(()=>{
    fetch(`http://localhost:8000/api/fav/${user?.id || ""}`)
    .then(res => res.json())
    .then(data => setLen(data.length))
  },[user])
  useEffect(()=>{
    fetch(`http://localhost:8000/api/cart/${user?.id || ""}`)
    .then(res => res.json())
    .then(data => setLenCart(data.length))
  },[])
  return (
    <div>
      <nav className='navbar navbar-expand-lg '>
        <div className="container d-flex justify-content-between">
          <a href="" className='navbar-brand'>
            <img src="/logo.png" className='' />
          </a>
          <div className='' id='search'>
            <input type="text" className='' placeholder='search in e-shirt' />
            <i className="fas fa-search fs-5"></i>
          </div>
          
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to={user ? "/fav" : "/login"} className='text-black nav-link'>
                <i className="fas fa-heart fs-5"></i>
                <span className='fav-length'>{len != 0 ? len  : ""}</span>
              </Link>
              
            </li>
            <li className='nav-item'>
              <Link to={user ? "/cart" : "/login"} className='text-black nav-link'>
                <i className="fa-solid fa-bag-shopping fs-5"></i>
                <span className='fav-length'>{lenCart != 0 ? lenCart  : ""}</span>
              </Link>
            </li>
            {!localStorage.getItem('user_info') ?
              <li className='nav-item'>
                <Link to={"/login"} className='text-black nav-link'>
                  <i className="fas fa-user fs-5"></i>
                </Link>
              </li>
              :
              <li className="nav-item dropdown">
                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.name}
                </a>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" onClick={()=>{
                    localStorage.clear()
                    window.location.reload()
                  }}>
                      Logout
                  </Link>
                </div>
              </li>
              
            }
            {user && user.role == 'admin' ? <li className='nav-item'><Link className='nav-link' to={"/produits"}>Admin</Link></li>:null}
          </ul>
        </div>
      </nav>
    </div>
  )
}