import React from 'react';
import styled from 'styled-components';
import { Modal } from 'carbon-components-react';
import { Portal } from 'react-portal';
import TreeView from '../../../../components/common/TreeView/TreeView';
import AddonList from './AddonList';
import PanelHeader from './PanelHeader';

const StyledModal = styled(Modal)`
  @media (min-width: 600px) {
    .bx--modal-container {
      padding: 20px;
      max-width: 95%;
    }
  }

  .bx--modal-content {
    overflow: hidden;
    margin-bottom: 0;
    height: 500px;
    width: 900px;
  }
`;

const ModalContent = styled.div`
  overflow: hidden;
  height: 500px;
`;

const TreeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  height: 100%;
`;

const TreeViewContainer = styled.div`
  min-width: 200px;
  height: 100%;
  overflow: scroll;
`;

const AddonListContainer = styled.div`
  flex-grow: 1;
  margin-left: 10px;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 50px;
`;

const GetAddonPanel = ({
  isShowing,
  categoryTree,
  selectItems,
  closeModal,
  visibleAddons,
}) => {
  return (
    <Portal>
      <StyledModal open={isShowing} onRequestClose={closeModal} passiveModal>
        <ModalContent>
          <PanelHeader />
          <TreeContent>
            <TreeViewContainer>
              <TreeView categoryTree={categoryTree} selectItems={selectItems} />
            </TreeViewContainer>
            <AddonListContainer>
              <AddonList addons={visibleAddons} />
            </AddonListContainer>
          </TreeContent>
        </ModalContent>

      </StyledModal>
    </Portal>
  );
};

export default GetAddonPanel;
