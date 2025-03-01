import React from 'react'
import dangerIcon from '../assets/dangerIcon.png'
import noticeIcon from '../assets/noticeIcon.png'

const EventPopup = ({state, setHasPopup}) => {

  return (
    <div className='popup-container'>
        <div className="popup-screen">
            <div className="popup-top-part">
                { state.eventIsBad ? <div className={`popup-screen-header popup-bad-event`}>
                    <img src={dangerIcon} alt="Danger Icon" />
                    <h1>WARNING</h1>
                </div> // End of Bad Event
                : <div className={`popup-screen-header popup-good-event`}>
                    <img src={noticeIcon} alt="Notice Icon" />
                    <h1>NOTICE</h1>
                </div> // End of Good Event
                }
                <div className="popup-screen-text">
                    <p>{state.eventDescription}</p>
                </div>
            </div>
          <div className="popup-screen-button">
            <button onClick={()=>{setHasPopup(false)}}>Continue</button>
          </div>
        </div>
    </div>
  )
}

export default EventPopup