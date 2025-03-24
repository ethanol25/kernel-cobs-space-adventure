import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
const api_model = "gpt-4o" // Makes it easier to change the api model for different level of responses

/*
const prompt = promptSync();
//let OPENAI_API_KEY = prompt("Please enter your API Key: "); // Asks user for API key

const openai = new OpenAI({
    //apiKey: process.env[OPENAI_API_KEY], // API Key Initialization
  }); */


// Starter Game Variables
let food = 100
let water = 100
let fuel = 100
let kernel = 100
let distance = 0

// Starter Game Parameters
let planet_scenario = null
let notice = null 
let warning = null


// Parse GPT Outputs
const Step = z.object({
    output: z.string(), // API output
  });

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


// Spaceship Navigator Seat Image (1:1 Ratio); Does not take user-input - its initialized upon call - Dalle3 - Done
async function Space_Navigation_Seat_Dalle2() {
    const space_nav_seat_dalle3 = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Generate the inside of a futuristic spaceship filled with technology interfaces. At the center of the image, give a cropped view of an empty navigation seat, showing only the chest and up. Focus on the upper part of the seat, highlighting the backrest, the surrounding dashboard, and any visible control panels. The perspective should emphasize a chest-up shot, without showing the seat below.",
        n: 1,
        size: "1024x1024",
      });
      
      console.log(space_nav_seat_dalle3.data[0].url);
}

// Spaceship Navigator Seat Image (1:1 Ratio); Does not take user-input - its initialized upon call - Dalle2 - Done
async function Space_Navigation_Seat_Dalle3() {
    const response_dalle3 = await openai.images.generate({
        model: "dall-e-2",
        prompt: "Generate the inside of a futuristic spaceship filled with technology interfaces. At the center of the image, give a cropped view of an empty navigation seat, showing only the chest and up. Focus on the upper part of the seat, highlighting the backrest, the surrounding dashboard, and any visible control panels. The perspective should emphasize a chest-up shot, without showing the seat below.",
        n: 1,
        size: "512x512",
      });
    
      console.log(response_dalle3.data[0].url);
}


// Game Events
// Event/Popup Generator w/ Respective Image Generators

 
// Generate Chill Event - aka. No Danger
async function Generate_Event(planet_scenario=null) {
    const event_message = await openai.beta.chat.completions.parse({
        model: api_model,
        messages: [
            { role: "system", content: `You are a futuristic spaceship navigation software which informs the user of events that happen in the game. Format a warning message that says the following: 
            Your first output should be 'WARNING' with attribute header, your second output should be the name of the event that is about to happen with attribute event_name, your third output should be a 5 word description statement summary of the event with attribute desc_header, and you fourth output should be a consise 2 sentence description of the event with attribute desc, your fifth output would be a rating of the critical of the event ranging form 0-100 with 0 being not critical in player endangerment and 100 is putting the player on the spaceship in extestenial endangerment with attribute event_rating. 
            Based on ${planet_scenario}, generate dialouge to further the story. Based on dialouge, add or subtract inventory for the following resource attributes: food_adjusted, water_adjusted, fuel_adjusted, kernel_adjusted, and distance traveled during dialgoue or event that happens during dialouge (attribute distance_adjusted which can range from (-100,100) ). 
            Guidelines: The more critical the event, the more attributes should be depleted and the more distance is traveled. Only generate events with a critical rating less than or equal to 25. If planet scenario=null, do not mention any planet names. If planet scenario does not equal null, make sure to use the planet name in dialouge if previously mentioned in gameplay`},
        ],
        response_format:zodResponseFormat(Popup, "Event")
        });
        
        const event = event_message.choices[0].message.parsed;
        console.log(event)    
}


// main-ish
/*
const possible_characters = [ // List of characters who can generate dialogue
    function() {Mechanic(notice, warning, planet_scenario)}, 
    function() {Radio_Tech(notice, warning, planet_scenario)}, 
    function() {Chef(notice, warning, planet_scenario)}, 
    function() {Electrician(notice, warning, planet_scenario)}, 
    function() {Navigator(notice, warning, planet_scenario)}]


async function Notice_Sequence(notice, warning, planet_scenario) { // Bringing all of the associated functions together
    notice = await Generate_Notice_Message(notice, warning, planet_scenario)
    let initalize_character = Math.floor(Math.random() * 5);
    possible_characters[initalize_character]();
    options = Notice_Player_Options(notice)
    return options
}

async function Warning_Sequence(notice, warning, planet_scenario) { // Bringing all of the associated functions together
    warning = await Generate_Notice_Message(notice, warning, planet_scenario)
    let initalize_character = Math.floor(Math.random() * 5);
    possible_characters[initalize_character]();
    options = Notice_Player_Options(notice)
    return options
}

const possible_events = [ // List of events that can run
    function() {Notice_Sequence(notice, warning, planet_scenario)}, 
    function() {Warning_Sequence(notice, warning, planet_scenario)}, 
    function() {Generate_Event(notice, warning, planet_scenario)}]


for (let i = 0; i < 1; i++) {
    let planet_scenario = null
    let notice = null 
    let warning = null
    let run_event = null
    let options = null

    if (i == 0) {
        planet_scenario = await Generate_Planet()
    }

    run_event = Math.floor(Math.random() * 3);
    possible_events[run_event]();


  }
*/

const help = await Notice_Player_Options()
const parsed_help = options.parse(help)
//const z_parsed_help = options.parse(parsed_help)
console.log(parsed_help.option1_resources);

//const data = options.parse(help);


/*
const notice_option = notice_player_options.choices[0].message.parsed;
        console.log(notice_option)
        return notice_option  
*/
