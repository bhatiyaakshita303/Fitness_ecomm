import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import img1 from "./img/logo.png";
import "./Aproducts.css";

function Aproducts() {
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
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ productName: "", price: "" });
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Add / Update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("productName", formData.productName);
            data.append("price", formData.price);
            if (imageFile) data.append("image", imageFile);

            if (editingId) {
                await axios.put(`http://localhost:5000/api/products/${editingId}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("http://localhost:5000/api/products", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setFormData({ productName: "", price: "" });
            setImageFile(null);
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error("Error saving product:", err.response?.data || err);
        }
    };

    // Edit product
    const handleEdit = (p) => {
        setFormData({ productName: p.productName, price: p.price });
        setEditingId(p._id);
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <div className="products-container">
            <header className="product-header">
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

            <h2>Manage Products</h2>

            {/* Add / Edit Form */}
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">{editingId ? "Update" : "Add"} Product</button>
            </form>

            {/* Products Table */}
            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <tr key={p._id}>
                                    <td>
                                        {p.image ? (
                                            <img
                                                src={`http://localhost:5000${p.image}`}
                                                alt={p.productName}
                                                className="table-img"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{p.productName}</td>
                                    <td>₹{p.price}</td>
                                    <td>
                                        <button onClick={() => handleEdit(p)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(p._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Aproducts;