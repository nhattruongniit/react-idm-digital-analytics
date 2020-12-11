import { connect } from 'react-redux';
import { hideCreateIdfDocumentModal, createDocument, createDocumentFromFiles  } from '../../reducers/createDocumentModal';
import CreateDocumentModal from '../../components/CreateDocumentModal';

import {
	loadTemplates, setTemplates
} from "actions/templates"
  

const mapStateToProps = state => ({
  ...state.projects.createDocumentModal,
  templates: state.templates.list,
  project: state.project,
  sizeModal: state.app.sizeModal
});


const mapDispatchToProps = {
  cancelFn: hideCreateIdfDocumentModal,
  createDocumentFn: createDocument,
  createDocumentFromFilesFn: createDocumentFromFiles,
  loadTemplates, setTemplates
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentModal);
