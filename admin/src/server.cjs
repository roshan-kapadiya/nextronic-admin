const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------- DB CONNECTION ----------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/dbProject")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------- SCHEMAS ----------------------
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  pname: String,
  pimg: String,
  description: String,
  price: Number,
  category: { type: String, required: true },
});

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  city: String,
  profile: String,
});

const orderSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "Register", required: true },
  pid: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

// ---------------------- MODELS ----------------------
const Admin = mongoose.model("Admin", adminSchema, "admins");
const Product = mongoose.model("Product", productSchema, "products");
const Register = mongoose.model("Register", registerSchema, "registers");
const Order = mongoose.model("Order", orderSchema, "orders");

// ---------------------- MULTER ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ---------------------- ROUTES ----------------------

// Admin registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Email already exists" });
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.json({ message: "✅ Admin registered", id: newAdmin._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

// Admin login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });
    if (admin.password !== password) return res.status(400).json({ message: "Invalid password" });
    res.json({ message: "✅ Login successful", id: admin._id });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Add product
app.post("/products", upload.single("pimg"), async (req, res) => {
  try {
    const { pname, description, price, category } = req.body;
    const pimg = req.file ? req.file.filename : null;
    const newProduct = new Product({ pname, description, price, category, pimg });
    await newProduct.save();
    res.json({ message: "✅ Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err });
  }
});

// Get all products
app.get("/getProducts", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
});

// Get single product by ID
app.get("/getProducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err });
  }
});

// Update product by ID
app.put("/updateProducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const { pname, description, price, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { pname, description, price, category },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "✅ Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err });
  }
});

// Delete product by ID
app.delete("/Delproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "🗑️ Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await Register.find().sort({ _id: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("uid", "name email")
      .populate("pid", "pname price category pimg")
      .sort({ order_date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
});

// Delete order
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid order ID" });

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "🗑️ Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: err });
  }
});

// ---------------------- START SERVER ----------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Admin server running on port ${PORT}`));
