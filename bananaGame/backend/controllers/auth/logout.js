// Logout Controller
export const logout = async (req, res) => {
    try {
        // Clear the authentication cookie and send success response
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        // Log error for debugging
        console.error(`Error in logout controller: ${error}`);
        // Server error response
        res.status(500).json({ error: "Internal server error" });
    }
};
