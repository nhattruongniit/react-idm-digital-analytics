import { SET_EXPAND_DRAWER, SET_LOADING, SET_LAYOUT_TYPE } from 'actions/app.action';

const initialState = {
  isExpandDrawer: true,
  isLoading: false,
  layoutType: 'grid'
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
    case SET_LAYOUT_TYPE: {
      return {
        ...state,
        layoutType: payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
