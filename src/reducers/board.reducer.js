import { ADD_ADDON } from 'actions/board.action';

const initialState = {
  addon: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDON: 
      return {
        ...state,
        addon: [...state.addon, payload]
      }
    default:
      return state;
  }
}

export default reducer;
