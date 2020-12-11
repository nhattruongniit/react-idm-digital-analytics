import React from 'react';
import { Portal } from 'react-portal';
import { Modal } from 'carbon-components-react';

const DeleteDocumentModal = ({ showModalError, sizeModal, closeModal }) => (
  <Portal>
    <Modal
      open={showModalError}
      passiveModal
      modalHeading="Error"
      onRequestClose={() => closeModal(false)}
      size={sizeModal}
    >
      <br/>
      <p>
        An error occuurred while communicating with the server.
      </p>
    </Modal>
  </Portal>
);

export default DeleteDocumentModal;
