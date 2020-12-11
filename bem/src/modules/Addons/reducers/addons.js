import * as addonsApi from '../services/addons';

import {
  SET_CONTEXT, UNSET_CONTEXT, RESET_CONTEXTS
} from "reducers/contexts"

const FETCHING_ADDONS_START = 'ADDONS/FETCHING_ADDONS_START';
const FETCHING_ADDONS_SUCCESS = 'ADDONS/FETCHING_ADDONS_SUCCESS';
const SET_ACTIVE_ADDON = 'ADDONS/SET_ACTIVE_ADDON';
const SET_ADDON_POSITION = 'ADDONS/SET_ADDON_POSITION';
const SET_EXTERNAL_TAB = 'ADDONS/SET_EXTERNAL_TAB'

export const SET_SAVED_ACTIVE_ADDONS = 'ADDONS/SET_SAVED_ACTIVE_ADDONS'

export function fetchAddons() {
  return async (dispatch) => {
    dispatch({ type: FETCHING_ADDONS_START });
    const addons = await addonsApi.fetchAddons();
    dispatch({
      type: FETCHING_ADDONS_SUCCESS,
      payload: { addons },
    });
  }
}

export function closeAddon(addonId) {
  return {
    type: SET_ACTIVE_ADDON,
    payload: { isActive: false, addonId },
  }
}

export function setExternalTab(addonId){
  console.log("NEW TAB");
  return {
    type: SET_EXTERNAL_TAB,
    payload: { addonId },
  }
}

export function toggleAddon(addonId) {
  return (dispatch, getState) => {
    const { itemById } = getState().addons.addons;
    if (itemById[addonId] && itemById[addonId].isActive === true) {
      dispatch({
        type: SET_ACTIVE_ADDON,
        payload: { isActive: false, addonId },
      });
    } else {
      dispatch({
        type: SET_ACTIVE_ADDON,
        payload: { isActive: true, addonId },
      });
    }
  };
}

export function setAddonPosition(addonId, left, top) {
  return {
    type: SET_ADDON_POSITION,
    payload: {
      addonId,
      left,
      top,
    }
  }
}

const checkAvailableAddons = state => {
  state.items.forEach( addon_id => {
    state.itemById[addon_id].isAvailable = state.itemById[addon_id].contexts.every( ctx_name => !!state.contexts[ctx_name]);
  });
}

export default function reducer(state = {
  items: [],
  itemById: {},
  saved_active_addons: [],
  contexts: {},
}, action) {
  switch (action.type) {

    case SET_CONTEXT:
      state.contexts[action.name] = action.data;
      checkAvailableAddons(state)
      return {...state};
    case UNSET_CONTEXT:
      delete state.contexts[action.name];
      checkAvailableAddons(state);
      return {...state};

    case RESET_CONTEXTS:
      state.contexts = {};
      checkAvailableAddons(state);
      return {...state};

    case SET_SAVED_ACTIVE_ADDONS:
      return {
        ...state,
        saved_active_addons: action.ids
      }



    case FETCHING_ADDONS_START: {
      return {
        ...state,
        items: [],
        itemById: {},
      };
    }

    case FETCHING_ADDONS_SUCCESS: {
      const { addons } = action.payload;
      const ids = addons.map(item => item.id);
      const itemById = {};
      addons.forEach(item => itemById[item.id] = item);
      state.saved_active_addons.forEach( id => {
        if(itemById[id]) itemById[id].isActive = true;
      });
      checkAvailableAddons({...state, items: ids, itemById});
      return {
        ...state,
        items: ids,
        itemById,
      };
    };

    case SET_EXTERNAL_TAB:
      state.itemById[action.payload.addonId] = {
        ...state.itemById[action.payload.addonId],
        externalTab: true
      }
      return {...state};

    case SET_ACTIVE_ADDON: {
      const { itemById } = state;
      const { isActive, addonId } = action.payload;

      return {
        ...state,
        itemById: {
          ...state.itemById,
          [addonId]: {
            ...itemById[addonId],
            isActive,
          },
        }
      };
    }

    case SET_ADDON_POSITION: {
      const { itemById } = state;
      const { addonId, left, top } = action.payload;
      return {
        ...state,
        itemById: {
          ...itemById,
          [addonId]: {
            ...itemById[addonId],
            position: { left, top },
          },
        },
      }
    }

    default:
      return state;
  }

}