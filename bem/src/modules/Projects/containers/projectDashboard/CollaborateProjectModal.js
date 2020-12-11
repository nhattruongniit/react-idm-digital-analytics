import { connect } from 'react-redux';

import {
  loadProject, loadCollaborators, resetCollaborationData, onInviteCollaborators,
  setModalCollaborate, resendInvitation, changeCollaboratorPermission
} from '../../reducers/collaborateProjectModal';

import CollaborateTableRow from 'modules/Projects/components/CollaborateTableRow';
import CollaborateProjectModal from '../../components/CollaborateProjectModal';

const tableHeaders = [
  {
    key: 'name',
    header: 'Name'
  },
  {
    key: 'email',
    header: 'E-mail',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const mapStateToProps = (state, props) => {

  const { sizeModal } = state.app;
  const {
    isShowing,
    projectId,
    project,
    collaborators,
    errorMessage,
  } = state.projects.collaborateProjectModal;
  const showCheckboxAll = false;

  return {
    projectId,
    project,
    collaborators,
    errorMessage,
    items: collaborators,
    headers: tableHeaders,
    tableRowComponent: CollaborateTableRow,
    selectedIds: [],
    sizeModal,
    showCheckboxAll,
    isShowing
  };

}

// loadProject, loadCollaborators, resetCollaborationData,

const mapDispatchToProps = (dispatch, props) => console.log("debug: PROPS???", props)||({
  // Need to handle some async actions here, so...
  loadProject: loadProject(dispatch),
  loadCollaborators: loadCollaborators(dispatch),
  resetCollaborationData: resetCollaborationData(dispatch),
  onInviteCollaborators: onInviteCollaborators(dispatch),
  onResendInvitation: resendInvitation(dispatch),
  onChangeCollaboratorPermission: changeCollaboratorPermission(dispatch),
  setModalCollaborate: (...args) => dispatch( setModalCollaborate(...args) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaborateProjectModal);
