// import React from "react";
// import { useCart } from "./CartContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user ? user.id : null;
//   const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   // Handle Razorpay payment
//   const handlePayment = async () => {
//     if (!user) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {
//       await axios.post("https://fitness-ecomm.onrender.com/api/fake-payment", {
//         userId: user._id,   // important fix
//         products: cart.map(item => ({
//           name: item.name,
//           price: item.price,
//           qty: item.qty
//         })),
//         total: total
//       });

//       alert("Payment Successful!");
//       clearCart(); // cart empty after payment
//       navigate("/myorders");

//     } catch (error) {
//       console.error(error);
//       alert("Payment Failed");
//     }
//   };
//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p className="empty-msg">No items in cart.</p>
//       ) : (
//         <>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Qty</th>
//                 <th>Total</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map(item => (
//                 <tr key={item.id}>
//                   <td>
//                     {item.type === "membership" ? (
//                       <span className="membership-badge">Membership</span>
//                     ) : (
//                       <img src={item.img} alt={item.name} />
//                     )}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.price}</td>
//                   <td>
//                     {item.type === "membership" ? (
//                       <span>1</span>
//                     ) : (
//                       <div className="qty-controls">
//                         <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
//                         <span>{item.qty}</span>
//                         <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
//                       </div>
//                     )}
//                   </td>
//                   <td>{(item.price * item.qty).toFixed(2)}</td>
//                   <td>
//                     <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <h2 className="cart-total">Grand Total: {total.toFixed(2)}</h2>

//           <div className="cart-buttons">
//             <button className="place-order-btn" onClick={handlePayment}>
//               Pay & Place Order
//             </button>
//             <button className="view-order-btn" >
//               My Orders
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CartPage;








import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./CartPage.css";

function CartPage() {

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    try {

      // ================= COD =================
      if (paymentMethod === "COD") {

        await axios.post("https://fitness-ecomm.onrender.com/api/orders", {
          userId: user._id,
          products: cart,
          total: total,
          paymentStatus: "COD"
        });

        alert("Order placed with Cash on Delivery");

        clearCart();
        navigate("/myorders");

      }

      // ================= ONLINE PAYMENT =================
      if (paymentMethod === "ONLINE") {

        const res = await axios.post(
          "https://fitness-ecomm.onrender.com/api/create-order",
          { amount: total }
        );

        const order = res.data;

        const options = {
          key: "rzp_test_SP6ZlKktAfPl5A",
          amount: order.amount,
          currency: "INR",
          name: "FlexZone",
          description: "Order Payment",
          order_id: order.id,

          handler: async function () {

            await axios.post("https://fitness-ecomm.onrender.com/api/orders", {
              userId: user._id,
              products: cart,
              total: total,
              paymentStatus: "Paid"
            });

            alert("Payment Successful");

            clearCart();
            navigate("/myorders");
          },

          prefill: {
            name: user.name,
            email: user.email
          },

          theme: {
            color: "#000000"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
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
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    {item.type === "membership" ? (
                      <span className="membership-badge">Membership</span>
                    ) : (
                      <img src={item.img} alt={item.name} className="product-img" />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    {item.type === "membership" ? (
                      <span>1</span>
                    ) : (
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                      </div>
                    )}
                  </td>
                  <td>₹{(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="cart-total">
            Grand Total: ₹{total.toFixed(2)}
          </h2>

          <div className="payment-method">

            <h3>Select Payment Method</h3>

            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash On Delivery
            </label>

            <label>
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online (Razorpay)
            </label>
          </div>

          <div className="cart-buttons">

            <button
              className="place-order-btn"
              onClick={handlePayment}>
              Pay & Place Order
            </button>

            <button
              className="view-order-btn"
              onClick={() => navigate("/myorders")}>
              My Orders
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;