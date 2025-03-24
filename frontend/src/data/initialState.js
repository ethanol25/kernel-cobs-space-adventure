const initialState = {
    distance: 1000,
    kernels: 200,
    fuel: 200,
    water: 200,
    food: 200,
    electricity: 200,
    hasEvent: false,
    eventDescription: "",
    eventChoices: [],
    eventConsequences: [],
    eventImage: null,
    eventIsBad: true,
    APIKey: "",
    model: "gpt-4o",
    openai: null,
}

export default initialState;