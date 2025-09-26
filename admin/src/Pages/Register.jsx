import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Registration successful");
      localStorage.setItem("id", data.id);
      navigate("/products");
    } else {
      alert("Email already exists or registration failed");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      // if already logged in
      navigate("/products");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="border border-success p-4 w-50 mx-auto d-block"
      >
        <h2>Register Here!</h2>
        <hr />
        <div className="mb-3">
          <label className="form-label">Enter Name</label>
          <input
            type="text"
            placeholder="Name"
            className="form-control border-dark"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Email</label>
          <input
            type="email"
            placeholder="Email"
            className="form-control border-dark"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control border-dark"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-outline-success w-25">
          Register
        </button>

        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
