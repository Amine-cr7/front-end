import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="mx-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/produits">Produits</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/">Accueil</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
