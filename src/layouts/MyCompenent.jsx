import React from 'react'
import Navbar from './Navbar'

export default function MyCompenent({Compenent}) {
  return (
    <>
        <Navbar/>
    <div className='container-fluid'>
        <Compenent/>
    </div>
    </>
  )
}