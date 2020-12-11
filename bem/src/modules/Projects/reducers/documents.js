import * as projectApi       from '../services/projectsApi';
import * as remoteProjectApi from '../services/remoteProjectApi';
import { clearSelectedDocuments } from './selectedDocumentIds';
import { toggleSortDirection } from 'reducers/dashboardOptions';

const FETCH_DOCUMENTS_START = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_START';
const FETCH_DOCUMENTS_SUCCESS = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_SUCCESS';
const FETCH_DOCUMENTS_ERROR = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_ERROR';

const SET_FILTER_KEYWORD = 'PROJECTS/DOCUMENTS/SET_FILTER_KEYWORD';
const UPDATE_ITEM = 'PROJECTS/DOCUMENTS/UPDATE_ITEM';
const ADD_DOCUMENT_ITEM = 'PROJECTS/DOCUMENTS/ADD_DOCUMENT_ITEM';
const REMOVE_DOCUMENT_ITEM = 'PROJECTS/DOCUMENTS/REMOVE_DOCUMENT_ITEM';
export const RESET_DOCUMENT_PAGE_STATE = 'PROJECTS/DOCUMENTS/RESET_DOCUMENT_PAGE_STATE';
const REQUEST_DELETE_DOCUMENT = 'PROJECTS/DOCUMENTS/REQUEST_DELETE_DOCUMENT';
const CANCEL_DELETE_DOCUMENT = 'PROJECTS/DOCUMENTS/CANCEL_DELETE_DOCUMENT';
const SHOW_CIRCLE_TILE = 'DOCUMENTS/SHOW_CIRCLE_TILE';
const HIDE_CIRCLE_TILE = 'DOCUMENTS/HIDE_CIRCLE_TILE';

export const showCircleTile = documentId => ({
  type: SHOW_CIRCLE_TILE,
  payload: { documentId }
})

export const hideCircleTileDocument = documentId => ({
  type: HIDE_CIRCLE_TILE,
  payload: { documentId }
})

export const requestDeleteSelectedDocuments = () => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: {
    isDeleting: true,
    deleteSelectedDocument: true,
  },
});

export const requestDeleteDocument = documentId => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: {
    isDeleting: true,
    documentId,
  },
});

export const confirmDeleteDocument = () => (dispatch, getState) => {
  const { deleteDocument: data } = getState().projects.documents;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteDocument());

  if (data.documentId) return dispatch(deleteDocument(data.documentId));
  if (data.deleteSelectedDocument) return dispatch(deleteSelectedDocuments());
}

export const cancelDeleteDocument = () => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: false,
});

export const resetDocumentPageState = () => async (dispatch, getState) => {
  // const projectId = getState().project.id;
  // const currentPage = getState().projects.documents.meta.currentPage;
  // const perPage =  getState().projects.documents.meta.perPage;
  dispatch({ type: RESET_DOCUMENT_PAGE_STATE });
  // dispatch(fetchDocuments(projectId, currentPage, perPage));
};

export const addDocumentItem = document => (dispatch, getState) => {
  const { project } = getState();
  if (project && document.project_id === project.id) {
    dispatch({
      type: ADD_DOCUMENT_ITEM,
      payload: { document },
    });
  }
}

export const removeDocumentItems = documentId => ({
  type: REMOVE_DOCUMENT_ITEM,
  payload: { documentId }
})

// export const setFilterKeyword = filterKeyword => ({
//   type: SET_FILTER_KEYWORD,
//   payload: { filterKeyword },
// });

export const updateItem = (documentId, updateData) => ({
  type: UPDATE_ITEM,
  payload: { documentId, updateData },
});

export const duplicateDocument = documentId => async dispatch => {
  dispatch(showCircleTile(documentId));
  dispatch(clearSelectedDocuments());
  try {
    await projectApi.cloneDocuments([documentId]);
    dispatch(hideCircleTileDocument(documentId));
  } catch (err) {
    alert("Duplicate Document Error")
  }
}

export const duplicateSelectedDocuments = () => async (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  dispatch(showCircleTile(selectedDocumentIds));
  dispatch(clearSelectedDocuments());
  try {
    await projectApi.cloneDocuments(selectedDocumentIds);
    dispatch(hideCircleTileDocument(selectedDocumentIds));
  } catch (err) {
    alert("Duplicate Document Error")
  }
}

export const deleteDocument = documentId => async dispatch => {
  // dispatch(selectDocuments([documentId], false));
  dispatch(showCircleTile(documentId));
  dispatch(clearSelectedDocuments());
  try {
    await projectApi.deleteDocument(documentId);
    dispatch(removeDocumentItems(documentId))
  } catch (err) {
    alert("Cann't delete document")
  }
}

export const deleteSelectedDocuments = () => async (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  dispatch(clearSelectedDocuments());
  dispatch(showCircleTile(selectedDocumentIds));
  try {
    const pms = selectedDocumentIds.map(documentId => projectApi.deleteDocument(documentId));
    await Promise.all(pms);
    dispatch(removeDocumentItems(selectedDocumentIds))
  } catch (err) {
    alert("Cann't delete selected documents")
  }
}

