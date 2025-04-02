// App.js - Main application component that manages routing and global state
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import GameMenu from './pages/game/GameMenu';
import Header from './components/Header';
import GamePage from './pages/game/gamePage';
import Scoreboard from './pages/game/Scoreboard';
import Home from './pages/home/Home';
import UserProfile from './pages/user/UserProfile';

const App = () => {
  // Initialize coins and setCoins using useState
  const [coins, setCoins] = useState(0);

  return (
    <div>
      {/*  Header component displayed across all pages */}
      <Header />
      {/* Define application routes */}
      <Routes>
        {/* Home Page */}
        <Route path='/' element={<Home />} />
        {/* Login Page */}
        <Route path='/login' element={<Login />} />
        {/* Signup Page */}
        <Route path='/signup' element={<Signup />} />
        {/* Game Menu Page */}
        <Route path='/gameMenu' element={<GameMenu />} />
        {/* Pass both coins and setCoins to the GamePage component */}
        <Route path='/gamePage' element={<GamePage coins={coins} setCoins={setCoins} />} />
        {/* Game Menu Page */}
        <Route path='/scoreboard' element={<Scoreboard />} />
        {/* User Profile Page */}
        <Route path='/userProfile' element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default App; //  Export the main App component
