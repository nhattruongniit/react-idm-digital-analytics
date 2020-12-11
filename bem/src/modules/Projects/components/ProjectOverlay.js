import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import EditIcon from '@carbon/icons-react/es/edit/16';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import RestartIcon from '@carbon/icons-react/es/restart/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import { Checkbox } from 'carbon-components-react';
import Button from 'components/common/Button';
import IconViews from 'assets/images/icon-views.svg';
import EventsIcon from '@carbon/icons-react/es/events/16';
import SchematicsIcon from '@carbon/icons-react/es/schematics/16';

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #3d70b2;
    opacity: 0.85;
  }
`;

const OverlayActionBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 10px;

  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin: 0;
  }
`;

const OverlayButtons = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  fill: white;
  margin-right: 14px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.disabled && css`
    cursor: not-allowed;
    color: #e6e6e657;
    fill: #e6e6e657;
  `}
`;

const OpenProjectButton = styled(Button)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  color: #3d70b2;
`;

const IconViewStyled = styled.div`
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 0;
  cursor: pointer;
`

const Overlay = ({
id,
isSelected,
onToggleSelected,
duplicateFn,
upgradeFn,
deleteFn,
onRequestRename,
maxIdfVersion,
itemVersionId,
setModalCollaborate,
setPrivateModal,
setPublicModal,
isPublic
}) => {

  const handleShowPrivateModal = () => {
    setPrivateModal(true, id)
  }

  const handleShowPublicModal = () => {
    setPublicModal(true, id)
  }

  return (
    <OverlayContainer>
      <OverlayActionBar>
        <Checkbox id={`checkbox_${id}`} labelText="" checked={isSelected} hideLabel onChange={() => {
          onToggleSelected(id);
        }} />
        <OverlayButtons>
          <ButtonWrapper onClick={onRequestRename}>
            <EditIcon fill="#fff" width={16} height={16} />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => duplicateFn(id)}>
            <CopyFileIcon fill="#fff"  width={16} height={16} />
          </ButtonWrapper>
          <ButtonWrapper onClick={isPublic > 0 ? handleShowPrivateModal : handleShowPublicModal}>
            <SchematicsIcon fill="#fff"  width={16} height={16} />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => {
            if (itemVersionId < maxIdfVersion) {
              upgradeFn(id);
            }
          }} disabled={itemVersionId >= maxIdfVersion}>
            <RestartIcon fill="#fff" width={16} height={16} />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => setModalCollaborate(id, true)}>
            <EventsIcon fill="#fff" width={16} height={16} />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => deleteFn(id)}>
            <TrashIcon fill="#fff" width={16} height={16} />
          </ButtonWrapper>
        </OverlayButtons>
      </OverlayActionBar>
      <Link to={`/dashboard/${id}/documents`}>
        <OpenProjectButton
          borderRadius="0px"
          border="2px solid #3d70b2"
          padding="1em 2em"
        >
          Open
        </OpenProjectButton>
      </Link>
      <Link to={`/dashboard/${id}/views`}>
        <IconViewStyled>
          <img src={IconViews} title="Icon" alt="Icon" />
        </IconViewStyled>
      </Link>
    </OverlayContainer>
  )
};

export default Overlay;
