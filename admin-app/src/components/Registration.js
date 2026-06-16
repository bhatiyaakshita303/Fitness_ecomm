import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

function Registration() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, cpassword } = formData;

        if (!username || !email || !password || !cpassword) {
            alert("All fields are required");
            return;
        }

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        try {
            const response = await axios.post("https://fitness-ecomm.onrender.com/api/registration", {
                username,
                email,
                password
            });

            if (response.status === 200) {
                alert(" Registration successful!");
                setFormData({ username: "", email: "", password: "", cpassword: "" });
                navigate("/login");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Registration failed!");
            }
        }
    };

    return (
        <div className="registration-page">
            <div className="container">
                <div className="title">Registration</div>
                <form className="regform" onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box2">
                            <span className="details">Username</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Enter your username"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-box2">
                            <span className="details">Email</span>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-box2">
                            <span className="details">Password</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-box2">
                            <span className="details">Confirm Password</span>
                            <input
                                type="password"
                                name="cpassword"
                                value={formData.cpassword}
                                placeholder="Confirm your password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="regbtn">
                        <input type="submit" value="Register" />
                    </div>

                    <div className="option">
                        <a href="/login">Back to Login</a> Or <a href="/home">Back to Home</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
