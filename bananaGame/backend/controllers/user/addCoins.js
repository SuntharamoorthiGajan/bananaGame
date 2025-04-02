// Import User model to interact with the user collection in the database
import User from "../../models/userModel.js";

// Add Coins Controller
export const addCoins = async (req, res) => {
    try {
        // Destructuring email and coins to add from the request body
        const { email, coinsToAdd} = req.body;

        // Destructuring email and coins to add from the request body
        const user = await User.findOne({ email });
        
        // If user is not found, return an error
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Adding coins to the user's existing coins (default 0 if undefined)
        user.coins = (user.coins || 0) + coinsToAdd;        
        
        // Save the updated user data in the database
        await user.save();

        // Return success response with updated user details
        res.status(200).json({
           // Success message
            message: "Coins updated successfully",
            User: {
                userName: user.userName,
                email: user.email,
                coins: user.coins
            }
        });
    } catch (error) {
        // Log error for debugging
        console.error(`Error in addCoinsAndScore controller: ${error}`);
        // Internal server error response
        res.status(500).json({ error: "Internal server error" });
    }
};