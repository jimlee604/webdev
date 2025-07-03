import './App.css';
import GameScreenComponent from './GameScreenComponent.js'
import HomeScreenComponent from './HomeScreenComponent.js'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createContext } from 'react';
import { PlayerTurnProvider } from './PlayerTurnContext.js';

// Home Page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeScreenComponent />}></Route>
        <Route exact path='/game' element={<GameScreenComponent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

function Root() {
  return (
    <PlayerTurnProvider><App /></PlayerTurnProvider>
  )
}

export default Root;