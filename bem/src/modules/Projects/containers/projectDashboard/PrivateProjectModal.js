import { connect } from 'react-redux';
import PrivateProjectModal from '../../components/PrivateProjectModal';

import { setPrivateModal, setProjectPrivate } from '../../reducers/privateProjectModal';

const mapStateToProps = state => ({
  isShowing: state.projects.privateProjectModal.isShowing,
  sizeModal: state.app.sizeModal
});

const mapDispatchToProps = {
  setPrivateModal,
  setProjectPrivate
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateProjectModal);
