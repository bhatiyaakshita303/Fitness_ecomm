import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "./img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./AdminOrders.css";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [filter, setFilter] = useState("pending");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                `https://fitness-ecomm.onrender.com/api/admin/orders/${filter}`
            );
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filter]);

    //Approve order
    const approveOrder = async (orderId) => {
        try {
            await axios.put(
                `https://fitness-ecomm.onrender.com/api/admin/orders/${orderId}/approve`
            );
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to approve order");
        }
    };

    //Reject order
    const rejectOrder = async (orderId) => {
        try {
            await axios.put(
                `https://fitness-ecomm.onrender.com/api/admin/orders/${orderId}/reject`
            );
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to reject order");
        }
    };

    // Logout
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="admin-orders-page">
            <header className="adminorders-header">
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
                    <a href="#" onClick={(e) => { setIsMenuOpen(false); handleLogout(e); }} className="logout-link">
                        Logout
                    </a>
                </nav>
            </header>

            <h1>All Orders (Admin View)</h1>
            <div className="order-filters">
                <button
                    className={`pending ${filter === "pending" ? "active" : ""}`}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>

                <button
                    className={`approved ${filter === "approved" ? "active" : ""}`}
                    onClick={() => setFilter("approved")}
                >
                    Approved
                </button>

                <button
                    className={`rejected ${filter === "rejected" ? "active" : ""}`}
                    onClick={() => setFilter("rejected")}
                >
                    Rejected
                </button>
            </div>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Total Amount</th>
                            <th>Products</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.username}</td>
                                <td>{order.email}</td>
                                <td>₹{order.total}</td>

                                <td>
                                    {order.type === "product" &&
                                        order.products?.map((p, i) => (
                                            <div key={i}>
                                                {p.name} (x{p.qty}) - ₹{p.price}
                                            </div>
                                        ))}

                                    {order.type === "membership" && (
                                        <div>
                                            <strong>Membership Plan</strong>
                                            <br />
                                            Club: {order.membership?.club}
                                            <br />
                                            Plan: {order.membership?.planName}
                                            <br />
                                            Duration: {order.membership?.duration}
                                            <br />
                                            Price: ₹{order.membership?.price || 0}
                                        </div>
                                    )}
                                </td>

                                <td>
                                    <span className={`status ${order.status}`}>
                                        {order.status}
                                    </span>
                                </td>

                                <td>
                                    {order.status === "pending" && (
                                        <>
                                            <button
                                                className="approve-btn"
                                                onClick={() => approveOrder(order._id)}
                                            >
                                                Approve
                                            </button>
                                                <br/><br/>
                                            <button
                                                className="reject-btn"
                                                onClick={() => rejectOrder(order._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>

                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminOrders;
