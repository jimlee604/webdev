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
import { TurnStepContext } from './TurnStepContext.js'
import { AttackingCardContext } from './AttackingCardContext.js';
import { PitchCardsSelectedContext } from './PitchCardsSelectedContext.js';
import { PitchAmountContext } from './PitchAmountContext'

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
  const [turnStepValue, setTurnStepValue] = useState("Attack")
  const [selectedCardValue, setSelectedCardValue] = useState(undefined)
  const [attackingCardValue, setAttackingCardValue] = useState(undefined)
  const [pitchCardsSelectedValue, setPitchCardsSelectedValue] = useState(new Set())
  const [pitchAmountValue, setPitchAmountValue] = useState(0)
  return (
    <PlayerTurnContext.Provider value={{ turnValue: turnValue, setTurnValue: setTurnValue }}>
      <TurnStepContext.Provider value={{ turnStepValue: turnStepValue, setTurnStepValue: setTurnStepValue }}>
        <SelectedCardContext.Provider value={{ selectedCardValue: selectedCardValue, setSelectedCardValue: setSelectedCardValue }}>
          <AttackingCardContext.Provider value={{ attackingCardValue: attackingCardValue, setAttackingCardValue: setAttackingCardValue }}>
            <PitchCardsSelectedContext.Provider value={{ pitchCardsSelectedValue: pitchCardsSelectedValue, setPitchCardsSelectedValue: setPitchCardsSelectedValue}}>
              <PitchAmountContext.Provider value={{pitchAmountValue: pitchAmountValue, setPitchAmountValue: setPitchAmountValue}}>
            <App />
            </PitchAmountContext.Provider>
            </PitchCardsSelectedContext.Provider>
          </AttackingCardContext.Provider>
        </SelectedCardContext.Provider>
      </TurnStepContext.Provider>
    </PlayerTurnContext.Provider>
  );
}

export default Root;