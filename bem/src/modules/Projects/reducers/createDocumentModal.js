import * as projectsApi from '../services/projectsApi';
import { RESET_DOCUMENT_PAGE_STATE } from './documents';

import request from "services/request"

const SET_IS_SHOWING_MODAL = 'PROJECTS/CREATE_DOCUMENT_MODAL/SET_IS_SHOWING_MODAL';
const CREATE_IDF_DOCUMENT_START = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_START';
const CREATE_IDF_DOCUMENT_SUCCESS = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_SUCCESS';
const CREATE_IDF_DOCUMENT_ERROR = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_ERROR';

export const setIsShowingCreateIdfDocumentModal = isShowing => ({
  type: SET_IS_SHOWING_MODAL,
  payload: { isShowing },
});

export const showCreateIdfDocumentModal = () => dispatch => dispatch(setIsShowingCreateIdfDocumentModal(true));

export const hideCreateIdfDocumentModal = () => dispatch => dispatch(setIsShowingCreateIdfDocumentModal(false));

export const createDocument = (title, template_id) => async (dispatch, getState) => {
  const { project } = getState();
  if (!project) return;
  dispatch({ type: CREATE_IDF_DOCUMENT_START });
  try {
    const idf_document = (await projectsApi.createDocument(title, project.id, project.version_id, template_id)).data.data;
    insertRequiredObjects(idf_document);
    dispatch({ type: CREATE_IDF_DOCUMENT_SUCCESS });
  } catch (e) {
    const message = e.response ? e.response.data.error : e.message;
    dispatch({
      type: CREATE_IDF_DOCUMENT_ERROR,
      payload: { error: message },
    });
  }
}

async function insertRequiredObjects(idf_document){
  if(idf_document.template_id){
    const objects = (await request(`/templates/${idf_document.template_id}/required-objects`)).data.data
    await request.post(`/idf-documents/${idf_document.id}/add-objects`, {objects})
  }
}

export const createDocumentFromFiles = files => async (dispatch, getState) => {
  const { project } = getState();
  if (!project) return;
  dispatch({ type: CREATE_IDF_DOCUMENT_START });
  try {
    await projectsApi.createDocumentFromFile(project.id, files);
    dispatch({ type: CREATE_IDF_DOCUMENT_SUCCESS });
  } catch (e) {
    const message = e.response ? e.response.data.error : e.message;
    dispatch({
      type: CREATE_IDF_DOCUMENT_ERROR,
      payload: { error: message },
    });
  }
}

const initialState = {
  isShowing: false,
  isWorking: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_SHOWING_MODAL: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
      };
    }

    case CREATE_IDF_DOCUMENT_START: {
      return {
        ...state,
        isWorking: true,
        error: null,
      };
    }

    case CREATE_IDF_DOCUMENT_SUCCESS: {
      return {
        ...state,
        isWorking: false,
        isShowing: false,
      };
    }

    case CREATE_IDF_DOCUMENT_ERROR: {
      return {
        ...state,
        isWorking: false,
        error: action.payload.error,
      };
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}