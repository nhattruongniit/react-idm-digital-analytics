import request from 'services/request';
import moment from 'moment';

export function fetchVariables(simulationId, page = 1, perPage = 9999) {
  return request(`/simulations/${simulationId}/variables`, {
    params: {
      page,
      per_page: perPage
    },
    showSpinner: true
  });
}

export function getSimulationById(simulationId) {
  return request(`/simulations/${simulationId}`, {
    showSpinner: true
  });
}

export function getVariableValues(simulationId, variableId, startDate, endDate) {
  return request(`/simulations/${simulationId}/variables/${variableId}`, {
    showSpinner: true,
    params: {
      from: startDate &&  moment(startDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      to: endDate && moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    }
  });
}
