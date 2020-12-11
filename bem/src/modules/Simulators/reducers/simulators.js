import * as simulatorsApi from '../services/simulatorsApi';
import { clearSelectedItems } from './selectedSimulatorsId';
import { SORT_DIRECTION } from 'appConstants';
import { toggleSortDirection } from 'reducers/dashboardOptions';

const SET_FILTER_KEYWORD = 'SIMULATORS/SET_FILTER_KEYWORD';
const FETCH_SIMULATORS_START = 'SIMULATORS/FETCH_SIMULATORS_START';
const FETCH_SIMULATORS_SUCCESS = 'SIMULATORS/FETCH_SIMULATORS_SUCCESS';
const FETCH_SIMULATORS_ERROR = 'SIMULATORS/FETCH_SIMULATORS_ERROR';
const ADD_SIMULATOR_ITEMS = 'SIMULATORS/ADD_SIMULATOR_ITEMS';
const UPDATE_SIMULATOR_ITEM = 'SIMULATORS/UPDATE_SIMULATOR_ITEM';
const REMOVE_SIMULATOR_ITEMS = 'SIMULATORS/REMOVE_SIMULATOR_ITEMS';
const REQUEST_DELETE_SIMULATOR = 'SIMULATORS/REQUEST_DELETE_SIMULATOR';
const CANCEL_DELETE_SIMULATOR = 'SIMULATORS/CANCEL_DELETE_SIMULATOR';
const REQUEST_DOWNLOAD_SIMULATION = 'SIMULATIORS/REQUEST_DOWNLOAD_SIMULATION';
const FETCH_SINGLE_SIMULATOR_SUCCESS = 'SIMULATIORS/FETCH_SINGLE_SIMULATOR_SUCCESS';
const SHOW_CIRCLE_TILE_SIMULATOR = 'SIMULATIORS/SHOW_CIRCLE_TILE_SIMULATOR';
const HIDE_CIRCLE_TILE_SIMULATOR = 'SIMULATIORS/HIDE_CIRCLE_TILE_SIMULATOR';
const RESET_CIRCLE_TILE_SIMULATIOR = 'SIMULATIORS/RESET_CIRCLE_TILE_SIMULATIOR';

export const showCircleTileSimulator = simulatorId => ({
  type: SHOW_CIRCLE_TILE_SIMULATOR,
  payload: { simulatorId }
})

export const hideCircleTileSimulator = simulatorId => ({
  type: HIDE_CIRCLE_TILE_SIMULATOR,
  payload: { simulatorId }
})

export const resetCircleTileSimulator = () => ({ type: RESET_CIRCLE_TILE_SIMULATIOR })

export const requestDeleteSelectedSimulators = () => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: {
    isDeleting: true,
    deleteSelectedSimulator: true,
  },
});

export const requestDeleteSimulator = simulatorId => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: {
    isDeleting: true,
    simulatorId,
  },
});

export const addSimulatorItems = simulatorItems => ({
  type: ADD_SIMULATOR_ITEMS,
  payload: { simulatorItems },
});


export const confirmDeleteSimulator = () => (dispatch, getState) => {
  const { deleteSimulator: data } = getState().simulators.simulators;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteSimulator());

  if (data.simulatorId) return dispatch(deleteSimulator(data.simulatorId));
  if (data.deleteSelectedSimulator) return dispatch(deleteSelectedSimulators());
}

export const cancelDeleteSimulator = () => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: false,
});

// export const setFilterKeyword = filterKeyword => ({
//   type: SET_FILTER_KEYWORD,
//   payload: { filterKeyword },
// });

export const setViewName = (simulatorId, name) => async (dispatch, getState) => {
  const documentId = getState().simulators.simulators.documentId;
  const currentPage = getState().simulators.simulators.meta.currentPage;
  const perPage = getState().simulators.simulators.meta.perPage;
  const { sortDirection } = getState().dashboardOptions;

  try {
    // const res = await simulatorsApi.updateSimulation(simulatorId, { simulation_name: name });
    // const updatedSimulator = res.data.data;
    // dispatch(updateSimulatorItem(simulatorId, {
    //   ...updatedSimulator,
    // }));

    await simulatorsApi.updateSimulation(simulatorId, { simulation_name: name });
    dispatch(fetchSimulations(documentId, currentPage, perPage, sortDirection));
  } catch (e) {
    console.log('Unable to update simulator', e);
  }
}

export const deleteSelectedSimulators = () => async (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;
  dispatch(showCircleTileSimulator(selectedSimulatorsId));
  dispatch(clearSelectedItems());
  try {
    await simulatorsApi.deleteMultipleSimulations(selectedSimulatorsId);
    dispatch({
      type: REMOVE_SIMULATOR_ITEMS,
      payload: { simulatorIds: selectedSimulatorsId },
    });
  } catch (e) {
    alert("Cann't delete view")
  }
}

export const deleteSimulator = simulatorId => async dispatch => {
  dispatch(showCircleTileSimulator(simulatorId));
  dispatch(clearSelectedItems());
  try {
    await simulatorsApi.deleteMultipleSimulations([simulatorId]);
    dispatch({
      type: REMOVE_SIMULATOR_ITEMS,
      payload: { simulatorIds: simulatorId },
    });
  } catch (e) {
    alert("Can't delete simulator")
  }
}

