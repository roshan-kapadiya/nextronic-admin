import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/orders");
      const result = await response.json();
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("🗑️ Order deleted successfully");
        fetchData();
      } else {
        alert("❌ Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ An error occurred while deleting");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Navbar>
      <div className="container my-4">
        <h3 className="border-bottom pb-3 mb-4">Manage Orders</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Order Date</th>
                <th>Product Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const product = order.pid;
                  const user = order.uid;
                  return (
                    <tr key={order._id}>
                      <td>{user?.name || "N/A"}</td>
                      <td>{product?.pname || "N/A"}</td>
                      <td>₹{product?.price || 0}</td>
                      <td>{new Date(order.order_date).toLocaleDateString()}</td>
                      <td>
                        {product?.pimg && (
                          <img
                            src={`http://localhost:5000/uploads/${product.pimg}`}
                            alt={product?.pname}
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
};

export default Orders;
