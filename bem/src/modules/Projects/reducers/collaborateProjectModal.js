
import {
  getProjectById,
  getProjectCollaborators,
  inviteCollaborators,
  updateCollaboratorPermission,
  resendInvitation as resendCollaborationInvitation
} from "../services/projectsApi"

const SET_MODAL = 'PROJECTS/COLLABORATE_MODAL/SET_MODAL';
const SET_PROJECT = 'PROJECTS/COLLABORATE_MODAL/SET_PROJECT';
const RESET_PROJECT_DATA = 'PROJECTS/COLLABORATE_MODAL/RESET_PROJECT_DATA';
const SET_COLLABORATORS = 'PROJECTS/COLLABORATE_MODAL/SET_COLLABORATORS';
const ADD_COLLABORATORS = 'PROJECTS/COLLABORATE_MODAL/ADD_COLLABORATORS';
const UPDATE_COLLABORATOR = 'PROJECTS/COLLABORATE_MODAL/UPDATE_COLLABORATOR';
const SET_ERROR_MESSAGE = 'PROJECTS/COLLABORATE_MODAL/SET_ERROR_MESSAGE';

const captureRequestError = (dispatch, fn) => {
  dispatch({type: SET_ERROR_MESSAGE, message: null})
  try{fn()}
  catch(e){ dispatch({type: SET_ERROR_MESSAGE, message: e.message}) }
}

export const setModalCollaborate = (projectId, isShowing) => ({
  type:    SET_MODAL,
  payload: { projectId, isShowing },
});

export const loadProject = dispatch => projectId => captureRequestError(dispatch, async () => dispatch({
  type: SET_PROJECT,
  project: ( await getProjectById(projectId) ).data.data
}));

export const loadCollaborators = dispatch => projectId => captureRequestError(dispatch, async () => dispatch({
  type: SET_COLLABORATORS,
  collaborators: ( await getProjectCollaborators(projectId) ).data.data
}));

export const onInviteCollaborators = dispatch => (projectId, emails) => captureRequestError(dispatch, async () => {
  const new_collaborators = (await inviteCollaborators(projectId, emails)).data.data
  const error_messages = new_collaborators.filter( ({error}) => error )
    .map( collaborator_error => `${collaborator_error.email}:${collaborator_error.error}` )
  if(error_messages.length){
    dispatch({type: SET_ERROR_MESSAGE, message: error_messages.join(", ")})
  }
  const valid_collaborators = new_collaborators.filter( ({error}) => !error )
  dispatch({type: ADD_COLLABORATORS, collaborators: valid_collaborators})
})

export const resetCollaborationData = dispatch => () => dispatch({
  type: RESET_PROJECT_DATA
});

export const resendInvitation = dispatch => (projectId, collaboratorId) => captureRequestError(dispatch, async () => dispatch({
  type: UPDATE_COLLABORATOR,
  collaborator: (await resendCollaborationInvitation(projectId, collaboratorId)).data.data
}));

export const changeCollaboratorPermission = dispatch => (projectId, email, permission) => captureRequestError(dispatch, async () => dispatch({
  type: UPDATE_COLLABORATOR,
  collaborator: (await updateCollaboratorPermission(projectId, email, permission)).data.data
}));

const initialState = {
  isShowing: false,
  projectId: '',
  project: null,
  collaborators: [],
  errorMessage: null
};

export default function reducer(state = { ...initialState }, action) {
  switch (action.type) {

    case RESET_PROJECT_DATA:
      return { ...initialState };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.message };

    case SET_PROJECT:
      return { ...state, project: action.project };

    case SET_COLLABORATORS:
      return { ...state, collaborators: action.collaborators };

    case ADD_COLLABORATORS:
      return { ...state, collaborators: state.collaborators.concat(action.collaborators) };

    case UPDATE_COLLABORATOR:
      console.log("debug: COLLABORATOR: ", action.collaborator);
      const collaborators = state.collaborators.map( c => {
        if(c.id === action.collaborator.id) return action.collaborator;
        return c;
      });
      return { ...state, collaborators };

    case SET_MODAL: {
      return {
        ...state,
        projectId: action.payload.projectId,
        isShowing: action.payload.isShowing,
      };
    }

    default: {
      return state;
    }
  }
}