import React, { useEffect, useState } from 'react';
import useFetch from '../api/useFetch';
import '../css/shop.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const user = JSON.parse(localStorage.getItem('user_info'));
  const userId = user ? user.id : null;
  const { data: cart_produits, isPending } = useFetch(
    `http://localhost:8000/api/cart/${userId}`
  );
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false);
  const [qnt, setQnt] = useState({});
  const [state, setState] = useState(null);
  useEffect(() => {
    if (cart_produits) {
      const init = {};
      cart_produits.forEach((ele) => {
        init[ele.id] = ele.pivot.qnt;
      });
      setQnt(init);
    }
  }, [cart_produits]);

  let totalPrice = 0;
  if (cart_produits) {
    cart_produits.forEach((item) => {
      const subtotal = item.prix * qnt[item.id];
      totalPrice += subtotal;
    });
  }
  const handle_change = (quantity, id) => {
    setQnt((prevQnt) => ({
      ...prevQnt,
      [id]: quantity,
    }));
  };

  const handle_save = async () => {
    let result = await fetch(`http://localhost:8000/api/cart/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(qnt),
    });
    result = await result.json();
    if (result.message) {
      setState(result.message);
    }
    setEdit(!edit);
  };

  if (state != null) {
    setTimeout(() => {
      setState(null);
    }, 4000);
  }

  const handle_delete = async (id) => {
   let result =  await fetch(`http://localhost:8000/api/cart/${userId}/${id}`, {
      method: 'DELETE',
    });
    navigate(0)
  };
  const handle_checkout = async () => {
    const order_data = {
      user_id:userId,
      produits:cart_produits.map(item => ({produit_id:item.id,quantity:qnt[item.id]}))
    }
    let result = await fetch('http://localhost:8000/api/commande',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body:JSON.stringify(order_data)
    })
    
    
    navigate("/checkout")
  }
  return (
    <div className='shop-cart  p-5'>
      {isPending ? (
        <div className="d-flex  justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {cart_produits && cart_produits.length > 0 ? (
            <>
              <h4>Shopping Cart</h4>
              <div className='row mt-5'>
                <div className='col-8'>
                  {state && (
                    <div className='alert alert-success' role='alert'>
                      {state}
                    </div>
                  )}
                  {cart_produits.map((item) => (
                    <>
                    <div
                      key={item.id}
                      className='d-flex mb-3 mt-3 align-items-center justify-content-between'
                    >
                      <div className='col-2'>
                        <img
                          className='img-fluid w-100'
                          style={{ height: '100px' }}
                          src={`http://localhost:8000/storage/${item.image}`}
                        />
                      </div>
                      <div className='col-2'>
                        <h5>{item.nom}</h5>
                      </div>
                      <div className='col-1'>
                        <input
                          type='number'
                          value={+qnt[item.id] || ''}
                          min={1}
                          max={10}
                          onChange={(e) => handle_change(+e.target.value, item.id)}
                          disabled={!edit}
                          className='form-control'
                        />
                      </div>
                      <div className='col-2'>
                        <h4>{item.prix * qnt[item.id]} DH</h4>
                      </div>
                      <div className='col-1'>
                        <button
                          className='btn'
                          onClick={() => handle_delete(item.id)}
                        >
                          <i className='fas fa-remove'></i>
                        </button>
                      </div>
                      
                    </div>
                      <div className='border border-1 w-100'></div>
                      </>
                  ))}
                  
                  <div className='d-flex justify-content-end mt-3'>
                    {!edit ? (
                      <button
                        className='btn btn-success'
                        onClick={() => setEdit(!edit)}
                      >
                        Edit <span><i className='fas fa-edit'></i></span>
                      </button>
                    ) : (
                      <div>
                        <button
                          className='btn btn-warning me-2'
                          onClick={handle_save}
                        >
                          Save <span><i className='fas fa-save'></i></span>
                        </button>
                        <button
                          className='btn  btn-danger'
                          onClick={() => setEdit(!edit)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-4'>
                  <div className='border p-3 border-1'>
                    
                      <h1>Total Cart</h1>
                      <div className='d-flex  justify-content-between'>
                        <p>Sub Total</p>
                        <p>{totalPrice}</p>
                      </div>
                      <div className='border border-1 w-100'></div>
                      <div className='d-flex  justify-content-between'>
                        <h1>Total</h1>
                        <h1>{totalPrice}</h1>
                      </div>
                      <button className='btn btn-dark form-control' onClick={handle_checkout} >Procceed To checkout</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='text-center'>Your cart is empty.</div>
          )}
        </>
      )}
    </div>
  );
}
