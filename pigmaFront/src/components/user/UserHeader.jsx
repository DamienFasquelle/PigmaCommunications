import Cookies from 'js-cookie';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/pigmaLogo.png"
const UserHeader = () => {

    const navigate = useNavigate();
    const handleClickDeleteCookies = () => {
        Cookies.remove("jwt");
        navigate("/login");
    };

    return (
        <>
            <header className="main-header">
                <div className="main-container">
                    <Link to="/">
                        <img
                            className="header-logo"
                            src={logo}
                            alt="logo-pigma"
                        />
                    </Link>
                    <nav className="main-nav">
                        <ul className="nav-menu">
                            <li className="nav-menu-item">
                                <Link className="nav-menu-link" to="/user-dashboard">
                                    Espace Client
                                </Link>
                            </li>
                            <li className="nav-menu-item">
                                <a href="/login" onClick={handleClickDeleteCookies} className='nav-menu-link'>
                                    Se déconnecter
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );

}

export default UserHeader