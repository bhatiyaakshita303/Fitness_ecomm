import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  //  Get full user object
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    axios
      .get(`http://localhost:5000/api/orders/${userId}`)
      .then((res) => {
        setOrders(res.data);

        res.data.forEach(order => {

          // APPROVED POPUP
          if (
            order.status === "approved" &&
            !localStorage.getItem("approvedShown_" + order._id)
          ) {
            alert("Your order has been approved");

            localStorage.setItem(
              "approvedShown_" + order._id,
              "true"
            );
          }
          // REJECTED + REFUND POPUP
          if (
            order.paymentStatus === "refunded" &&
            !localStorage.getItem("refundShown_" + order._id)
          ) {
            alert("Order rejected.Payment Refunded Successfully");

            localStorage.setItem(
              "refundShown_" + order._id,
              "true"
            );
          }
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch orders.");
      });
  }, [userId]);

  return (
    <div className="orders">
      <div className="orders-page">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <p className="empty-msg">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3> Order ID: {order._id}</h3>

              <p className="order-date">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              {/*  Order Status */}
              <p className={`order-status ${order.status}`}>
                Order Status: {order.status.toUpperCase()}
              </p>

              {/* Payment Status */}
              <p className={`payment-status ${order.paymentStatus}`}>
                Payment Status:{" "}
                {order.paymentStatus === "paid" && "PAID ✅"}
                {order.paymentStatus === "refunded" && "REFUNDED 💸"}
              </p>

              {/* Fake Transaction ID */}
              <p className="transaction-id">
                Transaction ID: TXN{order._id.slice(-6).toUpperCase()}
              </p>

              {/* Products Table */}
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.type === "product" &&
                    order.products.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>{item.qty}</td>
                        <td>₹{item.price * item.qty}</td>
                      </tr>
                    ))}

                  {order.type === "membership" && (
                    <tr>
                      <td>{order.membership.planName}</td>
                      <td>₹{order.membership.price}</td>
                      <td>1</td>
                      <td>₹{order.membership.price}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h3 className="order-total">Total: ₹{order.total}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;