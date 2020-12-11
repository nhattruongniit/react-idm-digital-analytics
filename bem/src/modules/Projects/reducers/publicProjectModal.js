
import * as projectsApi from '../services/projectsApi';

const SET_PUBLIC_MODAL = 'PROJECTS/PUBLIC_MODAL/SET_MODAL';

export const setPublicModal = (isShowing, projectId) => ({ 
  type: SET_PUBLIC_MODAL, 
  payload: { isShowing, projectId} 
});

export const setProjectPublic = (params) => async (dispatch, getState) => {
  const projectId = getState().projects.publicProjectModal.projectId;
  dispatch(setPublicModal(false, null))
  try {
    await projectsApi.makePublic(projectId, params);
  } catch (e) {
    alert("Project not found")
  }
}

const initialState = {
  isShowing: false,
  projectId: null,
};

export default function reducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_PUBLIC_MODAL: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
        projectId: action.payload.projectId,
      };
    }

    default: {
      return state;
    }
  }
}