export const fetchDocuments = (projectId, currentPage, perPage, sortDirection, keyword = '') => async dispatch => {
  dispatch({ type: FETCH_DOCUMENTS_START });
  try {
    const documents = await projectApi.fetchDocuments(projectId, currentPage, perPage, sortDirection, keyword);

    // const documents = res.data;
    // console.log("debug: documents: ", documents)
    // documents.data.sort((d1, d2) => {
    //   return new Date(d2.updated_at) - new Date(d1.updated_at);
    // })
    dispatch({
      type: FETCH_DOCUMENTS_SUCCESS,
      payload: { documents },
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: FETCH_DOCUMENTS_ERROR
    });
    alert('Fetch Document Error');
  }
  
}

export const fetchRemoteDocuments = (setLoadingMessage, projectId, currentPage, perPage, sortDirection, keyword = '') => async dispatch => {
  dispatch({ type: FETCH_DOCUMENTS_START });

  try {
    const res = await remoteProjectApi.fetchDocuments(setLoadingMessage, projectId, currentPage, perPage, sortDirection, keyword);
    const documents = res.data;
    // documents.data.sort((d1, d2) => {
    //   return new Date(d2.updated_at) - new Date(d1.updated_at);
    // })
    dispatch({
      type: FETCH_DOCUMENTS_SUCCESS,
      payload: { documents },
    });
  } catch (e) {
    dispatch({
      type: FETCH_DOCUMENTS_ERROR
    });
    alert('Fetch Document Error');
  }
  
}

export const setFilterKeyword = (keyword, projectId) => (dispatch, getState)=> {
  const { currentPage, perPage } = getState().projects.documents.meta;
  const { sortDirection } = getState().dashboardOptions;

  if(keyword === '' || keyword.length >= 3) {
    dispatch(fetchDocuments(projectId, currentPage, perPage, sortDirection, keyword));
  }
};


export const setDocumentName = (documentId, name) => async (dispatch) => {
  try {
    const res = await projectApi.updateDocument(documentId, { document_name: name });
    const updatedDocument = res.data.data;
    dispatch(updateItem(documentId, {
      ...updatedDocument,
    }));
  } catch (e) {
    alert("Unable to update document")
  }
}

export const actSortByDate = () => (dispatch, getState) => {
  dispatch(toggleSortDirection());
  const projectId = getState().project.id;
  const { currentPage, perPage } = getState().projects.documents.meta;
  const { sortDirection } = getState().dashboardOptions;
  dispatch(fetchDocuments(projectId, currentPage, perPage, sortDirection));
}

const initialState = {
  documentItems: [],
  error: false,
  deleteDocument: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  },
  circles: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS_START: {
      return {
        ...state,
        documentItems: [],
      }
    }
    case FETCH_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        documentItems: action.payload.documents.data,
        meta: {
          currentPage: action.payload.documents.meta.current_page,
          perPage: Number(action.payload.documents.meta.per_page),
          totalItems: action.payload.documents.meta.total,
        }
      };
    }

    case FETCH_DOCUMENTS_ERROR: {
      return {
        ...state,
        documentItems: [],
        error: true,
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_ITEM: {
      const { documentId, updateData } = action.payload;
      return {
        ...state,
        documentItems: state.documentItems.map(item => {
          if (item.id === documentId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_DOCUMENT_ITEM: {
      return {
        ...state,
        documentItems: [
          action.payload.document,
          ...state.documentItems,
        ],
      };
    }

    case REMOVE_DOCUMENT_ITEM: {
      const { documentId } = action.payload;
      let newDocuments = [];

      if(documentId.length > 0 ) {
        newDocuments = state.documentItems.filter(item => documentId.indexOf(item.id) === -1)
      } else {
        newDocuments = state.documentItems.filter(item => item.id !== documentId)
      }

      return {
        ...state,
        documentItems: newDocuments
      };
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return initialState;
    }

    case REQUEST_DELETE_DOCUMENT: {
      return {
        ...state,
        deleteDocument: action.payload,
      };
    }

    case CANCEL_DELETE_DOCUMENT: {
      return {
        ...state,
        deleteDocument: {},
      };
    }

    case SHOW_CIRCLE_TILE: {
      const { documentId } = action.payload;
      let newObj = {};
      if (documentId.length > 0) {
        documentId.forEach(id => newObj[id] = true)
      }  else {
        newObj = state.circles[action.payload.documentId] = true;
      }
      return {
        ...state,
        circles: {...state.circles, ...newObj}
      }
    }

    case HIDE_CIRCLE_TILE: {
      const { documentId } = action.payload;
      if (documentId.length > 0) {
        documentId.forEach(id => delete state.circles[id])
      }  else {
        delete state.circles[action.payload.documentId]
      }
      return {
        ...state,
        circles: {...state.circles}
      }
    }

    default:
      return state;
  }
}