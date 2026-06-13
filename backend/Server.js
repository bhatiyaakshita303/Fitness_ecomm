const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(express.json());
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== DATABASE CONNECTION =====
mongoose
  .connect("mongodb://127.0.0.1:27017/fitnessDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// ===== SCHEMAS =====

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "admin"], default: "client" },
});
const User = mongoose.model("User", UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});
const Product = mongoose.model("Product", ProductSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,

  type: String,

  products: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],

  membership: {
    planId: mongoose.Schema.Types.ObjectId,
    club: String,
    planName: String,
    duration: String,
    price: Number
  },

  total: Number,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["paid", "refunded"],
    default: "paid"
  },

  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

// ===== MEMBERSHIP SCHEMA =====
const MembershipPlanSchema = new mongoose.Schema({
  club: { type: String, required: true },
  planName: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const MembershipPlan = mongoose.model("MembershipPlan", MembershipPlanSchema);

// ===== MULTER CONFIG =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ===== USER APIS =====

// Registration
app.post("/api/registration", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({
      username,
      email,
      password,
      role: role || "client",
    });
    await newUser.save();

    res.status(200).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    //FIXED RESPONSE (username added)
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== PRODUCT APIS =====

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new product
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { productName, price } = req.body;
  if (!productName || !price)
    return res.status(400).json({ message: "All fields required" });

  const product = new Product({
    productName,
    price,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });
  await product.save();
  res.status(201).json(product);
});

// Update product
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  const { productName, price } = req.body;
  let updateData = { productName, price };
  if (req.file) updateData.image = `/uploads/${req.file.filename}`;
  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// ===== ORDER APIS =====
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, products, total } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing order data" });
    }

    console.log("USER ID RECEIVED:", userId);
    const user = await User.findById(userId.trim());
    console.log("USER FOUND:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      userId: user._id,
      username: user.username,
      email: user.email,
      type: "product",
      products: products.map(p => ({
        name: p.name,
        price: Number(p.price),
        qty: Number(p.qty),
        img: p.img
      })),
      total: Number(total)
    });

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// MEMBERSHIP API
app.post("/api/purchase-membership", async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const plan = await MembershipPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const order = new Order({
      userId: user._id,
      username: user.username,
      email: user.email,
      type: "membership",
      membership: {
        planId: plan._id,
        club: plan.club,
        planName: plan.planName,
        duration: plan.duration,
        price: Number(plan.price)
      },
      total: plan.price
    });

    await order.save();

    res.json({
      success: true,
      message: "Membership purchased successfully",
      order
    });

  } catch (err) {
    console.error("MEMBERSHIP PURCHASE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET orders of specific user
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userId)
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("FETCH USER ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (Admin only)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== MEMBERSHIP PLAN CRUD =====

app.get("/api/plans", async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    console.error("GET PLANS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/plans", async (req, res) => {
  try {
    const newPlan = new MembershipPlan(req.body);
    await newPlan.save();
    res.json({ success: true, plan: newPlan });
  } catch (err) {
    console.error("CREATE PLAN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/plans/:id", async (req, res) => {
  try {
    await MembershipPlan.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("UPDATE PLAN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/plans/:id", async (req, res) => {
  try {
    await MembershipPlan.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE PLAN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ADMIN ORDER ROUTES =================

// Get all pending orders
app.get("/api/admin/orders/pending", async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("FETCH PENDING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get approved orders
app.get("/api/admin/orders/approved", async (req, res) => {
  try {
    const orders = await Order.find({ status: "approved" })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("FETCH APPROVED ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get rejected orders
app.get("/api/admin/orders/rejected", async (req, res) => {
  try {
    const orders = await Order.find({ status: "rejected" })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("FETCH REJECTED ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= APPROVE ORDER =================
app.put("/api/admin/orders/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order approved successfully",
      order
    });

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= REJECT ORDER =================
app.put("/api/admin/orders/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        paymentStatus: "refunded"
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order rejected successfully",
      order
    });

  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/fake-payment", async (req, res) => {
  try {
    const { userId, products, total } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      userId: user._id,
      username: user.username,
      email: user.email,
      type: "product",
      products: products.map(p => ({
        name: p.name,
        price: Number(p.price),
        qty: Number(p.qty)
      })),
      total: Number(total),
      status: "pending"
    });

    await order.save();

    res.json({
      success: true,
      message: "Payment Successful",
      order
    });

  } catch (err) {
    console.error("FAKE PAYMENT ERROR:", err);
    res.status(500).json({ message: "Payment Failed" });
  }
});

//razorpay
app.post("/api/create-order", async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_order_1"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () =>
  console.log("Server running at http://localhost:5000")
);