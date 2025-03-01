import { ACTIONS } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_KERNELS:
            return ;
        case ACTIONS.DECREASE_KERNELS:
            return ;
        case ACTIONS.ADD_FOOD:
            return ;
        case ACTIONS.DECREASE_FOOD:
            return ;
        case ACTIONS.ADD_WATER:
            return ;
        case ACTIONS.DECREASE_WATER:
            return ;
        case ACTIONS.ADD_ELECTRICITY:
            return ;
        case ACTIONS.DECREASE_ELECTRICITY:
            return ;
        case ACTIONS.SET_HAS_EVENT:
            return ;
        case ACTIONS.SET_EVENT_TYPE:
            return ;
        case ACTIONS.SET_EVENT_IMAGE:
            return ;
        default: 
            return;
    }
}

export default reducer;