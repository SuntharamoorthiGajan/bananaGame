// Import mongoose library to interact with MongoDB
import mongoose from "mongoose";

// connectDB function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection URL from environment variables
        await mongoose.connect(process.env.MONGO_URL);

        // If connection is successful, log the success message
        console.log("MongoDB connected");
    } catch (error) {
        // If an error occurs during the connection attempt, log the error
        console.log(`Error in connecting DB: ${error}`);

        // Exit the process with a non-zero status code to indicate failure
        process.exit(1);
    }
}

// Export the connectDB function to be used elsewhere in the application
export default connectDB;
