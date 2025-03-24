// Chef - Done
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const chef_dialouge_format = z.object({
    role: z.string(),
    speech: z.string(), // API output
    food_adjusted: z.number(),
    water_adjusted: z.number(),
    distance_adjusted: z.number(),
  });

async function Chef(state, random, notice=null, warning=null, planet_scenario=null) {

    if(!random) {
    const chef_dialogue = await state.openai.beta.chat.completions.parse({

        model: state.model,
        messages: [
            { role: "system", content: `You are a chef character on a futuristic corn spaceship. 
            Your job is to collect food and water from the game planet environment. Based on ${notice}, ${warning}, and ${planet_scenario}, generate dialouge to further the story. Based on dialouge, add or subtract the food and water inventory, attributes food_adjusted, water_adjusted, respectively and distance traveled during dialgoue or event that happens during dialouge (attribute distance_adjusted which can range from (-100,100) ). 
            Guidelines: Structure all speech outputs to be concise 2 sentence explanations explaining the problem and what the 'role' character is going to do about the issue. If planet scenario=null, do not mention any planet names. If planet scenario does not equal null, make sure to use the planet name in dialouge if previously mentioned in gameplay` },
            { role: "user", content: "Based on game events, contribute to the plotline. "},
        ],
        response_format: zodResponseFormat(chef_dialouge_format, "Chef"),
        });
        
        const chef = chef_dialogue.choices[0].message.parsed;
        console.log(chef)

        return chef;
    } else {
        const chef_dialogue = await state.openai.beta.chat.completions.parse({
            model: state.model,
            messages: [
                { role: "system", content: `You are a chef character on a futuristic corn spaceship. 
                Your job is to collect food and water from the game planet environment. Right now you are in your duty but you do not have anything important to talk about. Instead, you should talk about something personal or random.
                    Guidelines: Structure all speech outputs to be concise 2 sentences long` },
                { role: "user", content: "Based on game events, contribute to the plotline. "},
            ],
            response_format: zodResponseFormat(chef_dialouge_format, "Chef"),
            });
            
            const chef = chef_dialogue.choices[0].message.parsed;
            console.log(chef)
            return chef;
    }

}

export default Chef;