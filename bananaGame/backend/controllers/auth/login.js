// Import necessary modules
import User from "../../models/userModel.js";  
// bcrypt for password hashing and comparison
import bcrypt from "bcryptjs";
 // Utility to generate authentication tokens
import generateToken from "../../utils/generateToken.js";

// Login Controller
export const login = async (req, res) => {
    try {
        // Destructuring user input from the request body
        const { email, password } = req.body;

         // Find user by email
        const foundUser = await User.findOne({ email });

        // If user is not found, return error
        if (!foundUser) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare provided password with stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordCorrect) {
            // Password mismatch
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate and send token on successful login
        generateToken(foundUser._id, res);
        
        // Send user data in response
        res.status(200).json({
            // Success response
            message: "Successfully logged in",
            User: {
                userName: foundUser.userName,
                email: foundUser.email
                
            },
            // Send token for authentication
            token: generateToken(foundUser._id, res)
        });

    } catch (error) {
        // Log error for debugging
        console.error(`Error in login controller: ${error}`);
        // Server error response
        res.status(500).json({ error: "Internal server error" });
    }
};