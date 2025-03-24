import React, { useState } from 'react'

const StartPopup = ({setIsStarting}) => {


  const [text, setText] = useState(
    [
      {
        "user": "Unknown",
        "content": "Glad to see you awake Kernel!"
      },
      {
        "user": "Unknown",
        "content": "Do you know what's going on?"
      },
    ]
  );

  const [choices, setChoices] = useState([
    {
      "content": "Yes, I am fully awake now! [Skip Story Introduction]",
      "end": true
    },
    {
      "content": "No. No, I don’t remember. Could you remind me?",
      "end": false
    },
  ])

  const handleButtonPress = (choice) => {
    if (choice.end) {
      setIsStarting(false);
    } else {
      setText([
        {
          "user": "Unknown",
          "content": "Glad to see you awake Kernel!"
        },
        {
          "user": "Unknown",
          "content": "Do you know what's going on?"
        },
        {
          "user": "You",
          "content": "No. No, I don't remember. Could you remind me?"
        },
        {
          "user": "Unknown",
          "content": "You are Kernel Cob, captain of 'The Cob'. It is your mission to get to Cornelious to deliever the ship's kernels! You will face many threats, but don't worry because you have an experienced AI crew! Good Luck Kernel!"
        },
        {
          "user": "Ethan Dye",
          "content": "Kernel Corn Cob's Space Adventure was created by Kiera Chan, Jacob Dimmitt, Ethan Dye, and Thomas Schaefer"
        },
        {
          "user": "Ethan Dye",
          "content": "It was made for Cornhacks 2025, a 24 hour hackathon"
        },
        {
          "user": "Ethan Dye",
          "content": "Kiera worked on AI prompting, I (ethan) worked on the game loop, Thomas worked on the UI, and Jacob was our 'Flex Position' (did a bit of everything)"
        },
        {
          "user": "Ethan Dye",
          "content": "We unfortunately didn't complete our grand plans, but here is what we had :)"
        },
        {
          "user": "Ethan Dye",
          "content": "(I've also polished a bit of the game loop since then)"
        }
      ])
      setChoices([
        {
          "content": "I remember now. Thank you!",
          "end": true
        },
      ])
    }
  }

  return (
    <div className='start-popup-container'>
        <div className="start-popup-screen">
          <div className="start-popup-screen-text">
            {
              text.map((text) => {
                return <p>
                  <span className="start-popup-text-user">{text.user}: </span>
                  <span className="start-popup-text-content">{text.content}</span>
                </p>
              })
            }
          </div>
          <div className="start-popup-screen-buttons">
            {
              choices.map((choice) => {
                return <button className="start-popup-screen-button" onClick={()=>{handleButtonPress(choice)}}>
                  <p>{choice.content}</p>
                </button>
              })
            }
          </div>
        </div>
    </div>
  )
}

export default StartPopup