import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ coins })=> {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to get user data from the backend
  const fetchUserData = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.User);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to load user and get latest data from localStorage.
  const loadUser = () => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user from localStorage
        fetchUserData(parsedUser.email); // Get the latest data from the backend
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  };

  useEffect(() => {
    
    loadUser(); // Initial loading of user data

    // Listen to login event to update user status
    const handleUserLogin = () => {
      loadUser();
    };

    window.addEventListener("user-login", handleUserLogin);

    return () => {
      window.removeEventListener("user-login", handleUserLogin);
    };
  }, []);

  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("User");
    setUser(null);
    navigate("/login");

    // Dispatch event to notify other components about logout
    window.dispatchEvent(new Event("user-login"));
  };

  return (
    <nav className="navbar">
      <img src={"./img/background/Navigation.png"} className="logoimg" alt="Navigation" />
      <div className="User_name">{user ? user.userName : "Guest"}</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="cust-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/userProfile" className="cust-link">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/GameMenu" className="cust-link">
            Game
          </Link>
        </li>
        {user ? (
          <li>
            <Link to="/login" onClick={handleLogout} className="cust-link">
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="cust-link">
              Login
            </Link>
          </li>
        )}
      </ul>

      <div className="coin-counter">
        <img src={"./img/background/coin.png"} alt="Coin" className="coin-icon" />
        <span className="coin-value">{user ? user.coins : "00"}</span>
      </div>
    </nav>
  );
};

export default Header;
