import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function AddImage() {
    const navigate = useNavigate()

    const {id} = useParams()
    const [images, setImages] = useState([]);
    const handle_add = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        const imagesArray = Array.from(images);
        imagesArray.forEach((image, index) => {
            formData.append(`images[]`, image);
        });
        formData.append('produit_id',id)
        let result = await fetch("http://localhost:8000/api/images",{
            method:"POST",
            body:formData
        });
        navigate("/produits")
    }
    return (
        <div className='d-flex justify-content-center w-100'>
            <div className="form-group w-50">
                <label className="form-label">Produits Image:</label>
                <input type="file" multiple className="form-control py-3" onChange={(e) => setImages(e.target.files)} />
                <button type='submit' onClick={handle_add} className='btn form-control mt-2 btn-danger'>
                    Add Images
                </button>
            </div>
        </div>
    )
}