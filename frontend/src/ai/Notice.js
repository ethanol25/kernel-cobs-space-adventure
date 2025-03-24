import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const Popup = z.object({
    header: z.string(), // User input,
    event_name: z.string(),
    desc_header: z.string(),
    desc: z.string(),
    event_rating: z.string(),
    food_adjusted: z.number(),
    water_adjusted: z.number(),
    fuel_adjusted: z.number(),
    kernel_adjusted: z.number(),
    distance_adjusted: z.number(),
    });

const resources_adjusted = z.object({
    food_adjusted: z.number(),
    water_adjusted: z.number(),
    fuel_adjusted: z.number(),
    kernel_adjusted: z.number(),
    distance_adjusted: z.number(),
});

const options = z.object({
    option1: z.string(), 
    option1_resources: z.array(resources_adjusted),
    option2: z.string(), 
    option2_resources: z.array(resources_adjusted),
    option3: z.string(), 
    option3_resources: z.array(resources_adjusted),
    });

export async function Generate_Notice_Message(state, planet_scenario=null) {
    const notice_message = await state.openai.beta.chat.completions.parse({
        model: state.model,
        messages: [
            { role: "system", content: `You are a futuristic spaceship navigation software which informs the user of events that happen in the game. 
                Format a notice message that says the following: Your first output should be the word 'NOTICE' with attribute header, your second output should be the name of the event that is about to happen with attribute event_name, your third output should be a 5 word description statement summary of the event with attribute desc_header, and your fourth output should be a consise 2 sentence description of the event with attribute desc, your fifth output would be a rating of the critical of the event ranging form 0-100 with 0 being not critical in player endangerment and 100 is putting the player on the spaceship in extestenial endangerment with attribute event_rating. 
                Based on ${planet_scenario}, generate dialouge to further the story. Based on dialouge, add or subtract inventory for the following resource attributes: food_adjusted, water_adjusted, fuel_adjusted, kernel_adjusted, and distance traveled during dialgoue or event that happens during dialouge (attribute distance_adjusted which can range from (-100,100) ). 
                Guidelines: Only generate events with a critical rating less than or equal to 50. The more critical the event, the more attributes should be depleted and the more distance is traveled. If planet scenario=null, do not mention any planet names. If planet scenario does not equal null, make sure to use the planet name in dialouge if previously mentioned in gameplay`},
            { role: "user", content: "Initialize the next event in a futuristic spaceship game"},
        ],
        response_format: zodResponseFormat(Popup, "Popup")
        });
        
        const notice = notice_message.choices[0].message.parsed;
        return notice;   
}

// Notice Event Image Generator (1:1 Ratio); Does not take user-input - its initialized in tandem with warning/notice messages - Dalle2 - Done
export async function Notice_Event_Image_Generator(state, notice=null) {
    const notice_event_image_generation = await state.openai.images.generate({
        model: "dall-e-2",
        prompt: `Based on the following futuristic spaceship navigation notice event: ${notice} output, generate an image depicting the space event.`,
        n: 1,
        size: "512x512", //1024x1024
      });
      
      return notice_event_image_generation.data[0].url  
}


// Notice Options for the player - Done
export async function Notice_Player_Options(state, notice=null) {
    const notice_player_options = await state.openai.beta.chat.completions.parse({
        model: state.model,
        messages: [
            { role: "system", content: `You are a futuristic spaceship navigation software which informs the user of events that happen in the game. Format a 3 options for the user based on the following game event notice ${notice}. For the outcome of each option, add or subtract inventory for the following resource attributes: food_adjusted, water_adjusted, fuel_adjusted, kernel_adjusted and distance_adjusted ( distance_adjusted which can range from (-100,100) ).
            Guidelines: Do not have communicating with external entities of any kind as an option. Only keep options relating to the player on the ship as availiable choices. `},
        ],
        response_format: zodResponseFormat(options, "Options")
        });
        
        const notice_option = notice_player_options.choices[0].message.parsed;
        console.log(notice_option)
        return notice_option    
}

