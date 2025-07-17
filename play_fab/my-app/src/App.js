import './App.css';
import GameScreenComponent from './GameScreenComponent'
import HomeScreenComponent from './HomeScreenComponent'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import { PlayerTurnContext } from './PlayerTurnContext'
import { SelectedCardContext } from './SelectedCardContext'
import { TurnStepContext } from './TurnStepContext'
import { AttackingCardContext } from './AttackingCardContext';
import { PitchCardsSelectedContext } from './PitchCardsSelectedContext';
import { PitchAmountContext } from './PitchAmountContext'
import { PlayerHandContext } from './PlayerHandContext';
import { OpponentHandContext } from './OpponentHandContext';
import { OpponentBlocksContext } from './OpponentBlocksContext';
import Hand from "./Hand";
import { TurnStep } from "./TurnStep.js"
import { PlayerLifeContext } from './PlayerLifeContext';
import { OpponentLifeContext } from './OpponentLifeContext'
import { OpponentAttack, OpponentAttackContext } from './OpponentAttackContext.js'

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
  const [playerTurnValue, setPlayerTurnValue] = useState(true)
  const [turnStepValue, setTurnStepValue] = useState(TurnStep.SELECT_ATTACK)
  const [selectedCardValue, setSelectedCardValue] = useState(undefined)
  const [attackingCardValue, setAttackingCardValue] = useState(undefined)
  const [pitchCardsSelectedValue, setPitchCardsSelectedValue] = useState(new Set())
  const [pitchAmountValue, setPitchAmountValue] = useState(0)
  const playerHand = new Hand([], true)
  playerHand.refill();
  const oppHand = new Hand([], false)
  oppHand.refill();
  const [playerHandValue, setPlayerHandValue] = useState(playerHand)
  const [opponentHandValue, setOpponentHandValue] = useState(oppHand)
  const [opponentBlocksValue, setOpponentBlocksValue] = useState(new Set())
  const [playerLifeValue, setPlayerLifeValue] = useState(40)
  const [opponentLifeValue, setOpponentLifeValue] = useState(40)
  const [opponentAttackValue, setOpponentAttackValue] = useState(new OpponentAttack(null, new Set()))
  return (
    <PlayerTurnContext.Provider value={{ playerTurnValue: playerTurnValue, setPlayerTurnValue: setPlayerTurnValue }}>
      <TurnStepContext.Provider value={{ turnStepValue: turnStepValue, setTurnStepValue: setTurnStepValue }}>
        <SelectedCardContext.Provider value={{ selectedCardValue: selectedCardValue, setSelectedCardValue: setSelectedCardValue }}>
          <AttackingCardContext.Provider value={{ attackingCardValue: attackingCardValue, setAttackingCardValue: setAttackingCardValue }}>
            <PitchCardsSelectedContext.Provider value={{ pitchCardsSelectedValue: pitchCardsSelectedValue, setPitchCardsSelectedValue: setPitchCardsSelectedValue }}>
              <PitchAmountContext.Provider value={{ pitchAmountValue: pitchAmountValue, setPitchAmountValue: setPitchAmountValue }}>
                <PlayerHandContext.Provider value={{ playerHandValue: playerHandValue, setPlayerHandValue, setPlayerHandValue }}>
                  <OpponentHandContext.Provider value={{ opponentHandValue: opponentHandValue, setOpponentHandValue: setOpponentHandValue }}>
                    <OpponentBlocksContext.Provider value={{ opponentBlocksValue: opponentBlocksValue, setOpponentBlocksValue: setOpponentBlocksValue }}>
                      <PlayerLifeContext.Provider value={{ playerLifeValue: playerLifeValue, setPlayerLifeValue: setPlayerLifeValue }}>
                        <OpponentLifeContext.Provider value={{ opponentLifeValue: opponentLifeValue, setOpponentLifeValue: setOpponentLifeValue }}>
                          <OpponentAttackContext.Provider value={{ opponentAttackValue: opponentAttackValue, setOpponentAttackValue: setOpponentAttackValue}}>
                          <App />
                          </OpponentAttackContext.Provider>
                        </OpponentLifeContext.Provider>
                      </PlayerLifeContext.Provider>
                    </OpponentBlocksContext.Provider>
                  </OpponentHandContext.Provider>
                </PlayerHandContext.Provider>
              </PitchAmountContext.Provider>
            </PitchCardsSelectedContext.Provider>
          </AttackingCardContext.Provider>
        </SelectedCardContext.Provider>
      </TurnStepContext.Provider>
    </PlayerTurnContext.Provider>
  );
}

export default Root;