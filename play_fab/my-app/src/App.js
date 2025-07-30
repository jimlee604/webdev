import './App.css';
import Hand from "./Classes/Hand";
import GameScreenComponent from './Components/GameScreenComponent'
import HomeScreenComponent from './Components/HomeScreenComponent'
import { AttackingCardContext } from './Contexts/AttackingCardContext.ts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OpponentAttack, OpponentAttackContext } from './Contexts/OpponentAttackContext.ts'
import { useState } from 'react';
import { PlayerTurnContext } from './Contexts/PlayerTurnContext'
import { SelectedCardContext } from './Contexts/SelectedCardContext'
import { TurnStepContext } from './Contexts/TurnStepContext'
import { PitchCardsSelectedContext } from './Contexts/PitchCardsSelectedContext';
import { PitchAmountContext } from './Contexts/PitchAmountContext'
import { PlayerHandContext } from './Contexts/PlayerHandContext';
import { OpponentHandContext } from './Contexts/OpponentHandContext';
import { OpponentBlocksContext } from './Contexts/OpponentBlocksContext';
import { TurnStep } from "./Classes/TurnStep"
import { PlayerLifeContext } from './Contexts/PlayerLifeContext';
import { OpponentLifeContext } from './Contexts/OpponentLifeContext'
import { PlayerBlocksContext } from './Contexts/PlayerBlocksContext';
import { STARTING_LIFE_TOTAL } from './Utils'

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
  const [playerTurnValue, setPlayerTurnValue] = useState(true);
  const [turnStepValue, setTurnStepValue] = useState(TurnStep.SELECT_ATTACK);
  const [selectedCardValue, setSelectedCardValue] = useState(undefined);
  const [attackingCardValue, setAttackingCardValue] = useState(undefined);
  const [pitchCardsSelectedValue, setPitchCardsSelectedValue] = useState(new Set());
  const [pitchAmountValue, setPitchAmountValue] = useState(0);
  const playerHand = new Hand([], true);
  playerHand.refill();
  const oppHand = new Hand([], false);
  oppHand.refill();
  const [playerHandValue, setPlayerHandValue] = useState(playerHand);
  const [opponentHandValue, setOpponentHandValue] = useState(oppHand);
  const [opponentBlocksValue, setOpponentBlocksValue] = useState(new Set());
  const [playerLifeValue, setPlayerLifeValue] = useState(STARTING_LIFE_TOTAL); // TODO: life total variable
  const [opponentLifeValue, setOpponentLifeValue] = useState(STARTING_LIFE_TOTAL);
  const [opponentAttackValue, setOpponentAttackValue] = useState(new OpponentAttack(null, new Set()));
  const [playerBlocksValue, setPlayerBlocksValue] = useState(new Set());
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
                          <OpponentAttackContext.Provider value={{ opponentAttackValue: opponentAttackValue, setOpponentAttackValue: setOpponentAttackValue }}>
                            <PlayerBlocksContext.Provider value={{ playerBlocksValue: playerBlocksValue, setPlayerBlocksValue: setPlayerBlocksValue }}>
                              <App />
                            </PlayerBlocksContext.Provider>
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