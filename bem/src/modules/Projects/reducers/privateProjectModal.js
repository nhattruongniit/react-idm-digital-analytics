
import * as projectsApi from '../services/projectsApi';

const SET_PRIVATE_MODAL = 'PROJECTS/PRIVATE_MODAL/SET_MODAL';

export const setPrivateModal = (isShowing, projectId) => ({ 
  type: SET_PRIVATE_MODAL, 
  payload: { isShowing, projectId} 
});

export const setProjectPrivate = () =>  async (dispatch, getState) => {
  const projectId = getState().projects.privateProjectModal.projectId;
  dispatch(setPrivateModal(false, null))
  try {
    await projectsApi.makePrivate(projectId);
  } catch (e) {
    alert("Can't make private project")
  }
}

const initialState = {
  isShowing: false,
  projectId: null,
};

export default function reducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_PRIVATE_MODAL: {
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