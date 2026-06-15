import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";

function Nav() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setIsLoggedIn(!!storedUser);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setIsLoggedIn(!!storedUser);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user"); 
        clearCart(); 
        setIsLoggedIn(false);
        navigate("/home");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nav-page">
            <header className="header">
                <Link to="/home" className="logo">
                    <img src="/img/logo.png" alt="FlexZone Logo" className="logo-img" />FlexZone
                </Link>

                {/* Hamburger Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
                </div>

                <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
                    <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/activitydashboard" onClick={() => setIsMenuOpen(false)}>Tracker</Link>
                    <Link to="/membership" onClick={() => setIsMenuOpen(false)}>Membership</Link>
                    <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                    {!isLoggedIn ? (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    ) : (
                        <a href="#" onClick={(e) => { setIsMenuOpen(false); handleLogout(e); }}>Logout</a>
                    )}
                </nav>

                <div className="cart-icon">
                    <Link to="/cart" className="cart-link" aria-label="Cart">
                        <FaShoppingCart size={22} color="white" />
                        <span className="cart-count" style={{ color: "white" }}>
                            {cart.length}
                        </span>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Nav;