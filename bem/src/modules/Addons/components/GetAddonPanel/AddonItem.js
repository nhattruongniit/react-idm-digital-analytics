import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';
import { Button } from 'carbon-components-react';
import AddonDetails from './AddonDetails';

const Container = styled.div`
  position: relative;
  background: #FFFFFF;
  box-shadow: 1px 1px 5px #00000029;
  border-radius: 3px;
  color: #161616;
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

const AddonItem = ({ addon }) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  return (
    <Container>
      <BriefContainer>
        <AddonIcon src={addon.image} alt={addon.name} />
        <AddonNameContainer>
          <AddonName>{addon.name}</AddonName>
          <AddonDescription>{addon.description}</AddonDescription>
        </AddonNameContainer>
        <AddonDateContainer>
          <AddonDate>{moment(addon.releasedAt).format('DD-MM-YYYY')}</AddonDate>
          <ShowMoreButton onClick={toggleOpen} isOpen={isOpen}>
            <span>{isOpen ? 'Show More' : 'Show Less'}</span>
            <i className="fa fa-caret-down" />
          </ShowMoreButton>
        </AddonDateContainer>
        <Button style={{ marginRight: 15 }}>Install</Button>
        <MenuIcon size={20} />
      </BriefContainer>
      {isOpen &&
        <AddonDetails addon={addon} />
      }
    </Container>
  );
};

export default AddonItem;
