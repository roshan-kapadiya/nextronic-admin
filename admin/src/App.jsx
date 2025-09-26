import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Navbar from "./Component/Navbar";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import Register from "./Pages/Register";   // ✅ import Register
import UpdateProduct from "./Pages/UpdateProduct";

function App() {
  const id = localStorage.getItem("id");
  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}

        <Routes>
          {/* If logged in → Product, else → Login */}
          <Route path="/" element={id !== null ? <Product /> : <Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />   {/* ✅ Register route */}
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
