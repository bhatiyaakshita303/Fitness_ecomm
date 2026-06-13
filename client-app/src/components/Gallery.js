import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Get logged-in user on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Listen for login/logout changes dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleBuy = (productId) => {
    if (!user) {
      alert("Please login first to view product details");
      navigate("/login");
      return;
    }

    navigate(`/product/${productId}`);
  };

  return (
    <div className="gallery">
      <div className="gallery-content">
        <h1>Smart FlexZone Trackers</h1>
        <p>Track your health, steps, sleep, and performance — all in one place.</p>
        <a href="#products" className="btnn">Explore Products</a>
      </div>

      <h2>Products</h2>
      <div className="gallery-grid" id="products">
        {products.map((product) => (
          <div key={product._id} className="gallery-card">
            <img src={`http://localhost:5000${product.image}`} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>₹{product.price}</p>
            <button className="buy-btn" onClick={() => handleBuy(product._id)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;












