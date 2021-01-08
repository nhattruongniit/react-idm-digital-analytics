/*eslint no-sequences: "off"*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from "yup";

// carbon core
import { Modal, Dropdown, TextInput, TextArea, Button } from 'carbon-components-react';

const versions = [
  {
    id:1,
    version:"8.4"
  },
  {
    id:2,
    version:"8.5"
  }
]

const CreateProjectModal = ({ openCreateProject, onCloseModalCreateProject }) => {
  const [files, setFiles] = useState(null);
  const fileInputRef = React.createRef();

  const validationSchema = Yup.object({
    projectTitle: Yup.string().required(),
    description: Yup.string().required(),
    idfTitle: Yup.string().required(),
    idfVersion: Yup.object().shape({
      id: Yup.string(),
      version: Yup.string(),
    }).required()
  });

  const { values, setFieldValue, errors, touched, isSubmitting, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: {
      projectTitle: '',
      description: '',
      idfTitle: '',
      idfVersion: null,
    },
    validationSchema,
    onSubmit: values => {
      onCloseModalCreateProject();
      handleReset();
      if(files) {
        const filesArray = [...files];
        console.log('onSubmit with upload file: ', values)
        return;
      }
      console.log('onSubmit without upload file: ', values)
    }
  })

  return (
    <ModalStyled
      open={openCreateProject}
      size="lg"
      modalHeading="Create New Project"
      onRequestClose={onCloseModalCreateProject}
      onRequestSubmit={handleSubmit}
      primaryButtonText={isSubmitting ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-project-modal"
    >
      <p className="bx--modal-content__text">
        Please enter title, description and select IDF version for your new project
      </p>
      <form onSubmit={handleSubmit}>
        <InputWrapperStyled>
          <TextInput
            placeholder="Enter Project Title"
            labelText="Project Title *"
            name="projectTitle"
            onChange={handleChange}
            value={values.projectTitle}
            invalidText="This field is Required!"
            invalid={Boolean(errors.projectTitle)}
          />
        </InputWrapperStyled>
        <InputWrapperStyled>
          <TextArea
            labelText="Project Description *"
            name="description"
            onChange={handleChange}
            value={values.description}
            invalidText="This field is Required!"
            invalid={Boolean(errors.description)}
          />  
        </InputWrapperStyled>
        <InputWrapperStyled>
          <IdfStyled>
            <VerisionStyled>
              <TextInput
                placeholder="Enter Idf Title"
                labelText="IDF Title"
                name="idfTitle"
                onChange={handleChange}
                value={values.idfTitle}
                invalidText="This field is Required!"
                invalid={Boolean(errors.idfTitle)}
              />
            </VerisionStyled>
            <VerisionStyled>
              <LabelStyled>Version *</LabelStyled>
              <Dropdown
                label="IDF version"
                id="idfVersion"
                items={versions}
                selectedItem={values.idfVersion}
                itemToString={item => item ? item.version : ''}
                name="idfVersion"
                onChange={value => setFieldValue('idfVersion', value.selectedItem)}
              />
              {errors.idfVersion && touched.idfVersion ? <div className="requirement">This field is Required!</div> : ''}
            </VerisionStyled>
          </IdfStyled>
        </InputWrapperStyled>
        <InputWrapperStyled>
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
        </InputWrapperStyled>
      </form>
    </ModalStyled>
  );
}

export default CreateProjectModal;

const ModalStyled = styled(Modal)`
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
  }
`;

const InputWrapperStyled = styled.div`
  margin: 20px 0;
`;

const LabelStyled = styled.label`
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
