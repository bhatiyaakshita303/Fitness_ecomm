import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  if (!product) return <h2>Loading product details...</h2>;

  const handleAdd = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    addToCart({
      id: product._id,
      name: product.productName,
      price: product.price,
      img: `http://localhost:5000${product.image}`,
      qty: 1,
    });

    navigate("/cart");
  };

  return (
    <div className="product-detail">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.productName}
        className="product-detail-img"
      />
      <h2>{product.productName}</h2>
      <p>Track your progress with this high-performance flexzone tracker.</p>
      <h4>₹{product.price}</h4>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
