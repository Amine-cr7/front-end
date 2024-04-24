import React from 'react'
import "../css/review.css"
export default function Review() {
  return (
    <div>
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='d-flex flex-column w-50  merci justify-content-center'>
            <h1 className='text-success text-center'>Payment Success</h1>
            </div>
        <table className='table '>
            <thead>
                <tr>
                    <th>Numero De Commande</th>
                    <th>Total</th>
                    <th>Moyen De Paiement</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        </div>
    </div>
  )
}
