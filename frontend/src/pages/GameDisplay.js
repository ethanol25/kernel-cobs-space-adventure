import React from 'react'
import Game from '../components/Game'
import CrewMembers from '../components/CrewMembers'
import Stats from '../components/Stats'
import Input from '../components/Input'

const Display = () => {
  return (
    <div>
        <Game />
        <div>
          <CrewMembers/>
          <Stats/>
          <Input/>
        </div>
    </div>
  )
}

export default Display