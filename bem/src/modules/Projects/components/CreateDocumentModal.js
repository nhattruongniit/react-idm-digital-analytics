import React, { useState } from 'react';
import { Modal, TextInput, Dropdown } from 'carbon-components-react';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';
import ErrorMessage from '../../../components/common/ErrorMessage';

// import {
//   loadTemplates, setTemplates
// } from "actions/templates"

const StyledModal = styled(Modal)`
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
    padding: 0 5px;
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const CreateDocumentModal = ({
  error,
  isWorking,
  isShowing,
  createDocumentFn,
  createDocumentFromFilesFn,
  cancelFn,
  templates, loadTemplates, setTemplates,
  project,
  sizeModal
}) => {
  const [title, setTitle] = useState(null);
  const [files, setFiles] = useState(null);
  const [template, selectTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(false)

  const fileInputRef = React.createRef();

  if(project.version && !loadingTemplates){
      setTimeout(() => {
        setTemplates([])
        setLoadingTemplates(true)
        loadTemplates(project.version)
      }, 0);

  }

  function onRequestSubmit() {
    if (files) {
      const filesArray = [...files];
      createDocumentFromFilesFn(filesArray);
    } else if (title) {
      createDocumentFn(title, template ? template.id : null);
    }
  }

  function onRequestClose() {
    if (isWorking) return;
    cancelFn();
  }

  return (
    <StyledModal
      open={isShowing}
      modalHeading="Create New IDF Document"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-document-modal"
      size={sizeModal}
    >
      <p className="bx--modal-content__text">
      Please enter title and select default
      <br />
      Template for the new IDF Document
      </p>
      <InputWrapper>
        <TextInput
          placeholder="Enter Title"
          labelText="IDF Document title"
          id="document-title"
          onChange={e => setTitle(e.target.value)}
        />
      </InputWrapper>

      {!files && <InputWrapper>
          <Dropdown
              label="Template"
              items={templates}
              selectedItem={template}
              onChange={value => selectTemplate(value.selectedItem)}
              id="select-template-dropdown"
              itemToString={item => item ? item.template_name : ''}
            />
          </InputWrapper>
        }

      <InputWrapper>
        <p>
        or select IDF File from your computer to Import
        </p>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => fileInputRef.current.click()}>
          { files && files.length > 0 ? `${files.length} file(s) selected` : 'Import IDF'}
        </Button>
        <input
          type="file"
          onChange={e => {
            console.log(e.target.files);
            setFiles(e.target.files)
          }}
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

export default CreateDocumentModal;
