import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const radio_tech_dialouge_format = z.object({
    role: z.string(),
    speech: z.string(), // API output
    fuel_adjusted: z.number(),
    kernel_adjusted: z.number(),
    distance_adjusted: z.number(),
  });


// Radio Tech - Done
async function Radio_Tech(state, random, notice=null, warning=null, planet_scenario=null) {
   
   if(!random) {
    const radio_tech_dialogue = await state.openai.beta.chat.completions.parse({
        model: state.model,
        messages: [
            { role: "system", content: `You are a radio tech character on a futuristic corn spaceship. 
                Your job is to report when you are approaching, docking, and leaving a planet environment in the game. Based on ${notice}, ${warning}, and ${planet_scenario}, generate dialouge to further the story. 
                Based on dialouge, add or subtract fuel for the spaceship (attribute fuel_adjusted), kernel ammo (attribute kernel_adjusted), and distance traveled during dialgoue or event that happens during dialouge (Based on attribute distance_adjusted which can range from (-100,100) ${notice}, ${warning}, and ${planet_scenario}, generate). 
                Guidelines: Structure all speech outputs to be concise 2 sentence explanations explaining the problem and what the 'role' character is going to do about the issue. If planet scenario=null, do not mention any planet names. If planet scenario does not equal null, make sure to use the planet name in dialouge if previously mentioned in gameplay`},
            { role: "user", content: "Based on game events, contribute to the plotline."},
        ],
        response_format: zodResponseFormat(radio_tech_dialouge_format, "Radio_Tech"),
        });
        
        const radio_tech = radio_tech_dialogue.choices[0].message.parsed;
        console.log(radio_tech)
        return radio_tech;
    } else {
        const radio_tech_dialogue = await state.openai.beta.chat.completions.parse({
            model: state.model,
            messages: [
                { role: "system", content: `You are a radio tech character on a futuristic corn spaceship. 
                    Your job is to report when you are approaching, docking, and leaving a planet environment in the game. Right now you are in your duty but you do not have anything important to talk about. Instead, you should talk about something personal or random.
                    Guidelines: Structure all speech outputs to be concise 2 sentences long`},
                { role: "user", content: "Based on game events, contribute to the plotline."},
            ],
            response_format: zodResponseFormat(radio_tech_dialouge_format, "Radio_Tech"),
            });
            
            const radio_tech = radio_tech_dialogue.choices[0].message.parsed;
            console.log(radio_tech)
            return radio_tech;
    }
}


export default Radio_Tech;