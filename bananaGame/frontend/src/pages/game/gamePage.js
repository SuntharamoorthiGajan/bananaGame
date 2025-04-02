// GamePage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/gameMenu.css'; // Importing the CSS file for styling

// GamePage component handles the game logic and UI
const GamePage = ({ coins, setCoins }) => {  // Receive both coins and setCoins as props
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode'); // Get the game mode from the URL (Easy or Hard)

  
  // Set initial time and lives based on difficulty mode
  const initialTime = mode === 'Hard' ? 30 : 60;
  const initialLives = mode === 'Hard' ? 1 : 2;

  // State variables
  const [currentEquation, setCurrentEquation] = useState({ imageUrl: '', solution: 0 });
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [lives, setLives] = useState(initialLives);
  const [userEmail, setUserEmail] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Check if the user is logged in, otherwise redirect to the login page.
  useEffect(() => {
    const userData = localStorage.getItem("User");
    if (!userData) {
      navigate("/login");
    } else {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, [navigate]);

  
  // Fetch a new game equation and start the timer
  useEffect(() => {
    fetchGameData();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimeLeft(0);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle game over state
  useEffect(() => {
    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver]);

  // Fetch game equation from API
  const fetchGameData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php?out=csv&base64=yes");
      const data = await response.text();
      const [base64Image, solution] = data.split(",");
      setCurrentEquation({
        imageUrl: `data:image/png;base64,${base64Image}`,
        solution: parseInt(solution, 10),
      });
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  // Handle user answer submission
  const handleAnswerSubmit = () => {
    if (gameOver) return;
  
    if (parseInt(answer) === currentEquation.solution) {
      // Reward 20 coins for Hard mode, 10 for Easy mode
      const coinsToAdd = mode === 'Hard' ? 20 : 10; 
      setCoins((prevCoins) => prevCoins + coinsToAdd);
      setAnswer('');
      // Load a new question
      fetchGameData();
    } else {
      if (lives > 1) {
        setLives((prevLives) => prevLives - 1);
        alert(`Wrong answer! You have ${lives - 1} lives left.`);
      } else {
        setLives(0);
        setGameOver(true);
      }
      setAnswer('');
    }
  };
  
   // Handle game over logic
  const handleGameOver = async () => {
    if (!userEmail) {
      navigate('/GameMenu');
      return;
    }

    // Show final score
    alert(`Game Over! You earned ${coins} coins!`); 

    try {
      // Send the updated coins to the backend
      const response = await fetch("http://localhost:5000/api/auth/addCoins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send user email and earned coins
        body: JSON.stringify({ email: userEmail, coinsToAdd: coins }), // coins passed from props
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Coins updated:", data);
      } else {
        console.error("Error updating coins:", data.error);
      }
    } catch (error) {
      console.error("Error sending game data:", error);
    }

    //Redirect to the game menu when the game is finished
    navigate('/GameMenu');
  };

  return (
    <div className="gamebg" style={{ backgroundImage: `url("./img/background/game.png")` }}>
      <table>
        <tbody>
          <tr>
            {/* Display the math equation image */}
            <th>
              <div className="gameBoard" style={{ backgroundImage: `url("./img/background/gameBoard.png")` }}>
                {currentEquation.imageUrl && (
                  <img src={currentEquation.imageUrl} alt="Equation" className="equation-image" />
                )}
              </div>
            </th>
            <th>
              {/* Show like timer, lives, and coins.*/}
              <div className="Score">
                <h3>Time Left: {timeLeft}s</h3>
                <h3>Lives: {lives}</h3>
                <h3>Coins: {coins}</h3> 
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      {/* Input field for the answer */}
      <input
        className='customInput'
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter answer"
      />
      <button onClick={handleAnswerSubmit} className='customSubmitButton'>Submit</button>
    </div>
  );
};

export default GamePage;
