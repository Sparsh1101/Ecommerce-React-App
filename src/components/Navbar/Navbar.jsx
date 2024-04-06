import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from '../../context/shop-context';
import logo from './logo.png';

export const Navbar = () => {
    const { getCartItemsCount } = useContext(ShopContext);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top m-0 p-0 navbar-dark bg-dark">
            <div className="container-fluid m-2 p-0">
                <NavLink exact to="/" className="navbar-brand ms-4 p-0" onClick={() => setIsNavbarOpen(false)}>
                    <img src={logo} style={{ width: '40px' }} className='m-0 p-0' /><b> E-Shop</b>
                </NavLink>
                <button className="navbar-toggler" type="button" onClick={handleNavbarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <NavLink exact to="/" className="nav-link" activeClassName="active" onClick={() => setIsNavbarOpen(false)}>
                            Shop
                        </NavLink>
                        <NavLink to="/wishlist" className="nav-link" activeClassName="active" onClick={() => setIsNavbarOpen(false)}>Wishlist</NavLink>
                        <NavLink to="/cart" className="nav-link" onClick={() => setIsNavbarOpen(false)}>
                            <a className="mx-3" style={{ color: 'black' }}>
                                <ShoppingCart size={25} className='position-relative' color='white'></ShoppingCart>
                                <span className="position-absolute translate-middle badge rounded-circle bg-warning text-dark pt-1">
                                    {getCartItemsCount()}
                                </span>
                            </a>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
