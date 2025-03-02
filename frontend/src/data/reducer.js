import { ACTIONS } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_DISTANCE:
            return {
                ...state,
                distance: state.distance + action.payload,
              };
        case ACTIONS.DECREASE_DISTANCE:
            return {
                ...state,
                distance: state.distance - action.payload,
              };
        case ACTIONS.ADD_KERNELS:
            return {
                ...state,
                kernels: state.kernels + action.payload,
              };
        case ACTIONS.DECREASE_KERNELS:
            return {
                ...state,
                kernels: state.kernels - action.payload,
              };
        case ACTIONS.ADD_FOOD:
            return {
                ...state,
                food: state.food + action.payload,
              };
        case ACTIONS.DECREASE_FOOD:
            return {
                ...state,
                food: state.food - action.payload,
              };
        case ACTIONS.ADD_WATER:
            return {
                ...state,
                water: state.water + action.payload,
              };
        case ACTIONS.DECREASE_WATER:
            return {
                ...state,
                water: state.water - action.payload,
              };
        case ACTIONS.ADD_ELECTRICITY:
            return {
                ...state,
                electricity: state.electricity + action.payload,
              };
        case ACTIONS.DECREASE_ELECTRICITY:
            return {
                ...state,
                electricity: state.electricity - action.payload,
              };
        case ACTIONS.SET_HAS_EVENT:
            return {
                ...state,
                hasEvent: action.payload,
              };
        case ACTIONS.SET_EVENT_DESCRIPTION:
            return {
                ...state,
                eventDescription: action.payload,
              };
        case ACTIONS.SET_EVENT_IMAGE:
            return {
                ...state,
                eventImage: action.payload,
              };
        case ACTIONS.SET_EVENT_IS_BAD:
            return {
                ...state,
                eventIsBad: action.payload,
              };
        case ACTIONS.SET_EVENT_CHOICES:
            return {
                ...state,
                eventChoices: action.payload,
              };
        default: 
            return state;
    }
}

export default reducer;