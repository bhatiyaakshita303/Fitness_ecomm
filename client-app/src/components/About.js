import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function About() {

    const [plans, setPlans] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/api/plans")
            .then(res => setPlans(res.data));
    }, []);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
    }, []);
    const handlePurchase = async (planId) => {
        if (!user) {
            alert("Please login first to purchase a membership");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/purchase-membership",
                {
                    userId: user._id,
                    planId: planId
                }
            );

            alert("Membership purchased successfully!");

        } catch (err) {
            console.log("FULL ERROR:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="about-page">
            <section className="hero">
                <div className="content">
                    <h1>ABOUT US</h1>
                    <p>There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration unde
                        omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                </div>
            </section>

            <section class="club-section">
                <h2 class="club-title">CLUB PICTURES</h2>
                <p class="club-subtitle">
                    Premium high end fitness clubs with state of the art machines, equipment and facilities
                </p>

                <div class="club-gallery">
                    <img src="./img/gymimg1.jpg" alt="Gym Area" />
                    <img src="./img/gymimg2.jpg" alt="Cardio Area" />
                    <img src="./img/gymimg3.jpg" alt="Locker Room" />
                </div>

                <div class="slider-dots">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                </div>
            </section>

            <section className="features">
                <h2>OUR FEATURES</h2><br />
                <p>There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.</p>
                <br /><br />

                <div className="features-grid">
                    <div className="feature">
                        <img src="/img/1.svg" alt="Weightlifting" /><br />
                        <h3>Weightlifting</h3>
                        <p>There are many variations of passages of lorem Ipsum available.</p>
                    </div>
                    <div className="feature">
                        <img src="/img/2.svg" alt="Specific Muscles" /><br />
                        <h3>Specific Muscles</h3>
                        <p>There are many variations of passages of lorem Ipsum available.</p>
                    </div>
                    <div className="feature">
                        <img src="/img/3.svg" alt="Flex Muscles" /><br />
                        <h3>Flex Your Muscles</h3>
                        <p>There are many variations of passages of lorem Ipsum available.</p>
                    </div>
                    <div className="feature">
                        <img src="/img/4.svg" alt="Cardio" /><br />
                        <h3>Cardio Exercises</h3>
                        <p>There are many variations of passages of lorem Ipsum available.</p>
                    </div>
                </div>
            </section>


            <section className="trainer-section">
                <h2 className="trainer-title">MEET OUR EXPERT TRAINERS</h2>
                <p className="trainer-subtitle">
                    Certified professionals dedicated to transforming your fitness journey.
                </p>

                <div className="trainer-cards">
                    <div className="trainer-card">
                        <img src="./img/trainer1.jpg" alt="Strength Trainer" />
                        <h3>Ethan Carter</h3>
                        <p>Strength & Conditioning Coach</p>
                    </div>

                    <div className="trainer-card">
                        <img src="./img/trainer2.jpg" alt="Cardio Trainer" />
                        <h3>Sophia Williams</h3>
                        <p>Cardio & Fat Loss Expert</p>
                    </div>

                    <div className="trainer-card">
                        <img src="./img/trainer3.jpg" alt="Yoga Trainer" />
                        <h3>Jason Brooks</h3>
                        <p>Yoga & Flexibility Coach</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;
