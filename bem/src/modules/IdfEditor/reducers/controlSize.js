const CONTROL_SIZE = 'IDF_EDITOR/CONTROL_SIZE';
const SET_ZEBRA_EDITOR = 'IDF_EDITOR/SET_ZEBRA_EDITOR';
const SET_SIZE_TABLE_EDITOR = 'IDF_EDITOR/SET_SIZE_TABLE_EDITOR';

export const setControlSize = (type, height, fontSize) => dispatch => {
  dispatch({
    type: CONTROL_SIZE,
    payload: {
      type,
      height,
      fontSize
    }
  })
}

export const setZebraIdfEditor = useZebraStyles => ({
  type: SET_ZEBRA_EDITOR,
  payload: { useZebraStyles }
})

export const setSizeTableIdfEditor = type => ({
  type: SET_SIZE_TABLE_EDITOR,
  payload: { type }
})


const intialState = {
  type: 'normal',
  height: 58,
  fontSize: 14,
  useZebraStyles: false
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case CONTROL_SIZE: 
      return {
        ...state,
        type: action.payload.type,
        height: action.payload.height,
        fontSize: action.payload.fontSize
      }
    case SET_ZEBRA_EDITOR: {
      return {
        ...state,
        useZebraStyles: action.payload.useZebraStyles
      }
    }
    case SET_SIZE_TABLE_EDITOR: {
      return {
        ...state,
        type: action.payload.type
      }
    }
    default:
      return state;
  }
}
