// Signup.js - Handles user registration for the application
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import CSS for styling
import '../../css/signup.css';

const Signup = () => {
  // State to store user input fields
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Store any error messages
  const [error, setError] = useState(null);
  // Dynamic placeholder for password field
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Enter Password");
  // Store success message
  const [successMessage, setSuccessMessage] = useState("");
  // Hook for navigation
  const navigate = useNavigate();

  // Hook for navigation
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!userName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send signup request to backend API
      const signupResponse = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      // Parse response data
      const signupData = await signupResponse.json();
      
      // Handle unsuccessful signup attempt
      if (!signupResponse.ok) {
        if (signupData.error === "Already Existing User Email") {
          alert("This email is already registered. Please log in.");
        }
        if (signupData.error === "Password must have at least 8 characters") {
          setPasswordPlaceholder("Password must have at least 8 characters.");
          setPassword(""); // Clear password field
        }
        throw new Error(signupData.error || "Signup failed");
      }

      console.log("Signup Success:", signupData);

      // Show success message and navigate to login page
      alert("Account created successfully! Please log in.");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds

    } catch (err) {
      
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="bg" style={{ backgroundImage: `url("./img/background/signupBG.png")` }}>
      <h1>Create new account</h1>
      {/* Signup form */}
      <form className="signup-form" onSubmit={submitHandler}>
        {/* user name input field */}
        <input 
          type="text" 
          placeholder="Enter User Name" 
          className="signup-input" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        {/* Email input field */}
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          className="signup-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        {/* Password input field */}
        <input 
          type="password" 
          placeholder={passwordPlaceholder} 
          className="signup-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* Submit button */}
        <button type="submit" className="signup-button">Signup</button>
      </form>
      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}
      {/* Display success message if signup is successful */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Signup;  // Export Signup component
