import request from 'services/request';

const FETCH_IDF_DOCUMENT_SUCCESS = 'IDF_DOCUMENT/FETCH_IDF_DOCUMENT_SUCCESS';

export const fetchIdfDocument = (documentId) => async (dispatch) => {
  const res = await request(`/idf-documents/${documentId}`);
  const data = res.data.data;

  dispatch({
    type: FETCH_IDF_DOCUMENT_SUCCESS,
    payload: data
  })
}

const initialState = {
  idfDocument: {}
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case FETCH_IDF_DOCUMENT_SUCCESS: {
      return {
        ...state,
        idfDocument: payload
      }
    }
    default: 
      return state
  }
}

export default reducer;