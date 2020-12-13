import { SET_TREE_ITEM, SET_TREE_DATA, ADD_TREE_ITEM } from 'actions/navbar.action';

const initialState = {
  treeProject: {}
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_TREE_DATA: {
      return {
        ...state,
        treeProject: payload
      };
    }
    case SET_TREE_ITEM: {
      const { key, item } = payload;
      return {
        ...state,
        treeProject: {
          ...state.treeProject,
          [key]: item
        }
      };
    }
    case ADD_TREE_ITEM: {
      return {
        ...state,
        treeProject: {
          ...state.treeProject,
          ...payload
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;
