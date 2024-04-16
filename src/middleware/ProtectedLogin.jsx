import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
export default function ProtectedLogin({ Compenent }) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user_info'));
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])
    return (
        <div className='vh-100' style={{backgroundColor:"#f0f2f5"}}>
            <Compenent />
        </div>
    )
}
