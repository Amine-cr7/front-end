import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import useFetch from '../api/useFetch';

function AddProduct() {
    const navigate = useNavigate()
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [description, setDescription] = useState('');
    const [categorieId, setCategorieId] = useState('');
    const [size,setSize] = useState('')
    const [marque,setMarque] = useState('')
    const [saison,setSaison] = useState('')
    const [image,setImage] = useState('')
    const [type,setType] = useState('')
    const categories = useFetch("http://localhost:8000/api/categories")
    const handle_submit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prix', prix);
        formData.append('description', description);
        formData.append('categorie_id', categorieId);
        formData.append('marque', marque);
        formData.append('saison', saison);
        formData.append('size', size);
        formData.append('image',image)
        formData.append('type',type)
        let result = await fetch("http://localhost:8000/api/produits",{
            method:"POST",
            body:formData
        })
        navigate("/produits")
    }

    return (
        <form method='POST' onSubmit={handle_submit}>
            <div className="d-flex align-items-center flex-column">
                <h1>Ajouter Produits</h1>

                <div className="w-50">
                    <div className="form-group">
                        <label className="form-label" >Nom Produits:</label>
                        <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label" >Prix:</label>
                        <input type="text" className="form-control"  onChange={(e) => setPrix(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label" >Description:</label>
                        <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Size:</label>
                        <input type="text" className="form-control"  onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Saison:</label>
                        <input type="number" min="1980" max="2025" step="1"  className="form-control"  onChange={(e) => setSaison(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Marque:</label>
                        <input type="text" className="form-control"  onChange={(e) => setMarque(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Type:</label>
                        <input type="text" className="form-control"  onChange={(e) => setType(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Image:</label>
                        <input  type="file" className="form-control"  onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" >Categorie:</label>
                        <select className="form-select" onChange={(e) => setCategorieId(e.target.value)}>
                            <option value="" >Choose Categorie</option>
                             { categories && categories.map(category => (
                                <option key={category.id} value={category.id}>{category.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn form-control btn-primary">Ajouter Produit</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddProduct;
