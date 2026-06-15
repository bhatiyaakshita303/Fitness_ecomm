import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "./img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./MembershipPlan.css";

function MembershipPlan() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("role");
    navigate("/login");
  };

  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    club: "",
    planName: "",
    duration: "",
    price: ""
  });

  const fetchPlans = () => {
    axios.get("http://localhost:5000/api/plans")
      .then(res => setPlans(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE PLAN
        await axios.put(`http://localhost:5000/api/plans/${editingId}`, {
          club: form.club,
          planName: form.planName,
          duration: form.duration,
          price: Number(form.price)
        });

        alert("Plan updated successfully");
        setEditingId(null);

      } else {
        // ADD PLAN
        await axios.post("http://localhost:5000/api/plans", {
          club: form.club,
          planName: form.planName,
          duration: form.duration,
          price: Number(form.price)
        });

        alert("Plan added successfully");
      }

      setForm({
        club: "",
        planName: "",
        duration: "",
        price: ""
      });

      fetchPlans();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (plan) => {
    setForm({
      club: plan.club,
      planName: plan.planName,
      duration: plan.duration,
      price: plan.price
    });

    setEditingId(plan._id);
  };

  const deletePlan = async (id) => {
    await axios.delete(`http://localhost:5000/api/plans/${id}`);
    fetchPlans();
  };

  return (
    <div className="membership-page">
      <header className="membership-header">
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

      <div className="membership-content">
        <h2>Manage Membership Packages</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Club"
            value={form.club}
            onChange={e => setForm({ ...form, club: e.target.value })}
          />

          <input
            placeholder="Plan Name"
            value={form.planName}
            onChange={e => setForm({ ...form, planName: e.target.value })}
          />

          <input
            placeholder="Duration (ex: 1 Month)"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <button type="submit">
            {editingId ? "Update Plan" : "Add Plan"}
          </button>
        </form>

        <table border="1">
          <thead>
            <tr>
              <th>Club</th>
              <th>Plan Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {plans.map(p => (
              <tr key={p._id}>
                <td>{p.club}</td>
                <td>{p.planName}</td>
                <td>{p.duration}</td>
                <td>₹{p.price}</td>
                <td style={{ display:"flex", gap: "10px", justifyContent: "center" }}>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => deletePlan(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembershipPlan;