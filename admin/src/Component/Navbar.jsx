import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/N.png";
import profile from "../assets/admin.png";


const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/login");
  };
  return (
    <>
      <div className="wrapper">
        <aside className="sidebar">
          <div className="p-3 text-center border-bottom">
            <img
              src={logo}
              className="img-fluid mb-2"
              style={{ maxHeight: "150px" }}
            />
            <h5>Admin Panel</h5>
          </div>
          <nav>
            <Link to="/">📦 Manage Products</Link>
            <Link to="/orders">🛒 View Orders</Link>
            <Link to="/users">👤 Manage Users</Link>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-transparent border-0 text-dark px-3 py-2"
            >
              🚪LogOut
            </button>
            <div className="position-fixed bottom-0">
              <div className="d-flex justify-content-evenly align-items-center p-3 border-top">
                <div className="col">
                  <img
                    src={profile}
                    alt="Admin"
                    className="img-fluid "
                    style={{ maxHeight: "40px" }}
                  />
                </div>
                <div className="">
                  <p className="m-0">
                    Admin <br />
                    admin@gamil.com
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        <div class="content flex-grow-1">
          <nav class="navbar navbar-light w-100 p-4 bg-dark border-bottom">
            <button class="btn btn-outline-secondary" id="menu-toggle">
              ☰
            </button>
            <span class="navbar-brand text-white">Nextronic Shop</span>
          </nav>
          <div className=" p-4" style={{ minHeight: "calc(100vh - 80px)" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
