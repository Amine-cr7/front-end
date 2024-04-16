import React, { useEffect, useState } from 'react'
import "../css/navbar.css"
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import useFetch from '../api/useFetch'
export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user_info'));
  // const [favlength, setFavlength] = useState(0);
  // const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  // const length = Object.values(favorites).filter(value => value === true).length;
  // useEffect(() => {
  //   setFavlength(length);
  // }, [favorites]);
  const produits = useFetch(`http://localhost:8000/api/fav/${user && user.id}`)
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
              <Link to={user ? `/fav/${user.id}` : "/login"} className='text-black nav-link'>
                <i className="fas fa-heart fs-5"></i>
               {produits && <span className='fav-length'>{produits.length != 0 ? produits.length  : ""}</span>}
              </Link>
              
            </li>
            <li className='nav-item'>
              <Link to={""} className='text-black nav-link'>
                <i className="fa-solid fa-bag-shopping fs-5"></i>
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