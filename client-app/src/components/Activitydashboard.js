import React, { useState, useEffect } from "react";

const ActivityDashboard = () => {
    const [selectedActivity, setSelectedActivity] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState("");

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = () => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleActivityChange = (e) => {
        const activity = e.target.value;
        setSelectedActivity(activity);
        if (activity) setShowPopup(true);
    };

    const closeTracker = () => {
        setShowPopup(false);
        setIsRunning(false);
        setSeconds(0);
        setResult("");
        setSelectedActivity("");
    };

    const startTimer = () => {
        setSeconds(0);
        setIsRunning(true);
        setResult("");
    };

    const stopTimer = () => {
        setIsRunning(false);
        setResult(`Amazing! You did ${selectedActivity} for ${formatTime()}`);
    };

    return (
        <div className="tracker-page">

            {/* Hero Section */}
            <div className="hero">
                <h1>Daily Activity Tracker</h1>
                <p>
                    Track your fitness journey, improve consistency,
                    and stay motivated every single day.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="features">
                <div className="feature-card">
                    <h3>⏱ Track Time</h3>
                    <p>Measure how long you stay active.</p>
                </div>

                <div className="feature-card">
                    <h3>🔥 Stay Consistent</h3>
                    <p>Build healthy daily habits.</p>
                </div>

                <div className="feature-card">
                    <h3>📊 Improve Daily</h3>
                    <p>Push yourself to perform better.</p>
                </div>
            </div>

            {/* Tracker Section */}
            <div className="tracker-card">
                <h2>Start Your Activity</h2>

                <select
                    value={selectedActivity}
                    onChange={handleActivityChange}
                    className="activity-select"
                >
                    <option value="">Choose Activity</option>
                    <option value="Running">🏃 Running</option>
                    <option value="Walking">🚶 Walking</option>
                    <option value="Yoga">🧘 Yoga</option>
                </select>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="overlay">
                    <div className="popup">
                        <span className="close" onClick={closeTracker}>×</span>
                        <h2>{selectedActivity}</h2>

                        <div className="timer">{formatTime()}</div>

                        <div className="btn-group">
                            <button className="start-btn" onClick={startTimer}>
                                Start
                            </button>
                            <button className="stop-btn" onClick={stopTimer}>
                                Stop
                            </button>
                        </div>

                        <p className="result">{result}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityDashboard;