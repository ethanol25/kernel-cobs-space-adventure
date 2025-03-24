import { useReducer, useState } from 'react';
import './css/App.css';
import GameDisplay from './pages/GameDisplay';
import reducer from './data/reducer';
import initialState from './data/initialState';
import StartPopup from './components/StartPopup';
import EventPopup from './components/EventPopup';
import LandingPage from './pages/LandingPage';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isStarting, setIsStarting] = useState(true);
  const [hasPopup, setHasPopup] = useState(false);

  if (state.APIKey == "") {
    return (
      <>
        {isStarting ? <StartPopup setIsStarting={setIsStarting}/> : null}
        {(hasPopup && !isStarting) ? <EventPopup state={state} setHasPopup={setHasPopup}/> : null}
        <GameDisplay state={state} dispatch={dispatch} setHasPopup={setHasPopup}/>
      </>
    );
  } else {
    return (
      <LandingPage dispatch={dispatch}/>
    )
  }
}

export default App;
