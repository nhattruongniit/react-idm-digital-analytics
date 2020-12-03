import { ADD_ADDON, REMOVE_ADDON } from 'actions/board.action';

const initialState = {
  addon: [1,2,3,4]
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDON: 
      return {
        ...state,
        addon: [...state.addon, payload]
      }
    case REMOVE_ADDON: 
      const newAddon = state.addon.filter((_, index) => index !== payload);
      return {
        ...state,
        addon: newAddon
      }
    
    default:
      return state;
  }
}

export default reducer;
