import * as classListApi from '../services/classListApi';
import { START_FETCHING_CLASS_LIST } from './classList';

const SET_REFERENCE_ITEM_DATA = 'IDF_EDITOR/SET_REFERENCE_ITEM_DATA';
const SET_EXTERNAL_LIST_DATA = 'IDF_EDITOR/SET_EXTERNAL_LIST_DATA';

export const fetchReference = name => async (dispatch, getState) => {
  const projectId = getState().projectId;
  if (getState().references[name]) return null;

  const response = await classListApi.fetchReference(projectId, name);
  const data = response.data[name] || [];
  dispatch({
    type: SET_REFERENCE_ITEM_DATA,
    payload: { name, data }
  });
};

export const fetchExternalList = external_list_name => async(dispatch, getState) => {
  const projectId = getState().projectId;
  const data = (await classListApi.fetchExternalList(projectId, external_list_name.toLowerCase())).data;
  dispatch({
    type: SET_REFERENCE_ITEM_DATA,
    payload: { name: external_list_name, data}
  })

}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case START_FETCHING_CLASS_LIST:
      return {};

    case SET_REFERENCE_ITEM_DATA: {
      const { name, data } = action.payload;
      return {
        ...state,
        [name]: data
      };
    }

    default:
      return state;
  }
}
