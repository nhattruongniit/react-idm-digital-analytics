import { SET_EXPAND_DRAWER, SET_LOADING } from 'actions/app.action';

const initialState = {
  isExpandDrawer: true,
  isLoading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EXPAND_DRAWER: {
      return {
        ...state,
        isExpandDrawer: payload
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
