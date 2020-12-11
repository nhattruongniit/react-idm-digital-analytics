import * as simulationResultsApi from '../services/simulatorResults';
import * as chartsApi from '../../Charts/services/chartsApi';
import history from 'config/history';
import { clearSelectedItems } from './selectedSimulatorsId';
import { SORT_DIRECTION } from 'appConstants';
import { toggleSortDirection } from 'reducers/dashboardOptions';

const FETCH_FILE_SIMULATION_START = 'SIMULATION_RESULT/FETCH_FILE_SIMULATION_START';
const FETCH_FILE_SIMULATION_SUCCESS = 'SIMULATION_RESULT/FETCH_FILE_SIMULATION_SUCCESS';
const SET_FILTER_KEYWORD = 'SIMULATION_RESULT/SET_FILTER_KEYWORD';
const FETCH_SIMULATORS_SUCCESS = 'SIMULATION_RESULT/FETCH_SIMULATORS_SUCCESS';
const FETCH_SIMULATORS_ERROR = 'SIMULATION_RESULT/FETCH_SIMULATORS_ERROR';
const REMOVE_SIMULATOR_ITEMS = 'SIMULATION_RESULT/REMOVE_SIMULATOR_ITEMS';
const REQUEST_DELETE_SIMULATOR = 'SIMULATION_RESULT/REQUEST_DELETE_SIMULATOR';
const CANCEL_DELETE_SIMULATOR = 'SIMULATION_RESULT/CANCEL_DELETE_SIMULATOR';
const UPDATE_CHART_ITEM = 'SIMULATION_RESULT/UPDATE_CHART_ITEM';
const SET_ACCORDION = 'SIMULATION_RESULT/SET_ACCORDION';
const SHOW_CIRCLE_TILE = 'SIMULATION_RESULT/SHOW_CIRCLE_TILE';
const HIDE_CIRCLE_TILE = 'SIMULATION_RESULT/HIDE_CIRCLE_TILE';

export const showCircleTile = simulationResultId => ({
  type: SHOW_CIRCLE_TILE,
  payload: { simulationResultId }
})

export const hideCircleTile = simulationResultId => ({
  type: HIDE_CIRCLE_TILE,
  payload: { simulationResultId }
})

export const setAccordion = isExpand => dispatch => {
  dispatch({
    type: SET_ACCORDION,
    payload: { isExpand }
  })
};

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

export const updateChartItem = (chartId, updateData) => ({
  type: UPDATE_CHART_ITEM,
  payload: { chartId, updateData },
});

