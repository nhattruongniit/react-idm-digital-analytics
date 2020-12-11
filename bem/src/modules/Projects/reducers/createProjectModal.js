import * as projectApi from '../services/projectsApi';

export const SET_MODAL_VISIBILITY = 'PROJECTS/PROJECT_DASHBOARD/CREATE_PROJECT_MODAL_VISIBILITY';
export const CREATE_PROJECT_START = 'PROJECTS/PROJECT_DASHBOARD/CREATE_PROJECT_START';
export const CREATE_PROJECT_SUCCESS = 'PROJECTS/PROJECT_DASHBOARD/CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_ERROR = 'PROJECTS/PROJECT_DASHBOARD/CREATE_PROJECT_ERROR';

export const setModalVisibility = isShowing => ({
  type: SET_MODAL_VISIBILITY,
  payload: { isShowing },
});

export const createProjectFromFiles = files => async (dispatch, getState) => {
  dispatch({ type: CREATE_PROJECT_START });
  dispatch(setModalVisibility(false));
  try {
    await projectApi.createProjectFromFiles(files);
    // TODO: listen to project created event and push new project into the list
    dispatch({ type: CREATE_PROJECT_SUCCESS });
  } catch (e) {
    const message = e.response && e.response.data ? e.response.data.error : e.message;
    dispatch({
      type: CREATE_PROJECT_ERROR,
      payload: {
        error: message,
      }
    });
  }
}

export const createProject = (name, versionId, idfTitle, description) => async (dispatch, getState) => {
  if (!name || !versionId || !idfTitle) return;
  dispatch({ type: CREATE_PROJECT_START });
  dispatch(setModalVisibility(false));
  try {
    const res = await projectApi.createProject(name, versionId, description);
    const projectId = res.data.data.id;
    await projectApi.createDocument(idfTitle, projectId, versionId);
    dispatch({ type: CREATE_PROJECT_SUCCESS });
  } catch (e) {
    const message = e.response && e.response.data.error.description[0];

    dispatch({
      type: CREATE_PROJECT_ERROR,
      payload: {
        error: message,
      }
    });
  }
}


export default function reducer(state = {
  isShowing: false,
  isWorking: false,
  error: null,
}, action) {
  switch (action.type) {
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
      };
    }

    case CREATE_PROJECT_START: {
      return {
        ...state,
        isWorking: true,
        error: null,
      };
    }

    case CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        isWorking: false,
      };
    }

    case CREATE_PROJECT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}