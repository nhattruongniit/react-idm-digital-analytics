import { SET_EXPAND_DRAWER } from 'actions/app.action';

const initialState = {
  isExpandDrawer: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EXPAND_DRAWER: {
      return {
        ...state,
        isExpandDrawer: payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