export const fetchSimulations = (documentId, currentPage, perPage, sortDirection, keyword) => async (dispatch) => {
  dispatch({ type: FETCH_SIMULATORS_START });
  dispatch(clearSelectedItems());
  dispatch(cancelDeleteSimulator());
  // dispatch(setFilterKeyword('')) 
  try {
    const SIMULATORS = await simulatorsApi.fetchSimulations(documentId, currentPage, perPage, sortDirection, keyword);
    dispatch({
      type: FETCH_SIMULATORS_SUCCESS,
      payload: {
        simulatorItems: SIMULATORS,
        documentId
      },
    });
  } catch (e) {
    dispatch({ type: FETCH_SIMULATORS_ERROR });
  }
}

export const setFilterKeyword = (keyword, documentId) => (dispatch, getState) => {
  // dispatch({
  //   type: SET_FILTER_KEYWORD,
  //   payload: { filterKeyword },
  // })
  const { currentPage, perPage } = getState().simulators.simulators.meta;
  const { sortDirection } = getState().dashboardOptions;

  if (keyword === '' || keyword.length >= 3) {
    dispatch(fetchSimulations(documentId, currentPage, perPage, sortDirection, keyword));
  }
};

export const updateSimulatorItem = (simulatorId, updateData) => ({
  type: UPDATE_SIMULATOR_ITEM,
  payload: { simulatorId, updateData },
});

export const downloadSimulations = (apiBaseUrl, simulation_id) => () => {
  window.open(simulatorsApi.downloadSimulations(apiBaseUrl, simulation_id))
}

export const downloadSelectedSimulations = (apiBaseUrl) => (dispatch, getState) => {
  dispatch({ type: REQUEST_DOWNLOAD_SIMULATION });
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;
  for (const simulation_id of selectedSimulatorsId) {
    window.open(simulatorsApi.downloadSimulations(apiBaseUrl, simulation_id))
  }
}

export const duplicateSimulation = simulatorId => async (dispatch, getState) => {
  dispatch(showCircleTileSimulator(simulatorId));
  dispatch(clearSelectedItems());
  try {
    await simulatorsApi.duplicateSimulation(simulatorId);
  } catch (e) {
    alert("Can't duplicate simulator")
  }
}

export const fetchSingleSimulation = simulatorId => async dispatch => {
  try {
    const response = await simulatorsApi.fetchSingleSimuation(simulatorId);
    const data = response.data.data;
    dispatch({
      type: FETCH_SINGLE_SIMULATOR_SUCCESS,
      payload: { data }
    })
  } catch (e) {
    console.log('==fetchSingleSimulation error==', e)
  }
}

export const actSortByDate = () => (dispatch, getState) => {
  dispatch(toggleSortDirection());
  const documentId = getState().simulators.simulators.documentId;
  const { currentPage, perPage } = getState().simulators.simulators.meta;
  const { sortDirection } = getState().dashboardOptions;
  dispatch(fetchSimulations(documentId, currentPage, perPage, sortDirection));
}

export default function reducer(state = {
  simulatorItems: [],
  sortDirection: SORT_DIRECTION.ASC,
  deleteSimulator: {},
  simulator: {},
  documentId: null,
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  },
  circles: {},
}, action) {
  switch (action.type) {
    case FETCH_SIMULATORS_START: {
      return {
        ...state,
        simulatorItems: []
      };
    }

    case FETCH_SIMULATORS_SUCCESS: {
      return {
        ...state,
        simulatorItems: action.payload.simulatorItems.data,
        documentId: action.payload.documentId,
        meta: {
          currentPage: action.payload.simulatorItems.meta.current_page,
          perPage: Number(action.payload.simulatorItems.meta.per_page),
          totalItems: action.payload.simulatorItems.meta.total,
        }
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_SIMULATOR_ITEM: {
      const { simulatorId, updateData } = action.payload;
      return {
        ...state,
        simulatorItems: state.simulatorItems.map(item => {
          if (item.id === simulatorId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_SIMULATOR_ITEMS: {
      return {
        ...state,
        simulatorItems: [
          ...action.payload.simulatorItems,
          ...state.simulatorItems,
        ],
      };
    }

    case REMOVE_SIMULATOR_ITEMS: {
      const { simulatorIds } = action.payload;
      let newSimulators = [];

      if (simulatorIds.length > 0) {
        newSimulators = state.simulatorItems.filter(item => simulatorIds.indexOf(item.id) === -1)
      } else {
        newSimulators = state.simulatorItems.filter(item => item.id !== simulatorIds)
      }

      return {
        ...state,
        simulatorItems: newSimulators
      };
    }

    case REQUEST_DELETE_SIMULATOR: {
      return {
        ...state,
        deleteSimulator: action.payload,
      };
    }

    case CANCEL_DELETE_SIMULATOR: {
      return {
        ...state,
        deleteSimulator: {},
      };
    }

    case FETCH_SINGLE_SIMULATOR_SUCCESS: {
      return {
        ...state,
        simulator: action.payload.data
      }
    }

    case SHOW_CIRCLE_TILE_SIMULATOR: {
      const { simulatorId } = action.payload;
      let newObj = {};
      if (simulatorId.length > 0) {
        simulatorId.forEach(id => newObj[id] = true)
      } else {
        newObj = state.circles[simulatorId] = true;
      }
      return {
        ...state,
        circles: { ...state.circles, ...newObj }
      }
    }

    case HIDE_CIRCLE_TILE_SIMULATOR: {
      const { simulatorId } = action.payload;
      if (simulatorId.length > 0) {
        simulatorId.forEach(id => delete state.circles[id])
      } else {
        delete state.circles[simulatorId]
      }
      return {
        ...state,
        circles: { ...state.circles }
      }
    }

    case RESET_CIRCLE_TILE_SIMULATIOR: {
      return {
        ...state,
        circles: {}
      }
    }

    default:
      return state;
  }
}