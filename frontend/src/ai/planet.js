import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Parse GPT Outputs
const Step = z.object({
    output: z.string(), // API output
  });

// Planet Environment - Done
export async function Generate_Planet(state, user_input_planet) {
    const completion = await state.openai.beta.chat.completions.parse({
    model: state.model,
    messages: [
        { role: "system", content: "You are a spaceship navigation terminal and you are guiding the user to their next location. Describe to the user their next planet environment based on their input in 3 consice sentences." },
        { role: "user", content: user_input_planet},
    ],
    response_format: zodResponseFormat(Step, "planet"),
    });

    const planet_scenario = completion.choices[0].message.parsed;
    console.log(planet_scenario)
    return planet_scenario
}