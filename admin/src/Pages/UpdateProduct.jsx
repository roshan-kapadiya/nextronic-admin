import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [formData, setFormdata] = useState({
    pname: "",
    description: "",
    price: 0,
    category: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/getProducts/${id}`);
    if (response.ok) {
      const data = await response.json();
      setFormdata({
        pname: data.pname,
        description: data.description,
        price: data.price,
        category: data.category,
      });
    } else {
      console.error("Failed to fetch product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/updateProducts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Product updated successfully");
        navigate("/"); // redirect to admin product page
      } else {
        alert("❌ Failed to update product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar>
        <div className="p-4">
          <form
            className="bg-white p-4 rounded shadow border"
            onSubmit={handleSubmit}
          >
            <h3 className="border-bottom pb-3">Update Product</h3>

            {/* Product Name */}
            <div className="mb-3">
              <label htmlFor="productName" className="form-label border-secondary">
                Product Name
              </label>
              <input
                type="text"
                className="form-control border-secondary"
                id="productName"
                name="pname"
                value={formData.pname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Product Description */}
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Product Description
              </label>
              <textarea
                className="form-control border-secondary"
                id="productDescription"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Product Price */}
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Product Price
              </label>
              <input
                type="number"
                className="form-control border-secondary"
                id="productPrice"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Product Category */}
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">
                Product Category
              </label>
              <select
                className="form-select border-secondary"
                id="productCategory"
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
              Update Product
            </button>
          </form>
        </div>
      </Navbar>
    </>
  );
};

export default UpdateProduct;
