<div align="center">

# 🏋️‍♀️ Setup & Track - Fitness E-Commerce & Management Platform
**A complete Full-Stack MERN Application for Fitness Centers and Equipment Shopping**

<br />

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)

---

</div>

<br />

## 📖 About The Project

This is a comprehensive **Fitness E-Commerce and Gym Membership Management System** built with the **MERN** stack (MongoDB, Express, React, Node.js). 

It is designed to cater to two main types of users:
1. **Clients (Users):** Can browse fitness products, purchase gym memberships, and place orders seamlessly with integrated payments.
2. **Administrators:** Have access to an exclusive Admin Dashboard to manage products, membership plans, and approve or reject user orders.

The platform provides a smooth and responsive user interface, secure authentication, and robust backend architecture, making it an excellent demonstration of full-stack development capabilities.

<br />

## ✨ Key Features

### 👤 For Clients
*   **Authentication:** Secure registration and login system with role-based access.
*   **Product Store:** Browse and purchase fitness equipment/products.
*   **Membership Plans:** Explore and subscribe to various gym membership tiers.
*   **Secure Checkout:** Payment integration via **Razorpay** (Simulated & Live options).
*   **Order History:** Track the status of active and previous orders (Pending, Approved, Rejected).

### 🛡️ For Administrators (Admin Panel)
*   **Product Management:** Full CRUD operations (Create, Read, Update, Delete) for store products, including image uploads via Multer.
*   **Membership Management:** Create and adjust membership plans (duration, price, club, etc.).
*   **Order Moderation:** View user orders, track pending requests, and easily Approve or Reject active transactions. 
*   **User Management:** View all registered clients on the platform.

<br />

## 🛠️ Technology Stack

| Category | Technologies |
| --- | --- |
| **Frontend (Client & Admin)** | React.js, React Router DOM, Axios, React Icons, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Payment Gateway** | Razorpay |
| **File Storage** | Multer (Local storage for product images) |

<br />

## 📁 System Architecture & Structure

This project uses a monorepo-style structure separating the core concepts:

```text
📦 Fitness_tracker
 ┣ 📂 admin-app     # React frontend exclusively for Administrators
 ┣ 📂 client-app    # React frontend for Users/Clients
 ┗ 📂 backend       # Express.js RESTful API & Server
```

<br />

## 🚦 Getting Started (Local Setup)

To run this project locally, follow these steps:

### 1. Clone & Install
Ensure you have Node.js and MongoDB installed on your system.

```bash
# Clone the repository
git clone <repository-url>
cd Fitness_tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
*Create a `.env` file in the `backend` directory and add your Razorpay credentials:*
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
*Start the server:*
```bash
npm start
```
*(Server runs on http://localhost:5000)*

### 3. Client Frontend Setup
```bash
cd ../client-app
npm install
npm start
```

### 4. Admin Frontend Setup
```bash
cd ../admin-app
npm install
npm start
```

<br />

## 🔌 Core API Endpoints

Here is a brief overview of the REST API design handled by the backend:

-   **Auth:** `POST /api/registration`, `POST /api/login`
-   **Products:** `GET /api/products`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
-   **Memberships:** `GET /api/plans`, `POST /api/plans`
-   **Orders (Client):** `POST /api/orders`, `POST /api/purchase-membership`, `GET /api/orders/:userId`
-   **Orders (Admin):** `GET /api/admin/orders/pending`, `PUT /api/admin/orders/:id/approve`
-   **Payments:** `POST /api/create-order`

<br />

---

<div align="center">
  <p><b>Built with ❤️ as a portfolio showcase project.</b></p>
</div>
