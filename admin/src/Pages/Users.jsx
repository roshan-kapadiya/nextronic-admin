import React from "react";
import Navbar from "../Component/Navbar";
import { useState } from "react";
import { useEffect } from "react";

const Users = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Navbar>
      <div>
        <h3 className="border-bottom pb-3">Manage Users</h3>
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Navbar>
  );
};

export default Users;
