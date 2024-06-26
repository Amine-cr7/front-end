import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../api/useFetch'

export default function ListFav() {
  const user = JSON.parse(localStorage.getItem('user_info'));
  const userId = user ? user.id : null;
  const { data: produits, isPending, err } = useFetch(`http://localhost:8000/api/fav/${userId}`)
  async function handle_delete(produit_id) {
    if (user) {
      let result = await fetch(`http://localhost:8000/api/fav/${userId}/${produit_id}`, {
        method: "DELETE"
      })
    }

    window.location.reload();
  }
  return (
    <div className=''>
      {err && <div>{err}</div>}
      {isPending ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {produits && produits.length > 0 ? (
            <div className="row">
              {produits.map(item => (
                <div className='col-3' key={item.id}>
                  <div className='border border-1 text-center shadow' style={{ height: "314px", width: "250px" }}>
                    <Link to={`/details/${item.id}`}>
                      <img style={{ width: "250px", height: "250px" }} src={`http://localhost:8000/storage/${item.image}`} alt="" srcset="" />
                    </Link>
                    <button onClick={() => handle_delete(item.id)} className='form-control mt-4 btn btn-outline-danger '>Remove Item</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">Your fav is empty.</div>
          )}
        </>
      )}
    </div>
  );

}