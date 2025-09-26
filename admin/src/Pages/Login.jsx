import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Login successful");
      localStorage.setItem("id", data.id);
      navigate("/products");
    } else {
      alert("Invalid email or password");
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
        className="border border-warning p-4 w-50 mx-auto d-block"
      >
        <h2>Login Here!</h2>
        <hr />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="form-control border-dark"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-control border-dark"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-outline-dark w-25">
          Login
        </button>

        <p className="mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
