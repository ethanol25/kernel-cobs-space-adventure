import React, { useState } from 'react'
import OpenAI from 'openai'
import { ACTIONS } from '../data/actions';

const LandingPage = ({dispatch}) => {

    const [key, setKey] = useState("");
    const [isValid, setIsValid] = useState(true);

    async function checkApiKey(apiKey) {
        try {
          const response = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
            },
          });
      
          if (response.ok) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      }
      
      

  return (
    <div style={{"textAlign": "center"}}>
        <h1>Kernel Cob's Space Adventure</h1>
        <div>
            <form onSubmit={(e)=> {
                e.preventDefault();
                setIsValid(true);
                checkApiKey(key)
                    .then(isValid => {
                    if (isValid) {
                      const openai = new OpenAI({
                        apiKey: key, // API Key Initialization
                        dangerouslyAllowBrowser: true
                      }); 
                        dispatch({type: ACTIONS.SET_OPENAI, payload: openai});
                        dispatch({type: ACTIONS.SET_API_KEY, payload: key});
                        setIsValid(true);
                    } else {
                        setIsValid(false);
                    }
                    });
            }}>
                <label htmlFor="key">Enter your OpenAI API Key: </label>
                <input type="text" name="key" id="key" onChange={(e)=>setKey(e.target.value)}/>
                <br />
                <button style={{"margin": "20px"}} type="submit">Submit</button>
            </form>
        </div>
        {!isValid ? 
            <div>
                <h2>Key was invalid!</h2>
            </div>
        : null}
        
    </div>
  )
}

export default LandingPage