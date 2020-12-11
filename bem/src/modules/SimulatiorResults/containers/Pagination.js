import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

import { fetchFileSimulation } from '../reducers/simulationResult';

const mapStateToProps = state => ({
  totalItems: state.simulatorResults.simulationResults.meta.totalItems,
  currentPage: state.simulatorResults.simulationResults.meta.currentPage,
  perPage: state.simulatorResults.simulationResults.meta.perPage,
  sortDirection: state.dashboardOptions.sortDirection,
});

const mapDispatchToProps = {
  fetchFileSimulation
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pagination));
