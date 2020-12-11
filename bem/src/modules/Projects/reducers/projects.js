import * as projectsApi from '../services/projectsApi';
import { clearSelectedProjects } from './selectedProjectIds';
import { toggleSortDirection } from 'reducers/dashboardOptions';
import collaborationApi from "services/collaboration-api";

const SET_FILTER_KEYWORD = 'PROJECTS/PROJECTS/SET_FILTER_KEYWORD';
const FETCH_PROJECTS_START = 'PROJECTS/PROJECTS/FETCH_PROJECTS_START';
const FETCH_PROJECTS_SUCCESS = 'PROJECTS/PROJECTS/FETCH_PROJECTS_SUCCESS';
const FETCH_PROJECTS_ERROR = 'PROJECTS/PROJECTS/FETCH_PROJECTS_ERROR';
const UPDATE_PROJECT_ITEM = 'PROJECTS/PROJECTS/UPDATE_PROJECT_ITEM';
const ADD_PROJECT_ITEMS = 'PROJECTS/PROJECTS/ADD_PROJECT_ITEMS';
const REMOVE_PROJECT_ITEMS = 'PROJECTS/PROJECTS/REMOVE_PROJECT_ITEMS';
const REQUEST_DELETE_PROJECT = 'PROJECTS/PROJECTS/REQUEST_DELETE_PROJECT';
const CANCEL_DELETE_PROJECT = 'PROJECTS/PROJECTS/CANCEL_DELETE_PROJECT';
const SHOW_CIRCLE_TILE = 'PROJECTS/PROJECTS/SHOW_CIRCLE_TILE';
const HIDE_CIRCLE_TILE = 'PROJECTS/PROJECTS/HIDE_CIRCLE_TILE';

export const setupProjectApi = async project => {
  await collaborationApi.setupProject(project);
}

export const showCircleTile = projectId => ({
  type: SHOW_CIRCLE_TILE,
  payload: { projectId }
})

export const hideCircleTile = projectId => ({
  type: HIDE_CIRCLE_TILE,
  payload: { projectId }
})

export const requestDeleteSelectedProjects = () => ({
  type: REQUEST_DELETE_PROJECT,
  payload: {
    isDeleting: true,
    deleteSelectedProject: true,
  },
});

export const requestDeleteProject = projectId => ({
  type: REQUEST_DELETE_PROJECT,
  payload: {
    isDeleting: true,
    projectId,
  },
});

export const confirmDeleteProject = () => (dispatch, getState) => {
  const { deleteProject: data } = getState().projects.projects;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteProject());

  if (data.projectId) return dispatch(deleteProject(data.projectId));
  if (data.deleteSelectedProject) return dispatch(deleteSelectedProjects());
}

export const cancelDeleteProject = () => ({
  type: REQUEST_DELETE_PROJECT,
  payload: false,
});

export const addProjectItems = projectItems => ({
  type: ADD_PROJECT_ITEMS,
  payload: { projectItems },
});

export const removeProjectItems = projectIds => ({
  type: REMOVE_PROJECT_ITEMS,
  payload: { projectIds }
})

export const setFilterKeyword = keyword => (dispatch, getState)=> {
  // dispatch({
  //   type: SET_FILTER_KEYWORD,
  //   payload: { filterKeyword: keyword },
  // })
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  if(keyword === '' || keyword.length >= 3) {
    dispatch(fetchProjects(currentPage, perPage, sortDirection, keyword));
  }
};

export const updateProjectItem = (projectId, updateData) => ({
  type: UPDATE_PROJECT_ITEM,
  payload: { projectId, updateData },
});


