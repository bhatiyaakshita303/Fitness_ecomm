import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://fitness-ecomm.onrender.com/api/login", {
        email,
        password
      });

      const user = response.data.user;

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      // ✅ allow only admin
      if (user.role !== "admin") {
        alert("Access denied. Admin only.");
        return;
      }

      // store session
      localStorage.setItem("role", "admin");
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role);

      alert("Login successful!");
      navigate("/admindash", { replace: true });

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <section className="login">
        <div className="content">
          <h2>FlexZone Build Your Body</h2>
          <p>
            “Every move matters. With our easy-to-use flexzone tracker, you can
            see your daily progress and push yourself to be your best.”
          </p>
        </div>

        <form className="logform" onSubmit={handleSubmit}>
          <div className="wrapper-login">
            <div className="input-box">
              <label htmlFor="email">Enter your email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forget">
              <a href="#">forget password?</a>
            </div>

            <button type="submit" className="btn">
              Login
            </button>

          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;