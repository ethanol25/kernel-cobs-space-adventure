import React from 'react'
import Game from '../components/Game'
import CrewMembers from '../components/CrewMembers'
import Stats from '../components/Stats'
import Input from '../components/Input'

const Display = ({state, dispatch}) => {
  return (
    <>
        <Game />
        <div className='bottom-half'>
          <div>
            <CrewMembers/>
            <Stats/>
          </div>
          <Input state={state} dispatch={dispatch}/>
        </div>
    </>
  )
}

export default Display