export const deleteSelectedProjects = () => async (dispatch, getState) => {
  const selectedProjectIds = getState().projects.selectedProjectIds;
  dispatch(clearSelectedProjects());
  dispatch(showCircleTile(selectedProjectIds));
  try {
    await projectsApi.deleteProjects(selectedProjectIds);
    dispatch(removeProjectItems(selectedProjectIds))
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const deleteProject = projectId => async dispatch => {
  dispatch(showCircleTile(projectId));
  dispatch(clearSelectedProjects());
  try {
    await projectsApi.deleteProjects([projectId]);
    dispatch(removeProjectItems(projectId))
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const duplicateProject = projectId => async (dispatch) => {
  dispatch(showCircleTile(projectId));
  dispatch(clearSelectedProjects());
  try {
    await projectsApi.cloneProject(projectId);
    dispatch(hideCircleTile(projectId));
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const duplicateSelectedProjects = () => async (dispatch, getState) => {
  const selectedProjectIds = getState().projects.selectedProjectIds;
  const pms = selectedProjectIds.map(projectId => projectsApi.cloneProject(projectId));
  dispatch(showCircleTile(selectedProjectIds));
  dispatch(clearSelectedProjects());
  try {
    await Promise.all(pms);
    dispatch(hideCircleTile(selectedProjectIds));
  } catch (e) {
    console.log(e);
  }
}

export const fetchProjects = (currentPage, perPage, orderBy, keyword = '') => async dispatch => {
  // dispatch(setFilterKeyword(''))
  dispatch({ type: FETCH_PROJECTS_START});
  dispatch(clearSelectedProjects());
  try {
    const res = await projectsApi.fetchProjects(currentPage, perPage, orderBy, keyword);
    const projects = res.data;
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: { projectItems: projects },
    });
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const actSortByDate = () => (dispatch, getState) => {
  dispatch(toggleSortDirection());
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  dispatch(fetchProjects(currentPage, perPage, sortDirection));
}

export const setProjectName = (projectId, name) => async (dispatch, getState) => {
  const { perPage } = getState().projects.projects.meta;
  try {
    await projectsApi.updateProject(projectId, { project_name: name });
    dispatch(fetchProjects(1, perPage, 'desc'));
  } catch (e) {
    console.log('Unable to update project', e);
  }
}

export default function reducer(state = {
  projectItems: [],
  deleteProject: {},
  circles: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  }
}, action) {
  switch (action.type) {
    case FETCH_PROJECTS_START: {
      return {
        ...state,
        projectItems: [],
      };
    }

    case FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        projectItems: action.payload.projectItems.data,
        meta: {
          currentPage: action.payload.projectItems.meta.current_page,
          perPage: Number(action.payload.projectItems.meta.per_page),
          totalItems: action.payload.projectItems.meta.total,
        }
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_PROJECT_ITEM: {
      const { projectId, updateData } = action.payload;
      return {
        ...state,
        projectItems: state.projectItems.map(item => {
          if (item.id === projectId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_PROJECT_ITEMS: {
      return {
        ...state,
        projectItems: [
          ...action.payload.projectItems,
          ...state.projectItems,
        ],
      };
    }

    case REMOVE_PROJECT_ITEMS: {
      const { projectIds } = action.payload;
      let newProjects = [];

      if(projectIds.length > 0 ) {
        newProjects = state.projectItems.filter(item => projectIds.indexOf(item.id) === -1)
      } else {
        newProjects = state.projectItems.filter(item => item.id !== projectIds)
      }

      return {
        ...state,
        projectItems: newProjects
      };
    }

    case REQUEST_DELETE_PROJECT: {
      return {
        ...state,
        deleteProject: action.payload,
      };
    }

    case CANCEL_DELETE_PROJECT: {
      return {
        ...state,
        deleteProject: {},
      };
    }

    case SHOW_CIRCLE_TILE: {
      const { projectId } = action.payload;
      let newObj = {};
      if (projectId.length > 0) {
        projectId.forEach(id => newObj[id] = true)
      }  else {
        newObj = state.circles[action.payload.projectId] = true;
      }
      return {
        ...state,
        circles: {...state.circles, ...newObj}
      }
    }

    case HIDE_CIRCLE_TILE: {
      const { projectId } = action.payload;
      if (projectId.length > 0) {
        projectId.forEach(id => delete state.circles[id])
      }  else {
        delete state.circles[action.payload.projectId]
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