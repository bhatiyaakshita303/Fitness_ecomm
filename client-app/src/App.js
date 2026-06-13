import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Activitydashboard from "./components/Activitydashboard";
import Membership from "./components/Membership";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProductDetail from "./components/ProductDetail";
import MyOrders from "./components/MyOrders";
import CartPage from "./components/CartPage";
import PaymentPage from "./components/PaymentPage";
import { CartProvider } from "./components/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function ClientLayout({ children }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideNavbar = path === "/registration" || path === "/login";
  const showFooter = ["/", "/home", "/about", "/activitydashboard", "/membership", "/gallery", "/contact"].includes(path);

  return (
    <>
      {!hideNavbar && <Nav />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          <Route
            path="/"
            element={
              <ClientLayout>
                <Home />
              </ClientLayout>
            }
          />

          <Route
            path="/home"
            element={
              <ClientLayout>
                <Home />
              </ClientLayout>
            }
          />

          <Route
            path="/about"
            element={
              <ClientLayout>
                <About />
              </ClientLayout>
            }
          />

          <Route
            path="/activitydashboard"
            element={
              <ClientLayout>
                <Activitydashboard />
              </ClientLayout>
            }
          />

          <Route
            path="/membership"
            element={
              <ClientLayout>
                <Membership />
              </ClientLayout>
            }
          />
          
          <Route
            path="/gallery"
            element={
              <ClientLayout>
                <Gallery />
              </ClientLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <ClientLayout>
                <Contact />
              </ClientLayout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ClientLayout>
                <ProductDetail />
              </ClientLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <ClientLayout>
                <ProtectedRoute role="client">
                  <CartPage />
                </ProtectedRoute>
              </ClientLayout>
            }
          />

          <Route
            path="/payment"
            element={
              <ClientLayout>
                <ProtectedRoute role="client">
                  <PaymentPage />
                </ProtectedRoute>
              </ClientLayout>
            }
          />

          <Route
            path="/myorders"
            element={
              <ClientLayout>
                <ProtectedRoute role="client">
                  <MyOrders />
                </ProtectedRoute>
              </ClientLayout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;