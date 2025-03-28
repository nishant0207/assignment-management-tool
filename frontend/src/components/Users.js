import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/users", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const handleUpdateRole = async (id, role) => {
    try {
      await axios.put(
        `/api/admin/users/${id}`,
        { role },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      toast.success("User role updated successfully!");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user role:", error.message);
      toast.error("Failed to update user role.");
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${id}`, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error deleting user:", error.message);
        toast.error("Failed to delete user.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="border p-4 rounded-md shadow bg-gray-50"
            >
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <div className="mt-2 flex space-x-2">
                {user.role !== "admin" && (
                  <>
                    <button
                      onClick={() => handleUpdateRole(user._id, "manager")}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    >
                      Promote to Manager
                    </button>
                    <button
                      onClick={() => handleUpdateRole(user._id, "candidate")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Demote to Candidate
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete User
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;