import { connect } from 'react-redux';
import ViewToolbar from '../components/ViewToolbar';

import { clearSelectedViews } from '../reducers/selectedViewId';
import { setModalVisibility } from '../reducers/createViewModal';
import { requestDeleteSelectedViews, duplicateView, actSortByDate } from '../reducers/views';

const mapStateToProps = state => ({
  selectedItem: state.views.selectedViewIds,
  sortDirection: state.dashboardOptions.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedViews()),
  createNewFn: () => dispatch(setModalVisibility(true)),
  deleteFn: () => dispatch(requestDeleteSelectedViews()),
  toggleSortDirection: () => dispatch(actSortByDate()),
  duplicateViewFn: viewId => dispatch(duplicateView(viewId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar);
