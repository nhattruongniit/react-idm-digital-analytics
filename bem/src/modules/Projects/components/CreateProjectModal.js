/*eslint no-sequences: "off"*/

import React, { useState } from 'react';
import { Modal, Dropdown, TextInput, TextArea } from 'carbon-components-react';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';
import ErrorMessage from '../../../components/common/ErrorMessage';

const StyledModal = styled(Modal)`
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
    padding: 0 5px;
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  letter-spacing: normal;
  text-align: left;
  color: #152935;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const IdfStyled = styled.div`
  display: flex;
  align-items: flex-end;
`

const VerisionStyled = styled.div`
  width: 50%;
  & + & {
    margin-left: 20px;
  }
`

const CreateProjectModal = ({
  error,
  isWorking,
  isShowing,
  createProjectFn,
  createProjectFromFilesFn,
  cancelFn,
  versions,
  sizeModal,
}) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState(null);
  const [files, setFiles] = useState(null);
  const [idfTitle, setIdfTitle] = useState(null);
  const fileInputRef = React.createRef();

  function onRequestSubmit() {
    if (files) {
      const filesArray = [...files];
      createProjectFromFilesFn(filesArray);
    } else if (title, version, description) {
      createProjectFn(title, version.id, idfTitle, description);
    };
  }

  function onRequestClose() {
    if (isWorking) return;
    cancelFn();
  }

  return (
    <StyledModal
      open={isShowing}
      modalHeading="Create New Project"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-project-modal"
      size={sizeModal}
    >
      <p className="bx--modal-content__text">
      Please enter title, description and select IDF version for your new project
      </p>
      <InputWrapper>
        <TextInput
          placeholder="Enter Project Title"
          labelText="Project Title *"
          id="project-title"
          onChange={e => setTitle(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <TextArea
          labelText="Project Description *"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />  
      </InputWrapper>
      
      <InputWrapper>
        <IdfStyled>
          <VerisionStyled>
            <TextInput
              placeholder="Enter Idf Title"
              labelText="IDF Title"
              id="idf-title"
              onChange={e => setIdfTitle(e.target.value)}
            />
          </VerisionStyled>
          <VerisionStyled>
            <Label>Version *</Label>
            <Dropdown
              label="IDF version"
              items={versions}
              selectedItem={version}
              onChange={value => setVersion(value.selectedItem)}
              id="select-version-dropdown"
              itemToString={item => item ? item.version : ''}
            />
          </VerisionStyled>
        </IdfStyled>
      </InputWrapper>
      <InputWrapper>
        <p>
        Or select IDF File from your computer to import and place inside new project
        </p>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => fileInputRef.current.click()}>
          { files && files.length > 0 ? `${files.length} file(s) selected` : 'Import IDF'}
        </Button>
        <input
          type="file"
          onChange={e => setFiles(e.target.files) }
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept=".idf"
          multiple
        />
      </InputWrapper>

      { error &&
        <ErrorMessage>{error}</ErrorMessage>
      }
    </StyledModal>
  );
}

export default CreateProjectModal;
