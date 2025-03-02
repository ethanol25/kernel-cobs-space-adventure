import React, {useState} from 'react'
import crew_closed from '../assets/crew_closed.png'
import crew_open from '../assets/crew_open.png'

const crewData = [
  {
    name: "Fred",
    job: "Navigator"
  },
  {
    name: "Bob",
    job: "Engineer"
  },
  {
    name: "Jake",
    job: "Engineer"
  },
  {
    name: "Sam",
    job: "Lebron"
  }
]

const CrewMembers = () => {

  const [memberTalking, setMemberTalking] = useState([false, false, false, false])

  function handleTalking(formData) {
    const num = formData.getAll("num") - 1;
    let arr = []
    for (let i = 0; i < 4; i++) {
      if (i == num) {
        arr.push(true)
      } else {
        arr.push(false)
      }
    }
    setMemberTalking(arr)
  }
  let i = 0;
  const crewDisplay = crewData.map(member =>
    <div className="crewMemberContainer">
      <img
       src={memberTalking[i++]?crew_open:crew_closed}
      />
      <div className="crewShadow"></div>
    </div>
  )


  return (
    <div className="crewContainer">
      {crewDisplay}
    </div>
  )
}

export default CrewMembers