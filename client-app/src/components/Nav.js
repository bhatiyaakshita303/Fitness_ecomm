import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";

function Nav() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <div className="nav-page">
            <header className="header">
                <Link to="/home" className="logo">
                    <img src="/img/logo.png" alt="FlexZone Logo" className="logo-img" />FlexZone
                </Link>

                <nav className="nav">
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/activitydashboard">Tracker</Link>
                    <Link to="/membership">Membership</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/contact">Contact</Link>

                    {!isLoggedIn ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <a href="#" onClick={handleLogout}>Logout</a>
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