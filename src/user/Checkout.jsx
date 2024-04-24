import React, { useEffect, useState } from 'react'
import useFetch from '../api/useFetch';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user_info'));
    
    const userId = user ? user.id : null
    const { data: pays } = useFetch("http://localhost:8000/api/countries")
    const { data: commandes, isPending } = useFetch(`http://localhost:8000/api/commandes/${userId}`)
    const { data: infoData } = useFetch(`http://localhost:8000/api/information/${userId}`);
    const [country, setCountry] = useState('')
    const [code, setCode] = useState('')
    const [tele, setTele] = useState('')
    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [err, setErr] = useState({})
    console.log(commandes)
    useEffect(() => {
        if (infoData) {

            setCountry(infoData.country);
            setCode(infoData.code);
            setTele(infoData.telephone);
            setAdress(infoData.address);
            setCity(infoData.city);
        }
    }, [infoData]);
    let totalPrice = 0;
    if (commandes) {
        commandes.forEach((commande) => {
            if (commande.produits) {
                commande.produits.forEach(produit => {
                    totalPrice += produit.prix * produit.pivot.qnt
                })
            }
        });
    }
    const validateForm = () => {
        let validate = true
        const newErr = {}
        var regex = /^\+?(\d{1,3})?[-. (]?\d{1,3}[-. )]?([0-9\- .]{6,})(?: *x(\d+))?\s*$/;
        var postal = /^\d{5}$/
        if (!country) {
            newErr.country = "country required"
            validate = false
        }
        if (!adress) {
            newErr.adress = "adress required"
            validate = false

        }
        else if (adress.length < 7) {
            newErr.adress = "more than 7 charachters"
            validate = false
        }
        if (!city) {
            newErr.city = "city required"
            validate = false
        }
        if (!regex.test(tele)) {
            newErr.tele = "enterer a valide phone"
            validate = false
        }
        if (!postal.test(code)) {
            newErr.code = "Entrez un code postal valide";
            validate = false;
        }
        setErr(newErr)
        return validate
    }
    const handle_commander = async () => {
        if (validateForm()) {
            const information = { country, code, tele, adress, city, userId }
            let result = await fetch("http://localhost:8000/api/information", {
                method: infoData != null ? "PUT" : "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify(information)
            })
            
            navigate("/paiement")
        }
    }

    return (
        <div className='container vh-100'>
            {!isPending &&
                <div className='row'>
                    <div className='col-6'>
                        <h1>Details de Facturation</h1>
                        <div className='form-group'>
                            <label htmlFor="">Full Name *</label>
                            <input type="text" v className='form-control' disabled value={user && user.name} />
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor="">Pays/Region *</label>
                            <select name="" onChange={(e) => setCountry(e.target.value)} className='form-select' id="">
                                <option value="">Choose your country</option>
                                {pays && pays.map(item => (
                                    <option selected={country && country == item.country_name ? true : false} key={item.country_code} value={item.country_name}>{item.country_name}</option>
                                ))}
                            </select>
                            <span className='text-danger'>{err && err.country}</span>

                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor="" className='form-label'>City:</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='form-control' />
                            <span className='text-danger'>{err && err.city}</span>
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor="" className='form-label'>Telephone:</label>
                            <input type="text" value={tele} onChange={(e) => setTele(e.target.value)} className='form-control' />
                            <span className='text-danger'>{err && err.tele}</span>

                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor="" className='form-label'>Adresse:</label>
                            <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)} className='form-control' />
                            <span className='text-danger'>{err && err.adress}</span>
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor="" className='form-label'>Code:</label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className='form-control' />
                            <span className='text-danger'>{err && err.code}</span>
                        </div>
                    </div>
                    <div className='col-6 border border-3 p-3' style={{ backgroundColor: "lightgray" }}>
                        <h1 className='text-center'>Votre Commande</h1>
                        <div className='border border-1 p-3' style={{ backgroundColor: "white" }}>
                            <div className='d-flex justify-content-between '>
                                <h5>Produit</h5>
                                <h5>Sous-Total</h5>
                            </div>
                            <div className='border border-1'></div>

                            {commandes && commandes.map(item => (
                                <div key={item.id}>
                                    {item.produits && item.produits.map(i => (
                                        <div key={i.id}>
                                            <div className='d-flex justify-content-between'>
                                                <p className=''>{i.nom} x {i.pivot.qnt} </p>
                                                <p>{i.prix * i.pivot.qnt}</p>

                                            </div>
                                            <div className='border border-1'></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className='d-flex justify-content-between'>
                                <p>Sous-Total</p>
                                <p>{totalPrice > 0 && totalPrice}</p>
                            </div>
                            <div className='border border-1'></div>

                            <div className='d-flex justify-content-between'>
                                <h3>Total</h3>
                                <p>{totalPrice > 0 && totalPrice}</p>
                            </div>
                            <button className='form-control mt-3 btn btn-dark' onClick={handle_commander}>Continue to Payment</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}