import React, { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ListProduits from './admin/ListProduits';
import AddProduct from './admin/AddProduits';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Protected from './middleware/Protected';
import ProtectedLogin from './middleware/ProtectedLogin';
import MyCompenent from './layouts/MyCompenent';
import Home from './user/Home';
import EditProduits from './admin/EditProduits';
import AddImage from './admin/AddImage';
import DetailsImage from './admin/DetailsImage';
import DetailsProduit from './user/DetailsProduit';
import ListFav from './user/ListFav';
import Cart from './user/Cart';
import ProtectedUser from './middleware/ProtectedUser';
import Checkout from './user/Checkout';
import Paiement from './user/Paiement';
import Review from './user/Review';
export default function App() {
  return (
    <BrowserRouter>           
        <Routes>
          <Route path='/' element={<MyCompenent Compenent={Home}/>}/>
          <Route path='/details/:id' element={<MyCompenent Compenent={DetailsProduit}/>}/>
          <Route path='/checkout' element={<ProtectedUser Compenent={Checkout}/>}/>
          <Route path='/paiement' element={<ProtectedUser Compenent={Paiement}/>}/>
          <Route path='/review' element={<ProtectedUser Compenent={Review}/>}/>
          <Route path='/login' element={<ProtectedLogin Compenent={LoginForm}/>} />
          <Route path='/fav' element={<ProtectedUser Compenent={ListFav}/>} />
          <Route path='/cart' element={<ProtectedUser Compenent={Cart}/>} />
            <Route path='/register' element={<ProtectedLogin Compenent={RegisterForm}/>}/>
            <Route path='/produits' element={<Protected Compenent={ListProduits}/>}/>
            <Route path='/produits/create' element={<Protected Compenent={AddProduct}/>}/>
            <Route path='/produits/:id/edit' element={<Protected Compenent={EditProduits}/>}/>
            <Route path='/images/:id/add' element={<Protected Compenent={AddImage}/>}/>
            <Route path='/images/:id/show' element={<Protected Compenent={DetailsImage}/>}/>
        </Routes>
    </BrowserRouter>
  )
}