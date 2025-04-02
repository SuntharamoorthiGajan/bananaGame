import React from 'react';
import { Link } from "react-router-dom";
import '../../css/gameMenu.css'; // Importing the CSS file for styling

// The GameMenu component provides the game's main menu.
const GameMenu = () => {
  return (
    // Container section with background image for game menu
    <div className="gamebg" style={{ backgroundImage: `url("./img/background/gameBg.gif")` }}>
      {/* Button for Easy mode */}
      <div className='gameButton' style={{ backgroundImage: `url("./img/background/button.png")` }}>
        <Link to="/gamePage?mode=Easy" className="Game-link">Easy</Link>
      </div>
      {/* Button for Hard mode */}
      <div className='gameButton' style={{ backgroundImage: `url("./img/background/button.png")` }}>
        <Link to="/gamePage?mode=Hard" className="Game-link">Hard</Link>
      </div>
      {/* Button to navigate to the Scoreboard page */}
      <div className='gameButton' style={{ backgroundImage: `url("./img/background/button.png")` }}>
        <Link to="/Scoreboard" className="Game-link">Scoreboard</Link>
      </div>
      {/* Button to exit and go back to the home page */}
      <div className='gameButton' style={{ backgroundImage: `url("./img/background/button.png")` }}>
        <Link to="/" className="Game-link">Exit</Link>
      </div>
    </div>
  );
};

export default GameMenu;
