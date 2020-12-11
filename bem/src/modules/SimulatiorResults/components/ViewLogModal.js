import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Modal } from 'carbon-components-react';

const StyledModal = styled(Modal)`
  .bx--modal-footer {
    display: none;
  }

  .bx--modal-header {
    margin-bottom: 0;
  }
  
  .bx--modal-content {
    margin-bottom: 0;
    height: 100%;
  }

  .bx--modal-container {
    padding: 1.5rem 1rem;
    height: 70%;
  }

  .bx--modal-container .bx--modal-content {
    padding: 0;
    overflow: auto;
  }
`;

const StyledContent = styled.div`
  padding: 0 20px;
`

const ViewLogModal = ({ isShowing, sizeModal, cancelFn, dataFile }) => {
  return (
    <Portal>
      <StyledModal
        open={isShowing}
        onRequestClose={cancelFn}
        size={sizeModal}
      >
        <StyledContent >
          <pre>
           {dataFile}
          </pre>
        </StyledContent>
      </StyledModal>
    </Portal>
  )
};

export default ViewLogModal;
