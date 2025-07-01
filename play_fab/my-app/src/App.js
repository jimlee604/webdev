import logo from './logo.svg';
import './App.css';
import GameScreenComponent from './GameScreenComponent.js'
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,  
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";
import React, { useEffect, useState} from 'react';


<Route exact path='.' component={GameScreenComponent} />

const HomeComponent = () => {
  const navigate = useNavigate();
  return (
    <body style={{ backgroundColor: '#e38578' }}>
      <div className='height_10vh'></div>
      <div className='center'>
        <div>
          <h1>Welcome to <b>Flesh and Blood Lite</b></h1>
          <div className='height_30vh'></div>
          <div className='center'>
          <button onClick={() => navigate('/game')} class='start_button'>Play Game</button>
          </div>
        </div>
      </div>
    </body>
  );
}

// Home Page
function App() {
  return (
  <BrowserRouter>
  <Routes>
              <Route exact path='/' element={<HomeComponent />}></Route>
              <Route exact path='/game' element={<GameScreenComponent />}></Route>
            </Routes>
            </BrowserRouter>
  )
}

export default App;
