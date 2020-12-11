import React, { useReducer } from 'react';
import { Portal } from 'react-portal';
import styled, { css } from 'styled-components';
import moment from 'moment';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';
import { Modal } from 'carbon-components-react';

// components
import AddonDetails from './AddonDetails';
import ButtonPrimary from 'components/common/ButtonPrimary';

const Container = styled.div`
  position: relative;
  background-color: var(--cds-ui-01,#f4f4f4);
  box-shadow: 1px 1px 5px #00000029;
  border-radius: 3px;
  color: var(--cds-text-02,#525252);
`;

const BriefContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddonIcon = styled.img`
  margin-right: 15px;
  width: 43px;
  height: 43px;

  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    height: 43px;
    width: 43px;
    padding-bottom: 100%;
    background: #b5b5b5;
  }
`;

const AddonNameContainer = styled.div`
  min-width: 50%;
  margin-right: 15px;
`;

const AddonName = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
`;

const AddonDescription = styled.div`
  font-size: 0.8rem;
`;

const AddonDateContainer = styled.div`
  margin-right: 15px;
`;

const AddonDate = styled.div`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const ShowMoreButton = styled.div`
  color: #5596e6;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  i {
    color: #5596e6;
    margin-left: 5px;
  }

  ${props => props.isOpen && css`
    i {
      transform: scaleY(-1);
    }
  `}
`;

const ButtonStyled = styled.div`
  button {
    padding: 0 12px;
  }
  ${props => props.disabled && css`
      button {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }
  `}
`


const intialState = {
  isShowModal: false,
  isDetailAddon: false,
  idAddon: ''
}

const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_MODAL_CONFIRM':
      return {
        ...state,
        isShowModal: action.payload.isShowModal,
        idAddon: action.payload.idAddon
      }
    case 'TOOGLE_SHOW_DETAIL': 
      return {
        ...state,
        isDetailAddon: action.payload
      }
    default:
      return state;
  }
}

const AddonItem = ({ addon, installAddon }) => {
  const [state, dispatch] =  useReducer(reducers, intialState)

  function toggleOpen() {
    dispatch({
      type: 'TOOGLE_SHOW_DETAIL', 
      payload: !state.isDetailAddon
    })
  }

  const setModalConfirm = (isShowModal, idAddon) => () => {
    dispatch({ 
      type: 'SET_MODAL_CONFIRM', 
      payload: {
        isShowModal,
        idAddon
      }
    })
  }

  const handleSubmit = () => {
    dispatch({ 
      type: 'SET_MODAL_CONFIRM', 
      payload: {
        isShowModal: false,
        idAddon: ''
      }
    })
    installAddon(state.idAddon)
  }

  return (
    <Container>
      <BriefContainer>
        <AddonIcon src={addon.icon} alt=""/>
        <AddonNameContainer>
          <AddonName>{addon.addOnName}</AddonName>
          <AddonDescription>{addon.description}</AddonDescription>
        </AddonNameContainer>
        <AddonDateContainer>
          <AddonDate>{moment(addon.updatedAt).format('DD-MM-YYYY')}</AddonDate>
          <ShowMoreButton onClick={toggleOpen} isOpen={state.isDetailAddon}>
            <span>{state.isDetailAddon ? 'Show More' : 'Show Less'}</span>
            <i className="fa fa-caret-down" />
          </ShowMoreButton>
        </AddonDateContainer>
        <ButtonStyled disabled={addon.installed}>
          <ButtonPrimary title={addon.installed ? "Installed" : "Install"} onClick={setModalConfirm(true, addon.id)}/>
        </ButtonStyled>
        <MenuIcon size={20} />
      </BriefContainer>
      {state.isDetailAddon &&
        <AddonDetails addon={addon} />
      }
      <Portal>
        <Modal
          open={state.isShowModal}
          danger
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          modalHeading="Are you sure?"
          onRequestClose={setModalConfirm(false, '')}
          onRequestSubmit={handleSubmit}
        >
          <p>
            Are you sure want to install Add-on?
          <br />
          <br />
          <strong>Caution:</strong> This cannot be undone.
          </p>
        </Modal>
      </Portal>
    </Container>
  );
};

export default AddonItem;
