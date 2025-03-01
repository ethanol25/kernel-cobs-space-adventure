import React from 'react'

const Input = ({state, dispatch}) => {
    if (!state.hasEvent) {
        return <div className="blank-input-container">

        </div>
    } else {
        return (
        <div className="input-container">
            <div className='input-text'>
                <h1>ALERT:</h1>
                <p>{state.eventDescription}</p>
            </div>
            <div className="input-button-container">
                {state.eventChoices[0] !== null ? <button>
                    {state.eventChoices[0]}
                </button> : null}
                {state.eventChoices[1] !== null ? <button>
                    {state.eventChoices[1]}
                </button> : null}
                {state.eventChoices[2] !== null ? <button>
                    {state.eventChoices[2]}
                </button> : null}
            </div>
            {!state.hasEvent ? <div className="blank-input-container"/> : null}
        </div>
        )
    }
}

export default Input