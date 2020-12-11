import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ChevronRight from '@carbon/icons-react/es/chevron--right/16';
import ObjectCount from './ObjectCount';

const Container = styled.div`
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;
`;

// const ChevronIcon = styled(ChevronRight)`
//   margin-right: 4px;
//   transition: all 0.3s ease;
//   width: 20px;
//   height: 20px;
//   align-self: flex-start;
//   margin-top: 3px;

//   ${props => props.isopen && css`
//     transform: rotate(90deg);
//   `}
// `;

const ChevronStyled = styled.div`
  margin-right: 4px;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  align-self: flex-start;
  margin-top: 3px;


  ${props => props.isopen && css`
    svg {
      transform: rotate(90deg);
    }
  `}
`;


const GroupName = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #152935;
  flex-grow: 1;
  word-wrap: break-word;
`;

const ChildrenContainer = styled.div`
  padding-left: 26px;
  padding-bottom: 5px;
`;

const Group = ({
  name,
  children,
  count,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (onSelect) {
        onSelect();
      }
    }
  }

  return (
    <Container>
      <GroupInfoContainer onClick={toggleIsOpen}>
        <ChevronStyled isopen={isOpen}>
          <ChevronRight/>
        </ChevronStyled>
        {/* <ChevronIcon isopen={isOpen} /> */}
        <GroupName>{name}</GroupName>
        { count > 0 &&
          <ObjectCount count={count} />
        }
      </GroupInfoContainer>
      { isOpen && children &&
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
      }
    </Container>
  );
};

export default Group;
