import User from "../models/User.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "manager", "candidate"].includes(role)) {
      return res.status(400).json({ error: "Invalid role provided." });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ msg: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};