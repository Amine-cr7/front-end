import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../admin/Header';
export default function Protected({ Compenent }) {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [user, navigate]);
    return (
        <div>
            <Header/>
            <Compenent />
        </div>
    )
}
