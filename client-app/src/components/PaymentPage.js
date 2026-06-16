import React from "react";
import axios from "axios";

function PaymentPage() {

  const handlePayment = async () => {

    const amount = 500;

    const res = await axios.post(
      "https://fitness-ecomm.onrender.com/api/create-order",
      { amount }
    );

    const order = res.data;

    const options = {
      key: "rzp_test_xxxxxxxxx",

      amount: order.amount,

      currency: "INR",

      name: "Luxe Gems",

      description: "Order Payment",

      order_id: order.id,

      handler: function (response) {

        alert("Payment Successful!");

        console.log(response);

      },

      prefill: {
        name: "Akshita",
        email: "akshita@email.com",
        contact: "9999999999"
      },

      theme: {
        color: "#0f3d2e"
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.open();

  };

  return (
    <div>
      <h2>Razorpay Test Payment</h2>

      <button onClick={handlePayment}>
        Pay ₹500
      </button>

    </div>
  );
}

export default PaymentPage;