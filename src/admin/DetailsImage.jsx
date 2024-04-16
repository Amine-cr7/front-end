import React, { useEffect, useState } from 'react'
import "../css/image.css"
import { useParams } from 'react-router-dom'
export default function DetailsImage() {
    const { id } = useParams()
    const [imageUrl, setImageUrl] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/api/images")
            .then(res => res.json())
            .then(data => setImageUrl(data.filter(item => item.produit_id == id)))
    }, [])
    const handle_delete = async (id) => {
      let result = await fetch(`http://localhost:8000/api/images/${id}`,{
        method:"DELETE",
      })
    setImageUrl(imageUrl.filter(item => item.id != id))
    }
    return (
        <div className='py-5'>
            <div className='row'>
                {imageUrl && imageUrl.map(item =>
                    <div className='col-4 ' key={item.id}>
                                <div className='image-control'>
                                    <img width={"100px"}  src={`http://localhost:8000/storage/${item.image}`}/>
                                </div>
                                <div>
                                    <button type="button" className="close-btn" onClick={()=>handle_delete(item.id)} >
                                        <span>&times;</span>
                                    </button>
                                </div>                       
                    </div>
                )}
            </div>
        </div>
    )
}