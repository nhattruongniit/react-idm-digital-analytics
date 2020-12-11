
import { SET_API_BASE_URL } from "./app";
// Action Type Constants
export const SET_CONTEXT    = "CONTEXTS/SET_CONTEXT";
export const UNSET_CONTEXT  = "CONTEXTS/UNSET_CONTEXT";
export const RESET_CONTEXTS = "CONTEXTS/RESET_CONTEXTS";


// Actions Functions
export const setContext = dispatch => (name, data) => {
	dispatch({ type: SET_CONTEXT, name, data });
};

export const unsetContext = dispatch => name => {
	dispatch({ type: UNSET_CONTEXT, name });
};

export const resetContexts = dispatch => () => {
	dispatch({ type: RESET_CONTEXTS });
};



// Reducer Function
export default function reducer(state = {}, action){


	switch (action.type){


		case SET_API_BASE_URL:
			state["idf-api"] = { url: action.payload.apiBaseUrl };
			return {...state};


		case SET_CONTEXT:    state[action.name] = action.data; console.log("DEBUG: SET CONTEXT: ", action.name, action.data); return {...state};
		case UNSET_CONTEXT:  delete state[action.name];    console.log("DEBUG: UNSET CONTEXT: ", action.name);    return {...state};
		// case RESET_CONTEXTS:                     return {};
		





		default:                                 return state;
	}

}