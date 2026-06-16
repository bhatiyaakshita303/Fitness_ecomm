import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import navigate hook
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post("https://fitness-ecomm.onrender.com/api/orders", {
        userId,
        products: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          img: item.img,
        })),
        total,
      });

      alert("Order placed successfully!");
      console.log(res.data);

      navigate("/myorders");

    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  const handleViewOrders = () => {
    navigate("/myorders");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-msg">No items in cart.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.img} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                    </div>
                  </td>
                  <td>{(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="cart-total">Grand Total: {total.toFixed(2)}</h2>

          <div className="cart-buttons">
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <button className="view-order-btn" onClick={handleViewOrders}>
              My Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
