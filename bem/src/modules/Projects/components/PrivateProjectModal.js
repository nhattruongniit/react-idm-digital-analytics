import React from 'react';
import { Portal } from 'react-portal';
import { Modal } from 'carbon-components-react';

const PrivateProjectModal = ({ isShowing, sizeModal, setPrivateModal, setProjectPrivate }) => (
  <Portal>
    <Modal
      open={isShowing}
      danger
      primaryButtonText="Unpublish"
      secondaryButtonText="Canel"
      modalHeading="Are you sure?"
      onRequestClose={() => setPrivateModal(false, null)}
      onRequestSubmit={setProjectPrivate}
      size={sizeModal}
    >
      <p>
        Selected project will be made private.
      <br />
      <br />
      <strong>Caution:</strong> This cannot be undone.
      </p>
    </Modal>
  </Portal>
);

export default PrivateProjectModal;
