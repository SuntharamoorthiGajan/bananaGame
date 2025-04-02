// Login.js - Handles user authentication for signing in
import React, { useState } from 'react';
// Import Link for navigation and useNavigate for redirection
import { Link, useNavigate } from "react-router-dom";
// Import CSS for styling
import '../../css/signup.css';


const Login = () => {
  // State variables for email, password, and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Hook for navigating to different pages
  const navigate = useNavigate(); 

  // Function to handle login form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Sending login request to backend API
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Convert user credentials into JSON format
        body: JSON.stringify({ email, password }),
      });

      // Parse the response from the backend
      const data = await response.json();

      // If login fails, throw an error
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login Response Data:", data);

      // Store the user data and token in localStorage
      localStorage.setItem("User", JSON.stringify(data.User));
      localStorage.setItem("token", data.token);

      // Notify Header to update username
      window.dispatchEvent(new Event("user-login"));

      // Redirect to user profile
      navigate("/userProfile");
    } catch (err) {
       // Show error message as an alert
      alert(err.message);
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="bg" style={{ backgroundImage: `url("./img/background/signupBG.png")` }}>
      <h1>Welcome back...</h1>
      {/* Login form */}
      <form className="signup-form" onSubmit={submitHandler}>
        {/* Email input field */}
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          className="signup-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        {/* Password input field */}
        <input 
          type="password" 
          placeholder="Enter Password" 
          className="signup-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        {/* Submit button */}
        <button type="submit" className="signup-button">Sign In</button>
      </form>

      {/* Display error message if login fails */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Link to navigate to the signup page */}
      <label>
        Create an account? <Link to="/signup" className="custom-link">Click here</Link>
      </label>
    </div>
  );
};

export default Login;
