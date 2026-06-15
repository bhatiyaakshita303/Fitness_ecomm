import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./AdminDash.css";

function AdminHome() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-home">
      <header className="admin-header">
        <a href="#" className="logo">
          <img src="/img/logo.png" alt="logo" /> FlexZone
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
        </div>

        <nav className={`admin-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/admindash" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/admindash/aproducts" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/admindash/membershipplan" onClick={() => setIsMenuOpen(false)}>MembershipPlan</Link>
          <Link to="/admindash/user" onClick={() => setIsMenuOpen(false)}>Users</Link>
          <Link to="/admindash/adminorders" onClick={() => setIsMenuOpen(false)}>Orders</Link>
          <a href="#" onClick={(e) => { setIsMenuOpen(false); handleLogout(e); }} className="logout-link">
            Logout
          </a>
        </nav>
      </header>


      <main className="admin-home-content">
        <div className="welcome-box">
          <h1>Welcome, Admin!</h1>
          <p>Manage your products, users, and reports efficiently from here.</p>
          <div className="action-buttons">
            <Link to="/admindash/aproducts" className="btn">Manage Products</Link>
            <Link to="/admindash/user" className="btn">Manage Users</Link>
            <Link to="/admindash/adminorders" className="btn">Manage Orders</Link>
            <Link to="/admindash/membershipplan" className="btn">Manage Memberships</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
