import React from 'react'
import { ACTIONS } from '../data/actions'

const Input = ({state, dispatch}) => {
    if (!state.hasEvent) {
        return <div className="blank-input-container">
            <p>use left and right arrow keys to rotate ship, space to accelerate</p>
        </div>
    } else {
        return (
        <div className="input-container">
            <div className='input-text'>
                <h1>ALERT:</h1>
                <p>{state.eventDescription}</p>
            </div>
            <div className="input-button-container">
                {state.eventChoices[0] !== null ? <button onClick={()=> {
                    dispatch({type: ACTIONS.ADD_FOOD, payload: state.eventConsequences[0]["food_adjusted"]})
                    dispatch({type: ACTIONS.ADD_WATER, payload: state.eventConsequences[0]["water_adjusted"]})
                    dispatch({type: ACTIONS.ADD_FUEL, payload: state.eventConsequences[0]["fuel_adjusted"]})
                    dispatch({type: ACTIONS.ADD_KERNELS, payload: state.eventConsequences[0]["kernel_adjusted"]})
                    // dispatch({type: ACTIONS.ADD_DISTANCE, payload: state.eventConsequences[0]["distance_adjusted"]})
                    dispatch({type: ACTIONS.SET_HAS_EVENT, payload: false})   
                }}>
                    {state.eventChoices[0]}
                </button> : null}
                {state.eventChoices[1] !== null ? <button onClick={()=> {
                    dispatch({type: ACTIONS.ADD_FOOD, payload: state.eventConsequences[1]["food_adjusted"]})
                    dispatch({type: ACTIONS.ADD_WATER, payload: state.eventConsequences[1]["water_adjusted"]})
                    dispatch({type: ACTIONS.ADD_FUEL, payload: state.eventConsequences[1]["fuel_adjusted"]})
                    dispatch({type: ACTIONS.ADD_KERNELS, payload: state.eventConsequences[1]["kernel_adjusted"]})
                    // dispatch({type: ACTIONS.ADD_DISTANCE, payload: state.eventConsequences[1]["distance_adjusted"]})   
                    dispatch({type: ACTIONS.SET_HAS_EVENT, payload: false}) 
                }}>
                    {state.eventChoices[1]}
                </button> : null}
                {state.eventChoices[2] !== null ? <button onClick={()=> {
                    dispatch({type: ACTIONS.ADD_FOOD, payload: state.eventConsequences[2]["food_adjusted"]})
                    dispatch({type: ACTIONS.ADD_WATER, payload: state.eventConsequences[2]["water_adjusted"]})
                    dispatch({type: ACTIONS.ADD_FUEL, payload: state.eventConsequences[2]["fuel_adjusted"]})
                    dispatch({type: ACTIONS.ADD_KERNELS, payload: state.eventConsequences[2]["kernel_adjusted"]})
                    // dispatch({type: ACTIONS.ADD_DISTANCE, payload: state.eventConsequences[2]["distance_adjusted"]})   
                    dispatch({type: ACTIONS.SET_HAS_EVENT, payload: false}) 
                }}>
                    {state.eventChoices[2]}
                </button> : null}
            </div>
            {!state.hasEvent ? <div className="blank-input-container"/> : null}
        </div>
        )
    }
}

export default Input