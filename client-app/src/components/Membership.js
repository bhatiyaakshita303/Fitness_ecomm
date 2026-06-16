import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import axios from "axios";

function Membership() {
  const { addToCart } = useCart();
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch membership plans
  useEffect(() => {
    axios.get("https://fitness-ecomm.onrender.com/api/plans")
      .then(res => setPlans(res.data))
      .catch(err => console.log(err));
  }, []);

  // Get user from localStorage on mount
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

  const handlePurchase = (plan) => {
    if (!user) {
      alert("Please login first to purchase a membership");
      navigate("/login");
      return;
    }

    // Add membership to cart (qty always 1)
    addToCart({
      id: plan._id,
      name: `${plan.club} - ${plan.planName}`,
      price: plan.price,
      img: null,
      qty: 1,
      type: "membership"
    });

    alert("Membership added to cart!");
    navigate("/cart");
  };

  return (
    <div className="membership-page">
      <section className="membership-info">
        <div className="info-container">
          <h2>Transform Your Fitness Journey</h2>
          <p>
            Join FlexZone and experience world-class equipment, certified trainers,
            and a motivating environment designed to help you achieve your goals faster.
          </p>

          <div className="info-grid">
            <div className="info-card">
              <h3>🏋 Premium Equipment</h3>
              <p>Train with modern machines designed for maximum performance and safety.</p>
            </div>

            <div className="info-card">
              <h3>👨‍🏫 Expert Trainers</h3>
              <p>Certified professionals guide your workouts and track your progress.</p>
            </div>

            <div className="info-card">
              <h3>🥗 Diet Guidance</h3>
              <p>Personalized nutrition plans to accelerate your transformation.</p>
            </div>

            <div className="info-card">
              <h3>🕒 Flexible Plans</h3>
              <p>Choose a membership that fits your schedule and fitness goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="membership">
        <div className="container">
          <h2>MEMBERSHIP PRICES</h2>
          <p className="subtitle">
            Membership fee may vary across locations based on promotions or packages chosen.
            Please visit your nearest Fitness First for an assessment.
          </p>
          <p className="terms">*Terms and Conditions apply</p>

          <table className="pricing-table">
            <thead>
              <tr>
                <th>Club</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Offer Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {plans.map(plan => (
                <tr key={plan._id}>
                  <td>{plan.club}</td>
                  <td>{plan.planName}</td>
                  <td>{plan.duration}</td>
                  <td className="price">{plan.price}</td>
                  <td>
                    <button
                      className="buy-btn"
                      onClick={() => handlePurchase(plan)}
                    >
                      Purchase
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Membership;