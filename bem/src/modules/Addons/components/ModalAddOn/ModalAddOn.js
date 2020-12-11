import React from 'react';
import { Modal } from 'carbon-components-react';
import styled from "styled-components"

// components
import HeaderAddOn from './HeaderAddOn';
import AddonList from '../../container/ModalAddOn/AddonList';
import TreeAddOn from '../../container/ModalAddOn/TreeAddOn';

const ModalStyled = styled.div`
  .bx--modal-content {
    padding: 20px 0 0 0 !important;
    margin: 0 !important;
  }
  .bx--modal-content:focus {
    outline: 0;
  }
  .bx--modal-content--overflow-indicator {
    display: none;
  }
  .bx--modal-scroll-content>*:last-child {
    padding-bottom: 10px;
  }
  .bx--modal-header__heading {
    button {
      position: absolute;
      top: 0;
      right: 0;
      height: 3rem;
      width: 3rem;
      padding: .75rem;
      border: 2px solid transparent;
      overflow: hidden;
      cursor: pointer;
      background-color: transparent;
      transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }
  }
`

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  height: 530px;
  padding: 3px;
`

const ListAddOnStyled = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
`

const ModalAddOn = ({ isShowing, hideGetAddons }) => {
  return (
    <ModalStyled>
      <Modal
        open={isShowing}
        className="some-class"
        // onRequestClose={hideGetAddons}
        passiveModal
        size="lg"
        modalHeading={<button type="button" onClick={hideGetAddons}>X</button>}
        >
          <HeaderAddOn />
          <ContainerStyled>
            <TreeAddOn />
            <ListAddOnStyled>
              <AddonList />
            </ListAddOnStyled>
          </ContainerStyled>
      </Modal>
    </ModalStyled>
  )
}

export default ModalAddOn;