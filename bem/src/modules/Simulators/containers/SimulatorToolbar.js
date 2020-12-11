import { connect } from 'react-redux';
import SimulatorToolbar from '../components/SimulatorToolbar';

import { clearSelectedItems } from '../reducers/selectedSimulatorsId';
import { requestDeleteSelectedSimulators, downloadSelectedSimulations, actSortByDate } from '../reducers/simulators';
import { setModalConvertSimToProject } from '../reducers/convertProjectModal';

const mapStateToProps = state => ({
  selectedItemCount: state.simulators.selectedSimulatorsId.length,
  sortDirection: state.dashboardOptions.sortDirection,
  selectedSimulatorsId: state.simulators.selectedSimulatorsId,
  simulatorItems: state.simulators.simulators.simulatorItems,
  apiBaseUrl: state.app.apiBaseUrl,
  sizeModal: state.app.sizeModal,
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedItems()),
  deleteFn: () => dispatch(requestDeleteSelectedSimulators()),
  toggleSortDirection: () => dispatch(actSortByDate()),
  downloadFn: apiBaseUrl => dispatch(downloadSelectedSimulations(apiBaseUrl)),
  setModalConvertFn: (simulationId, simulationName, showing) => dispatch(setModalConvertSimToProject(simulationId, simulationName, showing))
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorToolbar);
