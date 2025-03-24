import React, {useState} from 'react'

const FUELFONTCOLOR = "#51DE6B"
const tempStats = {
  kernals: 50,
  fuel: 89,
  food: 20,
  water: 4
  }

const Stats = () => {
  const [kernals, setKernals] = useState(tempStats.kernals)
  const [fuel, setFuel] = useState(tempStats.fuel)
  const [water, setWater] = useState(tempStats.water)
  const [food, setFood] = useState(tempStats.food)

  return (
    <div className="statsWindow">
      <div className="kernalStat">
        <p>Kernels</p>
        <p style={{color:"#D0D87A"}}>{kernals}</p>
      </div>
      <hr />
      <div className="otherStats">
        <p>Fuel : <span style={{color:FUELFONTCOLOR,fontSize:"100%"}}>{fuel}%</span></p>
        
        <p>Food : <span style={{color:"#CFA03B"}}>{food}</span></p>

        <p>Water : <span style={{color:"#785CDB"}}>{water}</span></p>
      </div>
    </div>
  )
}

export default Stats