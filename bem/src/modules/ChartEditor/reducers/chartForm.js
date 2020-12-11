
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';
import { setChartValues } from './chartValues';
import { toast } from 'react-toastify';
import { saveChart } from './chart';
import fetchValuesForSingleChart from '../helpers/fetchValuesForSingleChart';
import fetchValuesForGroupChart from '../helpers/fetchValuesForGroupChart';
import fetchValuesForPieChart from '../helpers/fetchValuesForPieChart';
import { SET_SIMULATION } from '../../../reducers/simulation';
import moment from 'moment';

const SET_VALUE = 'CHART_EDITOR/CHART_FORM/SET_VALUE';
const CLEAR_FORM = 'CHART_EDITOR/CHART_FORM/CLEAR_FORM';
const SUBMIT_FORM_START = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_START';
const SUBMIT_FORM_SUCCESS = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_SUCCESS';
const SUBMIT_FORM_ERROR = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_ERROR';

export const CHART_FORM_STEPS = ['daily', 'weekly', 'monthly'];
export const BAR_CHART_TYPES = [
  {
    value: 'single',
    label: 'Range',
  },
  {
    value: 'group',
    label: 'Single value'
  }
];
export const PIE_CHART_TYPES = [
  {
    value: 'single',
    label: 'Simple',
  },
  {
    value: 'group',
    label: 'Two Value'
  }
]


export function setValue(fieldName, value) {
  return {
    type: SET_VALUE,
    payload: {
      fieldName,
      value
    }
  };
}

export const clearForm = () => (dispatch, getState) =>  {
  const { minDate, maxDate } = getState().chartEditor.chartForm.values;
  dispatch({
    type: CLEAR_FORM,
    payload: {minDate, maxDate}
  });
}

export function submitForm() {
  return async function(dispatch, getState) {
    const { plottedType } = getState().chartEditor.plottedVariables;
    const chartType = getState().chartEditor.chart.type;
    let fetchValuesFn;
    if (chartType === 'pie') {
      fetchValuesFn = fetchValuesForPieChart;
    } else if (plottedType === 'single') {
      fetchValuesFn = fetchValuesForSingleChart;
    } else {
      fetchValuesFn = fetchValuesForGroupChart;
    }

    try {
      const { chartValues, labels } = await fetchValuesFn(getState);
      dispatch(setChartValues(chartValues, labels));
      dispatch(saveChart());
    } catch (e) {
      toast(e.message);
      dispatch({
        type: SUBMIT_FORM_ERROR,
        payload: {
          message: e.message,
        }
      });
    }
  };
}

const INITIAL_STATE = {
  values: {
    // startDate: new Date(2001, 1, 1),
    // endDate: new Date(2002, 2, 2),
    startDate:'',
    endDate: '',
    maximumDatePoints: 0,
    steps: CHART_FORM_STEPS[0],
    maxDate: '',
    minDate: '',
  },
  isSubmitting: false,
  error: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_VALUE:
      const { fieldName, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [fieldName]: value
        }
      };

    case SET_SIMULATION: {
      const { simulation: { timeframe } } = action.payload;
      if (timeframe && timeframe.length > 0) {
        return {
          ...state,
          values: {
            ...state.values,
            startDate: new Date(timeframe[0].startDate),
            endDate: new Date(timeframe[timeframe.length - 1].endDate),
            minDate: moment(timeframe[0].startDate).format('DD/MM/YYYY'),
            maxDate: moment(timeframe[timeframe.length - 1].endDate).format('DD/MM/YYYY'),
          }
        }
      }
      return state;
    }

    case CLEAR_FORM: {
      return {
        ...state,
        values: {
          ...state.values,
          maxDate: action.payload.maxDate,
          minDate: action.payload.minDate,
        }
      }
      // return INITIAL_STATE
    }

    case SUBMIT_FORM_START: {
      return {
        ...state,
        isSubmitting: true,
        error: ''
      };
    }

    case SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        isSubmitting: false
      };
    }

    case SUBMIT_FORM_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        error: action.payload.message
      };
    }

    case LOAD_INITIAL_STATE: {
      return {
        ...state,
        values: {
          ...state.values,
          maxDate: action.payload.maxDate,
          minDate: action.payload.minDate,
        }
      }
      // return INITIAL_STATE;
    }

    case RESTORE_STATE: {
      if (action.payload.chartForm) {
        return action.payload.chartForm;
      }
      return state;
    }

    default:
      return state;
  }
}
