import { connect } from 'react-redux';
import Toolbar from '../components/Toolbar';

import { clearSelectedItems } from '../reducers/selectedSimulatorsId';
import { requestDeleteSelectedSimulators, openChart, actSortByDate } from '../reducers/simulationResult';
import { setModalVisibility } from '../reducers/createNewModal';
import { setModalSendView } from '../reducers/sendViewModal';

const mapStateToProps = state => ({
  chartId: state.simulatorResults.selectedSimulatorsId,
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedItems()),
  deleteFn: () => dispatch(requestDeleteSelectedSimulators()),
  setModalFn: () => dispatch(setModalVisibility(true)),
  toggleSortDirection: () => dispatch(actSortByDate()),
  setModalSendViewFn: () => dispatch(setModalSendView(true, [])),
  openChartFn: (projectId, document_id, parent_simulation_id, chartId) => openChart(projectId, document_id, parent_simulation_id, chartId)
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
