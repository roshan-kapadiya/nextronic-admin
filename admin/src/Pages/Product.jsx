import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import "/src/style/admin.css";
import { Link } from "react-router-dom";

const Product = () => {
  const [formData, setFormdata] = useState({
    pname: "",
    pimg: null,
    description: "",
    price: 0,
    category: "",
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleChangeImg = (e) => {
    setFormdata({ ...formData, pimg: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("pname", formData.pname);
    formDataToSend.append("pimg", formData.pimg);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("✅ Product added successfully");
        fetchData();
      } else {
        alert("❌ Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ An error occurred");
    } finally {
      setFormdata({
        pname: "",
        pimg: null,
        description: "",
        price: 0,
        category: "",
      });
      document.getElementById("productImage").value = "";
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/Delproducts/${productId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("🗑️ Product deleted successfully");
        fetchData();
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ An error occurred");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/getProducts");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("❌ Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar>
        {/* Add Product Form */}
        <div className="p-4">
          <form
            className="bg-white p-4 rounded shadow border"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h3 className="border-bottom pb-3">Manage Products</h3>
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control border-secondary"
                name="pname"
                value={formData.pname}
                onChange={handleChange}
                required
              />
            </div>
            {/* Product Image */}
            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control border-secondary"
                id="productImage"
                name="pimg"
                onChange={handleChangeImg}
                required
              />
            </div>
            {/* Product Description */}
            <div className="mb-3">
              <label className="form-label">Product Description</label>
              <textarea
                className="form-control border-secondary"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {/* Product Price */}
            <div className="mb-3">
              <label className="form-label">Product Price</label>
              <input
                type="number"
                className="form-control border-secondary"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            {/* Product Category */}
            <div className="mb-3">
              <label className="form-label">Product Category</label>
              <select
                className="form-select border-secondary"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="home-appliances">Home Appliances</option>
                <option value="kitchen">Kitchen</option>
                <option value="smart-devices">Smart Devices</option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Add Product
            </button>
          </form>
        </div>

        {/* Product Cards */}
        <div className="container mt-4">
          <h3 className="border-bottom pb-3">Product List</h3>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card shadow-sm h-100">
                  {product.pimg && (
                    <img
                      src={`http://localhost:5000/uploads/${product.pimg}`}
                      className="card-img-top"
                      alt={product.pname}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.pname}</h5>
                    <p className="card-text flex-grow-1">{product.description}</p>
                    <p className="fw-bold">₹{product.price}</p>
                    <p>
                      <span className="badge bg-info text-dark">{product.category}</span>
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/update-product/${product._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-center">No products available.</p>}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Product;
