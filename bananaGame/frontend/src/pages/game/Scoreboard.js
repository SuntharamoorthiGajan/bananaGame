// Scoreboard.js - Displays the leaderboard sorted by user scores
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import CSS for styling
import '../../css/gameMenu.css';


const Scoreboard = () => {
    // State to store the list of users and their scores
    const [users, setUsers] = useState([]); 
    // Store logged-in user email
    const [userEmail, setUserEmail] = useState(null);  
    const navigate = useNavigate();

    // Fetch users' scores from the backend when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Send a request to fetch the list of users from the backend
                const response = await fetch("http://localhost:5000/api/auth/users");
                const data = await response.json();
                // Check if the response contains user data
                if (!data || !data.users) {
                    console.error("Error: No users found");
                    return;
                }
                // Update the state with the fetched user data
                setUsers(data.users);  
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        // Fetch user data when the component is mounted
        fetchUsers(); 
    }, []);

    // Check if a user is logged in; if not, redirect to the login page
    useEffect(() => {
        const userData = localStorage.getItem("User");
        if (!userData) {
            navigate("/login"); // Redirect if no user is found in localStorage
        } else {
            const user = JSON.parse(userData);
            setUserEmail(user.email); // Store the logged-in user's email
        }
    }, [navigate]);

    // Sort users by coins in descending order
    const sortedUsers = [...users].sort((a, b) => b.coins - a.coins);

    return (
        <div className="gamebg" style={{ backgroundImage: `url("./img/background/ScoreboardBg.gif")` }}>
            {/* Scoreboard container */}
            <div className="scoreBoard" style={{ backgroundImage: `url("./img/background/gameBoard.png")` }}>
                <table className='customTable'>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>User Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop through sorted users and display their ranking */}
                        {sortedUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.coins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scoreboard;
