import { Axios } from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from "react-router-dom"
import useFetch from '../api/useFetch';

function ListProduits() {
    
    const [categorieId, setCategorieId] = useState('');
    const produits = useFetch("http://localhost:8000/api/produits")
    const categories = useFetch("http://localhost:8000/api/categories")
    const produit_cat = produits && produits.filter(item => item.categorie_id == categorieId)
    return (
        <div className='w-100'>

            <div className="d-flex justify-content-between">
                <h1>List Produits</h1>
                <div>
                    <Link className="btn btn-info" to="/produits/create">Ajouter Produit</Link>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label' >Select Team</label>
                <select className="form-select" onChange={(e) => setCategorieId(e.target.value)}>
                    <option value="" >Choose Categorie</option>
                    { categories && categories.map(category => (
                        <option key={category.id} value={category.id}>{category.nom}</option>
                    ))}
                </select>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nom Produit</th>
                        <th>Prix Produit</th>
                        <th>Description Produit</th>
                        <th>Size</th>
                        <th>Marque</th>
                        <th>saison</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {produit_cat && produit_cat.map(produit => (
                        <tr key={produit.id}>
                            <td>{produit.id}</td>
                            <td>{produit.nom}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.description.slice(1,69)}...</td>
                            <td>{produit.size}</td>
                            <td>{produit.marque}</td>
                            <td>{produit.saison}</td>
                            <th className='d-flex'>
                                <Link  to={`/images/${produit.id}/add`}>Add Images</Link>
                                <Link  to={`/images/${produit.id}/show`} >Show Images</Link>
                                {/* <button onClick={() => handleDelete(produit.id)} className="btn btn-danger">Delete</button> */}
                                <Link to={`/produits/${produit.id}/edit`} >Edit</Link>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListProduits;