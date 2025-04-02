// UserProfile.js - Displays the user's profile information
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import CSS for styling
import '../../css/signup.css';


const UserProfile = () => {
  // State to store user details
  const [user, setUser] = useState(null);
  // Hook for navigation
  const navigate = useNavigate();

  // Function to fetch the latest user data from the server
  const fetchUserData = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the email in the body
        body: JSON.stringify({ email }), 
      });

      const data = await response.json();
      if (response.ok) {
        // Update the user state with the latest data
        setUser(data.User);  
      } else {
        // Log error if user data is not fetched successfully
        console.error(data.error);
      }
    } catch (error) {
      // Catch and log any errors during the fetch request
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      try {
        // Parse user data from localStorage
        const parsedUser = JSON.parse(storedUser);
        console.log("Stored User Data:", parsedUser);
        // Set user data from localStorage initially
        setUser(parsedUser); // Set user from localStorage initially
        // Fetch latest user data from backend
        fetchUserData(parsedUser.email); // Fetch latest data from backend
      } catch (error) {
        // Catch and log any parsing errors
        console.error("Error parsing user data:", error);
      }
    } else {
      // Redirect to login if no user is found
      navigate("/login"); 
    }
  }, [navigate]); // Run the effect when the component mounts

  return (
    <div className="bg" style={{ backgroundImage: `url("./img/background/game.png")` }}>
      <div className="profile-container">
        <h3>User Profile</h3>
        {user ? (
          <div>
            <table className="profile-table">
              <tr>
                <th>
                  {/* Placeholder for user profile image */}
                  <img src="./05.png" alt="User Profile" height="250" width="250" />
                </th>
                <th>
                  {/* Display user information */}
                  <p><strong>Name:</strong> {user.userName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Coins:</strong> {user.coins}</p>
                </th>
              </tr>
            </table>
          </div>
        ) : (
          // Show loading message while fetching data
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile; // Export UserProfile component
