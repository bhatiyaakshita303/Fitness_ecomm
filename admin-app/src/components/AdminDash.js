import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDash.css";

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-home">
      <header className="admin-header">
        <a href="#" className="logo">
          <img src="/img/logo.png" alt="logo" /> FlexZone
        </a>

        <nav className="admin-nav">
          <Link to="/admindash">Dashboard</Link>
          <Link to="/admindash/aproducts">Products</Link>
          <Link to="/admindash/membershipplan">MembershipPlan</Link>
          <Link to="/admindash/user">Users</Link>
          <Link to="/admindash/adminorders">Orders</Link>
          <a href="#" onClick={handleLogout} className="logout-link">
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
