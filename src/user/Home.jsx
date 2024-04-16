import React, { useEffect, useState } from 'react'
import useFetch from '../api/useFetch'
import "../css/filter.css"
import { Link, useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user_info'));
  const produits = useFetch("http://localhost:8000/api/produits")
  const teams = useFetch("http://localhost:8000/api/categories")
  const [filters, setFilters] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [priceRange, setPriceRange] = useState(0);
  const [filter_shirt, setFilterShirt] = useState([])
  const [fav, setFav] = useState(JSON.parse(localStorage.getItem('favorites')) || {});
 async function handle_add(e,produit_id){
    e.preventDefault()
   let result = await fetch(`http://localhost:8000/api/fav/${user && user.id}/${produit_id}`,{
      method:"POST"
    })
    setFav({
      ...fav,
      [produit_id]: true
    });
    localStorage.setItem('favorites', JSON.stringify({
      ...fav,
      [produit_id]: true
    }));
    window.location.reload()
  }
 async function handle_delete(e,produit_id){
  e.preventDefault()
  let result = await fetch(`http://localhost:8000/api/fav/${user && user.id}/${produit_id}`,{
      method:"DELETE"
  })
  setFav({
    ...fav,
    [produit_id]: false
  });
  localStorage.setItem('favorites', JSON.stringify({
    ...fav,
    [produit_id]: false
  }));
  window.location.reload()
 }
  useEffect(() => {
    if (produits) {
      setFilterShirt(produits);
    }
  }, [produits]);
  useEffect(() => {
    fetch("http://localhost:8000/api/filters")
      .then(res => res.json())
      .then(data => setFilters(data))
  }, [])

  const [selected_filter, setSelectedFilter] = useState({
    marques: [],
    types: [],
    sizes: [],
    teams: [],
    saisons: []
  })
  const handle_change = (e, filterType) => {
    const value = e.target.value
    setSelectedFilter({
      ...selected_filter,
      [filterType]: selected_filter[filterType].includes(value)
        ? selected_filter[filterType].filter(item => item != value)
        : [...selected_filter[filterType], value]
    })
  }
  const handle_filter = (e) => {
    e.preventDefault()
    let filterKit = produits
    if (selected_filter.marques.length > 0) {
      filterKit = filterKit.filter(item => selected_filter.marques.includes(item.marque))
    }
    if (selected_filter.sizes.length > 0) {
      filterKit = filterKit.filter(item => selected_filter.sizes.includes(item.size))
    }
    if (selected_filter.types.length > 0) {
      filterKit = filterKit.filter(item => selected_filter.types.includes(item.type))
    }
    if (selected_filter.teams.length > 0) {
      filterKit = filterKit.filter(item => selected_filter.teams.includes(`${item.categorie_id}`))
      
    }
    if (selected_filter.saisons.length > 0) {
      filterKit = filterKit.filter(item => selected_filter.saisons.includes(item.saison))
    }
    if (priceRange > 0) {
      filterKit = filterKit.filter(item => +item.prix <= +priceRange)
    }
    setFilterShirt(filterKit)
  };
  return (
    <div className='row' >
      <div className='filter-section   col-2  h-100'  >
        <form action="" className=''>
          <div className=''>
            <h3 className='text-white'>Shirt's Filter</h3>
          </div>
          {filters && Object.keys(filters).map((filterType, index) => (
            <div key={index} className='type'>
              <div className='d-flex justify-content-between'>
                <h4>{filterType}</h4>
                <div className='' data-bs-toggle="collapse" href={`#${filterType}`} role="button" aria-expanded="false" aria-controls={`${filterType}`}>
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
              <div id={`${filterType}`} className='collapse'>
                {filters && filters[filterType].map((item, index) => (
                  <div className='form-group' key={index}>
                    <input className='' type="checkbox" onChange={(e) => handle_change(e, filterType)} value={item} /> {item}
                  </div>
                ))}
              </div>
            </div>
          ))
          }
          <div className='type'>
            <div className='d-flex justify-content-between'>
              <h4>teams</h4>
              <div className='' data-bs-toggle="collapse" href={`#team`} role="button" aria-expanded="false" aria-controls={`team`}>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
            <div id={`team`} className='collapse'>

              {teams && teams.map(item => (
                <div className='form-group' key={item.id}>
                  <input className='' type="checkbox" onChange={(e) => handle_change(e, "teams")} value={+item.id} /> {item.nom}
                </div>
              )).slice(0, showMore ? 20 : 7)}
              <Link onClick={() => setShowMore(!showMore)}>see More</Link>
            </div>
          </div>
          <div className='type'>
            <div className='d-flex justify-content-between'>
              <h4>price</h4>
              <div className='' data-bs-toggle="collapse" href={`#price`} role="button" aria-expanded="false" aria-controls={`price`}>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
            <div className='collapse' id='price' >
              <div className='d-flex justify-content-between' style={{ gap: "10px" }}>
                <span>0dh</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={+priceRange}
                  onChange={(e) => setPriceRange(+e.target.value)}
                  className='form-range'
                />
                <span>5000dh</span>
              </div>
              <h4 className='text-center'>{priceRange}Dh</h4>
            </div>
          </div>
          <div className='d-flex justify-content-center mt-3 mb-4' style={{ gap: "10px" }}>
            <input type="reset" className='btn btn-danger' onClick={() => {
              setSelectedFilter({ marques: [], types: [], sizes: [], teams: [], saisons: [] })
              setPriceRange(0)
            }} />
            <button className='btn text-white ' style={{backgroundColor:"#292C35"}} onClick={handle_filter}>filtrer</button>
          </div>
        </form>
      </div>
      <div className='display-product col-9'>

        <div className='d-flex flex-wrap col-12 ms-5  ' style={{gap:"60px"}} >
          {filter_shirt && filter_shirt.map(item => (
            <div key={item.id} className=" border-0 mb-5 rounded-0 shadow" style={{ width: "18rem" }}>
              <div className='text-center' >
                <img src={`http://localhost:8000/storage/${item.image}`} className='img-fluid ' style={{ height: "150px" }} alt="" />
              </div>
              <div className='p-2'>
                <div className='mt-4 d-flex justify-content-between'>
                  <div className=' h5 ' style={{ height: "60px", width: "200px" }}>{item.nom}</div>
                  <div>
                    <Link to={!user && "/login"} className='btn' onClick={(e)=>user && !fav[item.id] ? handle_add(e,item.id) : user && handle_delete(e,item.id) } >
                    <i className={`fa-solid fs-4 ${fav[item.id] ? "text-danger" : "text-dark"} fa-heart`}></i>
                  </Link>
                  </div>
                </div>
                <div className='footer d-flex align-items-center mt-4 row '>
                  <div className='h4 fs-5 font-weight-bold col-4'>{Math.round(item.prix)}DH</div>
                  <div className='col-8'>
                    <Link to={`details/${item.id}`} className='btn btn-dark w-100 p-3 rounded-0 text-warning'>Show Product</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}