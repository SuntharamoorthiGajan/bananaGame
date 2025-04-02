// Importing the jsonwebtoken package to handle JWT generation
import jwt from "jsonwebtoken";

// Function to generate a JWT token and send it as a cookie in the response
const generateToken = (userId, res) => {
    // Create a JWT token with the userId as payload, signed with the secret key from environment variables
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d" // Token will expire in 15 days
    });

    // Set the token as an HTTP-only cookie in the response with the following options:
    res.cookie("jwt", token, {
        // Set the cookie expiration time to 15 days (in milliseconds)
        maxAge: 15 * 24 * 60 * 1000, // 15 days
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        samesite: "strict", // Enforces the cookie to be sent in requests from the same site only
        secure: process.env.NODE_ENV !== "development" // Ensures cookie is only sent over HTTPS in non-development environments
    });
};

// Export the generateToken function to be used elsewhere in the application
export default generateToken;
