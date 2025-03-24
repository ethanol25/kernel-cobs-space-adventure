// Navigator - Done
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const navigator_dialouge_format = z.object({
    role: z.string(),
    speech: z.string(), // API output
    food_adjusted: z.number(),
    water_adjusted: z.number(),
    fuel_adjusted: z.number(),
    kernel_adjusted: z.number(),
    distance_adjusted: z.number(),
});

async function Navigator(state, random, notice=null, warning=null, planet_scenario=null) {
    if (!random) {
    const navigator_dialogue = await state.openai.beta.chat.completions.parse({
        model: state.model,
        messages: [
            { role: "system", content: `You are a navigator character on a futuristic corn spaceship. Your job is to report or talk about any general problems or events that happen on the corn spaceship. Based on ${notice}, ${warning}, and ${planet_scenario}, generate dialouge to further the story. 
            Based on dialouge, add or subtract inventory for the following resource attributes: food_adjusted, water_adjusted, fuel_adjusted, kernel_adjusted, and distance traveled during dialgoue or event that happens during dialouge (attribute distance_adjusted which can range from (-100,100) ). 
            Guidelines: Structure all speech outputs to be concise 2 sentence explanations explaining the problem or event and what the 'role' character is going to do about the issue. If planet scenario=null, do not mention any planet names. If planet scenario does not equal null, make sure to use the planet name in dialouge if previously mentioned in gameplay` },
            { role: "user", content: "Based on game events, contribute to the plotline. "},
        ],
        response_format: zodResponseFormat(navigator_dialouge_format, "Navigator"),
        });
        
        const navigator = navigator_dialogue.choices[0].message.parsed;
        console.log(navigator)
        return navigator;
    } else {
        const navigator_dialogue = await state.openai.beta.chat.completions.parse({
            model: state.model,
            messages: [
                { role: "system", content: `You are a navigator character on a futuristic corn spaceship. Your job is to report or talk about any general problems or events that happen on the corn spaceship. Right now there is nothing for you to do about your job. Instead, you should talk about something personal or random. 
                Guidelines: Structure all speech outputs to be a concise 2 sentences or so.` },
                { role: "user", content: "Based on game events, contribute to the plotline. "},
            ],
        response_format: zodResponseFormat(navigator_dialouge_format, "Navigator"),
        });
        
        const navigator = navigator_dialogue.choices[0].message.parsed;
        console.log(navigator)
        return navigator
    }
}

export default Navigator;
