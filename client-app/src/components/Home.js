import React, { useState } from "react";
import {
  Users,
  Dumbbell,
  Headphones,
  Bike,
  Wifi,
  ShowerHead,
  Flame,
  Layers,
  User,
  Coffee,
  Sofa,
  HeartPulse,
  Apple,
} from "lucide-react";

const facilities = [
  { icon: <Users />, title: "Group Exercise", exercises: ["Zumba", "HIIT", "Aerobics"] },
  { icon: <Dumbbell />, title: "GYM Floor", exercises: ["Bench Press", "Deadlift", "Squats"] },
  { icon: <Headphones />, title: "Cardio Area", exercises: ["Treadmill", "Cycling", "Rowing"] },
  { icon: <Bike />, title: "Cycle Studio", exercises: ["Spin Bike", "Intervals", "Endurance Ride"] },
  { icon: <Dumbbell />, title: "Free Weights", exercises: ["Bicep Curl", "Shoulder Press", "Lunges"] },
  { icon: <Flame />, title: "Freestyle", exercises: ["Stretching", "Bodyweight", "Mobility"] },
  { icon: <Wifi />, title: "Internet Station", exercises: ["Workout Tracking", "Music", "Online Coaching"] },
  { icon: <ShowerHead />, title: "Shower Area", exercises: ["Hot Shower", "Cold Shower"] },
  { icon: <Flame />, title: "Steam Room", exercises: ["Relaxation", "Recovery"] },
  { icon: <Layers />, title: "Strength Area", exercises: ["Powerlifting", "Barbell Work"] },
  { icon: <User />, title: "Personal Training", exercises: ["1-1 Coaching", "Custom Plan"] },
  { icon: <Sofa />, title: "Towel Services", exercises: ["Clean Towels", "Laundry"] },
  { icon: <Coffee />, title: "F&B", exercises: ["Protein Shake", "Healthy Snacks"] },
  { icon: <Sofa />, title: "Members Lounge", exercises: ["Rest Area", "Social Space"] },
  { icon: <HeartPulse />, title: "Yoga", exercises: ["Hatha", "Vinyasa", "Power Yoga"] },
  { icon: <Apple />, title: "Nutrition Counseling", exercises: ["Diet Plan", "Weight Gain", "Fat Loss"] },
];
function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="content1">
          <h2>
            Unlock your fitness <br /> potential with us.
          </h2>
          <p>
            Transform your Body, Transform your Life. Shape your body now with us.
          </p>
          <button>Manage Users</button>
          <button className="know_more">Know More</button>
        </div>
      </div>

      <section className="schedule-section">
        <h2 className="schedule-title">WEEKLY TRAINING SCHEDULE</h2>
        <p className="schedule-subtitle">
          Structured programs designed for strength, endurance, and recovery.
        </p>

        <div className="table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Workout Focus</th>
                <th>Time</th>
                <th>Trainer</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Monday</td>
                <td>Chest & Triceps</td>
                <td>6:00 AM — 9:00 PM</td>
                <td>Ethan Carter</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>Back & Biceps</td>
                <td>6:00 AM — 9:00 PM</td>
                <td>Sophia Williams</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>Leg Day</td>
                <td>6:00 AM — 9:00 PM</td>
                <td>Lucas Bennett</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>Shoulders & Core</td>
                <td>6:00 AM — 9:00 PM</td>
                <td>Emma Johnson</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>Full Body Workout</td>
                <td>6:00 AM — 9:00 PM</td>
                <td>Ryan Mitchell</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>HIIT & Cardio</td>
                <td>7:00 AM — 8:00 PM</td>
                <td>Olivia Parker</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>Yoga & Recovery</td>
                <td>7:00 AM — 6:00 PM</td>
                <td>Anita Sharma</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section className="facilities-section">
        <h2 className="heading">OFFERINGS & FACILITIES</h2>

        <div className="facilities-container">

          <div className="facilities-grid">
            {facilities.map((item, index) => (
              <div
                key={index}
                className="facility"
                onClick={() => setSelected(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="icon">{item.icon}</div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          {selected && (
            <div className="exercise-box">
              <h3>{selected.title} Exercises</h3>
              <ul>
                {selected.exercises.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="facilities-image">
            <img src="./img/gym.jpg" alt="gym" />
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;