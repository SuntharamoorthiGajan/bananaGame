import React from 'react';
import { Link } from "react-router-dom";
import '../../css/signup.css'; 

// Home component - Displays the home screen with a background and a "Start" button
const Home = () => {
  return (
    <div className="Homebg" style={{ backgroundImage: `url("./img/background/HomeBG.gif")` }}>

        {/* Link to navigate to the GameMenu */}
        <Link to="/GameMenu" className="home-link">
          {Array.from("Start").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </Link>
      
    </div>
  );
}

export default Home;
