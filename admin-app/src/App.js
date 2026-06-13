import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminDash from "./components/AdminDash";
import Aproducts from "./components/Aproducts";
import Users from "./components/User";
import AdminOrders from "./components/AdminOrders";
import MembershipPlan from "./components/MembershipPlan"; 
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/admindash"
          element={
            <ProtectedRoute role="admin">
              <AdminDash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admindash/aproducts"
          element={
            <ProtectedRoute role="admin">
              <Aproducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admindash/user"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admindash/adminorders"
          element={
            <ProtectedRoute role="admin">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admindash/membershipplan"
          element={
            <ProtectedRoute role="admin">
              <MembershipPlan />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;