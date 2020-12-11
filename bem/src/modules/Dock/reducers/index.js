// import request from 'services/request';

import settingsApi from "services/settingsApi"



const SET_TYPE = '/DOCK/SET_TYPE'
const SET_SIZE = '/DOCK/SET_SIZE'
const SET_SCREEN_SIZE = "/DOCK/SET_SCREEN_SIZE";
const SAVE_LAYOUT_STATE = "/DOCK/SAVE_LAYOUT_STATE";
const SAVE_STATE = "/DOCK/SAVE_STATE";
const TOGGLE_VISIBILITY = "/DOCK/TOGGLE_VISIBILITY";

export const SET_DOCK_STATE = "/DOCK/SET_DOCK_STATE";


export const setDockType = dock_type => ({
	type: SET_TYPE, dock_type
});

export const setDockSize = size => ({
	type: SET_SIZE, size
});


export const saveLayoutState = layoutState => ({
	type: SAVE_LAYOUT_STATE,
	layoutState
});

export const saveState = layoutState => ({
	type: SAVE_STATE
});

export const togleVisibility = () => ({
	type: TOGGLE_VISIBILITY
});





// Autoupdate some properties
// and handle some storage procedures
const handleStateChange = (state, save) => {

	const vertical_min_width = 250;
	const vertical_max_width = Math.floor(state.viewportWidth/2);

	const horizontal_min_height = 250;
	const horizontal_max_height = Math.floor(state.viewportHeight/2);

	switch(state.type){
		case "left":
		case "right":
			state.size = Math.max(
				vertical_min_width,
				Math.min(state.size, vertical_max_width)
			);
			state.columns = Math.floor(state.size/50);
			state.width = state.size - (state.size % 50);
			break;
		case "bottom":
			state.size = Math.max(
				horizontal_min_height,
				Math.min(state.size, horizontal_max_height)
			);
			state.columns = Math.floor(state.viewportWidth/50);
			state.width = state.viewportWidth - (state.viewportWidth % 50);
			break;

		default: throw new Error("Unsupported dock type: " + state.type);
	}



	save && settingsApi.update("addon-dock-state", state);

	return state;
}



export default (state = handleStateChange({

	viewportWidth:  window.innerWidth,
	viewportHeight: window.innerHeight,

	hidden: false,


	type:          "left",
	size:           500,
	layoutState:    null
}, false), action ) => {


	switch(action.type){


		case SET_DOCK_STATE:
			return handleStateChange({
				...action.state,
				viewportWidth:  window.innerWidth,
				viewportHeight: window.innerHeight,
			});


		case SAVE_STATE: return handleStateChange(state, true);


		case SET_TYPE: return handleStateChange({ ...state, type: action.dock_type }, true);
		case SET_SIZE: return handleStateChange({ ...state, size: action.size },      false);

		case SET_SCREEN_SIZE: return handleStateChange({ ...state, ...action.data }, true);

		case SAVE_LAYOUT_STATE:
			return handleStateChange({ ...state, layoutState: action.layoutState }, true);

		case TOGGLE_VISIBILITY:
			return {...state, hidden: !state.hidden}

		default: return state;
	}

}