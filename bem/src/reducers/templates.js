
export const SET_TEMPLATES = "SET_TEMPLATES"

export default function reducer(state = {
    list: [],
  }, action) {
    switch (action.type) {
      case SET_TEMPLATES: {
        return {
          ...state,
          list: action.payload
        };
      }
      default:
        return state;
    }
  }