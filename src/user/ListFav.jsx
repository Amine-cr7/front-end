import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../api/useFetch'

export default function ListFav() {
  const { id } = useParams()
  const produits = useFetch(`http://localhost:8000/api/fav/${id}`)
  async function handle_delete (produit_id){
    let result = await fetch(`http://localhost:8000/api/fav/${id}/${produit_id}`,{
      method:"DELETE"
    })
    window.location.reload();
  }
  return (
    <div className=''>
      <div className="row">
        {produits && produits.map(item => (
          <div className='col-3' key={item.id}>
            <div className='border border-1  text-center shadow' style={{height:"314px",width:"250px"}}>
            <Link to={`/details/${item.id}`}>  <img style={{width:"250px",height:"250px"}} src={`http://localhost:8000/storage/${item.image}`} alt="" srcset="" /></Link>
              <button onClick={()=>handle_delete(item.id)} className='form-control mt-4 btn btn-outline-danger '>Remove Item</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}