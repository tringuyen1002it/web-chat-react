import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
    currentUser: null,
    isLoading: true
};

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            };
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
};

const initialChannel = {
    currentChannel: null
}

const channel_reducer = (state = initialChannel, action) => {
    switch (action.type) {
        case actionTypes.SET_CHANNEL:
            return action.payload.currentChannel
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer
});

export default rootReducer;
