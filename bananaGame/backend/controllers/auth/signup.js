// Import necessary modules
import User from "../../models/userModel.js";  
// bcrypt for password hashing and comparison
import bcrypt from "bcryptjs";
 // Utility to generate authentication tokens
import generateToken from "../../utils/generateToken.js";

// Signup Controller
export const signup = async (req, res) => {
    try {
        // Destructuring user input from the request body
        const { userName, email, password } = req.body;

        // Regex to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // If invalid email format
            return res.status(400).json({ error: "Invalid email format" });
        }

          // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
             // User already exists
            return res.status(400).json({ error: "Already Existing User Email" });
        }

        // Check if password meets minimum length requirement
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must have at least 8 characters" });
        }

        // Hash the password before saving it in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
            
        });

        // Save the user to the database and generate a token
        if (newUser) {
            // Generate and send authentication token
            generateToken(newUser._id, res);
            // Save new user to database
            await newUser.save();
            res.status(201).json({ 
                // Success response
                message: "User created successfully",
                User: {
                    userName: newUser.userName,
                    email: newUser.email
                }
            });
        } else {
            // Invalid user data
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        // Log error for debugging
        console.error(`Error in signup controller: ${error}`);
        // Server error response
        res.status(500).json({ error: "Internal server error" });
    }
};
