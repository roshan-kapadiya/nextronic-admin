const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: String,
  pimg: String,
  description: String,
  price: Number,
  category: String,
});

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
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
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },
  pid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

const Product = mongoose.model("Product", productSchema, "products");
const Admin = mongoose.model("Admin", adminSchema, "admins");
const Register = mongoose.model("Register", registerSchema, "registers");
const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = { Product, Admin, Register, Order };
