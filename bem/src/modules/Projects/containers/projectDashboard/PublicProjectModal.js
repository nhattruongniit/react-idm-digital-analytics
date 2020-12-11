import { connect } from 'react-redux';
import PublicProjectModal from '../../components/PublicProjectModal';

import { setPublicModal, setProjectPublic } from '../../reducers/publicProjectModal';

const mapStateToProps = state => ({
  isShowing: state.projects.publicProjectModal.isShowing,
  sizeModal: state.app.sizeModal
});

const mapDispatchToProps = {
  setPublicModal,
  setProjectPublic
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProjectModal);
