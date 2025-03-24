import React from 'react'
import ship from '../assets/corn.png'

const MaxShipProgress = 1000

const ProgressBar = (distance) => {
    
    return (
        <div className="progBarContainer">
            <hr />
            <img src={ship} style={{right: `${distance.distance/MaxShipProgress*97}%`}} />
        </div>
    )
}

export default ProgressBar