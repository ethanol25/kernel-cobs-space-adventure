import { useReducer } from 'react';
import './css/App.css';
import Display from './pages/GameDisplay';
import reducer from './data/reducer';
import initialState from './data/initialState';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Display state={state} dispatch={dispatch}/>
  );
}

export default App;
