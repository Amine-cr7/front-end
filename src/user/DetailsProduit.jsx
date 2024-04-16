import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../api/useFetch'
import "../css/details.css"
export default function DetailsProduit() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user_info'));
  const produits = useFetch("http://localhost:8000/api/produits")
  const details = produits && produits.find(item => item.id == id)
  const [showImages, setShowImages] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/api/images")
      .then(res => res.json())
      .then(data => setShowImages(data.filter(item => item.produit_id == id)))
  }, [])
  return (
    <div className='container' style={{height:"750px"}}>
      {details && 
      <div className='row'>
        <div className='col-7 mt-5'>
          <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-inner">
            {showImages && showImages.map((item,index) => (
                <div key={item.id} style={{height:"550px"}}  className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                <img src={`http://localhost:8000/storage/${item.image}`} className="d-block w-100" alt="..." />
              </div>
              ))}
            </div>
            <button className="carousel-control-prev "  type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
              <span className="carousel-control-prev-icon " style={{backgroundColor:"black",color:"black"}}></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
              <span className="carousel-control-next-icon" style={{backgroundColor:"black",color:"black"}} aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='col-5 '>
          <div className='mx-4' >
            <div>
              <h3 className='' style={{fontWeight:"bolder"}}>
                {details.nom}
              </h3>
              <h4 className='text-danger' style={{fontWeight:"bolder"}}>{details.prix}DH</h4>
            </div>
            <div className='mt-4 d-flex' style={{gap:"30px"}}>
                <input type="number" value={1} className=' form-control' style={{width:"60px"}} min={1} max={10} />
                <Link to={!user && "/login" } className='btn w-50 form-control btn-dark text-warning d-flex align-items-center  ' style={{gap:"40px"}} >
                  <span><i className="fa-solid fa-cart-shopping"></i></span>
                   <span className='fw-bold fs-5'>Add To Cart</span>
                </Link>
            </div>
            <div className='mt-5'>
                <ul className='info-pro'>
                  <li>Product Size: <span>{details.size}</span></li>
                  <li>Product Style: <span>{details.type}</span></li>
                  <li>Seasons: <span>{`${details.saison}-${+details.saison+ 1}`}</span></li>
                  <li>Brand: <span>{details.marque}</span></li>
                  <li>Item Number: <span>{details.id}</span></li>
                </ul>
            </div>
          </div>
          
        </div>
      </div>
      }
    </div>

  )
}