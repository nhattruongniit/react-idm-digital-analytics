import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';
import ChevronRight from '@carbon/icons-react/es/chevron--right/16';
import ObjectCount from './ObjectCount';

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid var(--cds-ui-04,#8d8d8d);
  cursor: pointer;

  .bx--skeleton__text {
    position: absolute;
    height: 100%;
  }
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


//   ${props => props.$isActive && css`
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
  groupId,
  name,
  isActive,
  onToggle, 
  children, 
  objects
}) => {  
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)
  }, [])

  return (
    <Container>
      {isSkeleton && <SkeletonText />}
      <GroupInfoContainer onClick={() => onToggle(groupId)}>
        {/* <ChevronIcon $isActive={isActive} /> */}
        <ChevronStyled isopen={isActive}>
          <ChevronRight/>
        </ChevronStyled>
        <GroupName><span className="bx-text-default">{name}</span></GroupName>
        { objects > 0 && 
          <ObjectCount count={objects} />            
        }
      </GroupInfoContainer>    
      { isActive && 
        <ChildrenContainer>{children}</ChildrenContainer>
      }    
    </Container>
  );
};

export default Group;
