import './App.css';
import GameScreenComponent from './GameScreenComponent.js'
import HomeScreenComponent from './HomeScreenComponent.js'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import { PlayerTurnContext } from './PlayerTurnContext.js'
import { SelectedCardContext } from './SelectedCardContext.js'

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
  const [turnValue, setTurnValue] = useState(true)
  const [selectedCard, setSelectedCard] = useState(undefined)
  return (
    <PlayerTurnContext.Provider value={{ value: turnValue, setValue: setTurnValue}}>
      <SelectedCardContext.Provider value={{ value: selectedCard, setValue: setSelectedCard}}>
      <App />
      </SelectedCardContext.Provider>
    </PlayerTurnContext.Provider>
    );
}

export default Root;