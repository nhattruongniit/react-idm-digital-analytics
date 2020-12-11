import React, { Fragment, useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';

import CollaborateTable from 'components/common/DashboardTable/DashboardTableView';

import { Modal, TextInput, Button } from 'carbon-components-react';
import { validateEmail } from 'helpers/validateInput';

const InputWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  .bx--form-item.bx--text-input-wrapper {
    width: 100%;
    margin-right: 20px;
  }
  button {
    text-decoration: underline;
  }
`;

const TableStyled = styled.div`
  .bx--data-table-container {
    overflow-y: scroll !important;
    min-width: 100%;
    height: 300px;
    table thead tr th:nth-child(4) span, table tbody tr td:nth-child(4) {
      text-align: center;
    }
  }
`

const ErrorStyled = styled.div`
  font-size: 12p !important;
  margin-bottom: 10px;
  color: #f00;
`

const CollaborateProjectModal = ({ 
  isShowing, sizeModal, setModalCollaborate, 
  projectId, 

  loadProject, loadCollaborators, resetCollaborationData,
  onInviteCollaborators,
  project, collaborators,
  errorMessage,
  
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  function loadCollaborationData(projectId){
    loadProject(projectId);
    loadCollaborators(projectId);
  }

  useEffect( ()=>{
    if (projectId) loadCollaborationData(projectId)
    else resetCollaborationData()
  }, [projectId]);

  const disable_invitations = !project || project.remote > 0

  const handleSubmit = () => {
    const isEmail = validateEmail(email);
    if(!isEmail) {
      setShowError(true);
      return;
    }

    setShowError(false);
    onInviteCollaborators(projectId, [email])
  }

  return (
    <Portal>
      <Modal
        open={isShowing}
        primaryButtonText="Done"
        secondaryButtonText="Cancel"
        modalHeading="Share with people and groups"
        onRequestClose={() => setModalCollaborate('', false)}
        // onRequestSubmit={confirmFn}
        size={sizeModal}
      >
        { !disable_invitations && <Fragment>
          <p className="bx--modal-content__text">
            Invite your colleagues and friends to collaborate by simply enter their e-mail!
          </p>
          <InputWrapper>
            <TextInput
              placeholder="Add people and groups"
              labelText=""
              id="people-groups"
              invalid={showError}
              invalidText="Email format is required"
              onChange={e => setEmail(e.target.value)}
            />
            <Button size='small' kind='ghost' onClick={handleSubmit}>Add</Button>
          </InputWrapper>          
        </Fragment>}
        { disable_invitations && <ErrorStyled>
          You are not allowed to invite collaborators or to change access permissions on this project
        </ErrorStyled> }
        { errorMessage && <ErrorStyled>{errorMessage}</ErrorStyled> }

        <TableStyled>
          { /* Adding projectId to row items */ }
          <CollaborateTable {...({...props, items: collaborators.map( c => ({...c, projectId}) )})} />
        </TableStyled>
      </Modal>
    </Portal>
  )
};

export default CollaborateProjectModal;
