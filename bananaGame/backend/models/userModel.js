// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Define the User schema for the MongoDB collection
const UserSchema = mongoose.Schema({
    // The user's name (unique, required)
    userName: {
        type: String,
        required: true,
        unique: true // Ensure that each user has a unique userName
    },

    // The user's email (unique, required)
    email: {
        type: String,
        required: true,
        unique: true // Ensure that each user has a unique email address
    },

    // The user's password (required, minimum length of 8 characters)
    password: {
        type: String,
        required: true,
        minLength: 8 // Enforce minimum length of 8 for passwords
    },

    // The user's coin balance (default value is 00, stored as a number)
    coins: {
        type: Number,
        default: "00" // Default value is 00 if no value is provided
    }
});

// Create a model named 'user' based on the UserSchema
const user = mongoose.model("user", UserSchema);

// Export the 'user' model to be used in other parts of the application
export default user;
