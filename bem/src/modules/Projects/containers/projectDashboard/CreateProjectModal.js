import { connect } from 'react-redux';
import { createProject, setModalVisibility, createProjectFromFiles } from '../../reducers/createProjectModal';
import CreateProjectModal from '../../components/CreateProjectModal';

const mapStateToProps = state => ({
  ...state.projects.createProjectModal,
  versions: state.version.list,
  sizeModal: state.app.sizeModal
});

const mapDispatchToProps = dispatch => ({
  createProjectFn: (name, versionId, idfTitle, description) => dispatch(createProject(name, versionId, idfTitle, description)),
  createProjectFromFilesFn: files => dispatch(createProjectFromFiles(files)),
  cancelFn: () => dispatch(setModalVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectModal);
