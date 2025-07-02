import logo from './logo.svg';
import './App.css';
import GameScreenComponent from './GameScreenComponent.js'
import HomeScreenComponent from './HomeScreenComponent.js'
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route
} from "react-router-dom";

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

export default App;
