import { useEffect, useReducer, useState } from 'react';
import './css/App.css';
import GameDisplay from './pages/GameDisplay';
import reducer from './data/reducer';
import initialState from './data/initialState';
import StartPopup from './components/StartPopup';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isStarting, setIsStarting] = useState(true);

  return (
    <>
      {isStarting ? <StartPopup setIsStarting={setIsStarting}/> : null}
      <GameDisplay state={state} dispatch={dispatch} setIsStarting={setIsStarting} />
    </>
  );
}

export default App;
