import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "./img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./User.css";
function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fetch users
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="user">
            <header className="user-header">
                <a href="#" className="logo">
                    <img src={img1} alt="logo" /> FlexZone
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
                    <a href="#" onClick={(e) => { setIsMenuOpen(false); handleLogout(e); }} className="logout-link">Logout</a>
                </nav>
            </header>

            <h2>Registered Users</h2>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;