export const confirmDeleteSimulator = () => (dispatch, getState) => {
  const { deleteSimulator: data } = getState().simulatorResults.simulationResults;

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

export const setFilterKeyword = (keyword, simulatorId) => (dispatch, getState) => {
  // dispatch({
  //   type: SET_FILTER_KEYWORD,
  //   payload: { filterKeyword },
  // })
  const { currentPage, perPage } = getState().simulatorResults.simulationResults.meta;

  if(keyword === '' || keyword.length >= 3) {
    dispatch(fetchFileSimulation(simulatorId, currentPage, perPage, keyword));
  }
};

export const deleteSelectedSimulators = () => async (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulatorResults.selectedSimulatorsId;
  dispatch(clearSelectedItems());
  dispatch(showCircleTile(selectedSimulatorsId));

  try {
    await simulationResultsApi.deleteMultipleSimulations(selectedSimulatorsId);
    dispatch({
      type: REMOVE_SIMULATOR_ITEMS,
      payload: { simulatorIds: selectedSimulatorsId },
    });
  } catch (e) {
    alert("Can't delete simulator")
  }
}

export const deleteSimulator = simulatorId => async dispatch => {
  dispatch(clearSelectedItems());
  dispatch(showCircleTile(simulatorId));
  try {
    await simulationResultsApi.deleteMultipleSimulations([simulatorId]);
    dispatch({
      type: REMOVE_SIMULATOR_ITEMS,
      payload: { simulatorIds: [simulatorId] },
    });
  } catch (e) {
    alert("Can't delete simulator")
  }
}

export const fetchSimulations = (documentId, currentPage, perPage) => async (dispatch) => {
  dispatch(clearSelectedItems());
  dispatch(cancelDeleteSimulator());
  try {
    const res = await simulationResultsApi.fetchSimulations(documentId, currentPage, perPage);
    const SIMULATORS = res.data;
    dispatch({
      type: FETCH_SIMULATORS_SUCCESS,
      payload: { simulatorItems: SIMULATORS },
    });
  } catch (e) {
    dispatch({ type: FETCH_SIMULATORS_ERROR });
  }
}

export const fetchFileSimulation = (simulationId, currentPage, perPage, keyword = '') => async (dispatch, getState) => {
  const current_page =  currentPage || getState().simulatorResults.simulationResults.meta.currentPage;
  const per_page = perPage || getState().simulatorResults.simulationResults.meta.perPage;

  // dispatch(setFilterKeyword(''));
  dispatch({ type: FETCH_FILE_SIMULATION_START });
  try {
    const [resFiles, resCharts] = await Promise.all([
      simulationResultsApi.fetchFileSimulation(simulationId, keyword),
      simulationResultsApi.getChartsBySimulatorId(simulationId, current_page, per_page, keyword),
    ]);
    const data = [...resFiles.data.data, ...resCharts.data.data];
    const metaCharts = resCharts.data.meta;
    dispatch({
      type: FETCH_FILE_SIMULATION_SUCCESS,
      payload: { data, metaCharts }
    })
  } catch (err) {
    console.log('===fetchFileSimulation error=', err)
  }
}

export const actSortByDate = () => (dispatch, getState) => {
  dispatch(toggleSortDirection());
  const simulationId = getState().simulation.id;
  const { currentPage, perPage } = getState().simulatorResults.simulationResults.meta;
  dispatch(fetchFileSimulation(simulationId, currentPage, perPage));
}


export const setChartName = (chartId, chartName, parentSimulationId, chartType, chartOption) => async (dispatch) => {
  const data = {
    "id": chartId,
    "chart_name": chartName,
    "parent_simulation_id": parentSimulationId,
    "type": chartType,
    "options": chartOption,
  }
  
  try {
    const res = await chartsApi.updateChart(chartId, data);
    const updateChart = res.data.data;
    dispatch(updateChartItem(chartId, {
      ...updateChart,
    }));
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const openChart = (projectId, document_id, parent_simulation_id, chartId) => {
  const link = `/dashboard/${projectId}/documents/${document_id}/simulator/${parent_simulation_id}/charts/${chartId}/editor`;
  history.push(link);
}

export default function reducer(state = {
  simulationResults: [],
  simulatorItems: [],
  sortDirection: SORT_DIRECTION.ASC,
  deleteSimulator: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  },
  isExpand: false,
  circles: {},
}, action) {
  switch (action.type) {
    case FETCH_FILE_SIMULATION_START: {
      return {
        ...state,
        simulationResults: []
      }
    }
    case FETCH_FILE_SIMULATION_SUCCESS: {
      return {
        ...state,
        simulationResults: action.payload.data,
        meta: {
          currentPage: action.payload.metaCharts.current_page,
          perPage: Number(action.payload.metaCharts.per_page),
          totalItems: action.payload.metaCharts.total,
        },
      }
    }
    case REMOVE_SIMULATOR_ITEMS: {
      return {
        ...state,
        simulationResults: state.simulationResults.filter(item => action.payload.simulatorIds.indexOf(item.id) === -1),
      };
    }
    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_CHART_ITEM: {
      const { chartId, updateData } = action.payload;
      return {
        ...state,
        simulationResults: state.simulationResults.map(item => {
          if (item.id === chartId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
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

    case SET_ACCORDION: {
      return {
        ...state,
        isExpand: action.payload.isExpand
      }
    }
    
    case SHOW_CIRCLE_TILE: {
      const { simulationResultId } = action.payload;
      let newObj = {};
      if (simulationResultId.length > 0) {
        simulationResultId.forEach(id => newObj[id] = true)
      }  else {
        newObj = state.circles[simulationResultId] = true;
      }
      return {
        ...state,
        circles: {...state.circles, ...newObj}
      }
    }

    case HIDE_CIRCLE_TILE: {
      const { simulationResultId } = action.payload;
      if (simulationResultId.length > 0) {
        simulationResultId.forEach(id => delete state.circles[id])
      }  else {
        delete state.circles[simulationResultId]
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