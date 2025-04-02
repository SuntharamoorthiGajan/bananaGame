// Import User model to interact with the user collection in the database
import User from "../../models/userModel.js";

// Get User Data Controller
export const userData = async (req, res) => {
    const { email } = req.body;

  try {
    // Find user by email in the database
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user data (username, email, coins)
    res.status(200).json({
      User: {
        userName: user.userName,
        email: user.email,
        coins: user.coins
      }
    });
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching user data:", error);
    // Internal server error response
    res.status(500).json({ error: "Internal server error" });
  }

};


