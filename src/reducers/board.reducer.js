import { ADD_ADDON, REMOVE_ADDON } from 'actions/board.action';

// mockdata
import { stackedBarData, donutData, lineData } from 'mockData';

const initialState = {
  addon: [1,2,3,4],
  boardData: {
    1: stackedBarData,
    2: donutData,
    3: lineData
  }
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
