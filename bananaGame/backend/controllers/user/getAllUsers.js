// Import User model to interact with the user collection in the database
import User from "../../models/userModel.js";

// Get All Users' Names and Coins
export const getAllUsers = async (req, res) => {
  try {
    // Fetching all users' usernames and coins from the database
      const users = await User.find({}, "userName coins");

      // If no users are found, return an empty list
      if (!users.length) {
          return res.status(200).json({ users: [] }); // Ensure JSON format
      }

      // Return the list of all users with their names and coins
      res.status(200).json({ users });
  } catch (error) {
      // Log error for debugging
      console.error("Error fetching users:", error);
      // Internal server error response
      res.status(500).json({ error: "Internal server error" });
  }
};