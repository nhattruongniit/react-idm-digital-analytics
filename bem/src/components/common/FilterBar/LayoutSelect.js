import React from 'react';
import styled, { css } from 'styled-components';
import GridIcon from '@carbon/icons-react/es/grid/16';
import ListIcon from '@carbon/icons-react/es/list/32';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ModeStyled = styled.div`
  margin-right: 14px;
  fill: #5a6872;
  cursor: pointer;

  ${props => props.active && css`
    & span svg {
      fill: #5596e6;
    }
  `}

  &:last-child {
    margin-right: 0;
  }
`;

const LayoutSelect = ({
  layoutType,
  setLayoutType,
}) => (
  <Container>
    <ModeStyled
      active={layoutType === DASHBOARD_LAYOUT_TYPE.GRID}
      onClick={() => setLayoutType(DASHBOARD_LAYOUT_TYPE.GRID)}
    >
      <span className="iconSvg"><GridIcon width={18} height={18} /></span>
    </ModeStyled>
    <ModeStyled
      active={layoutType === DASHBOARD_LAYOUT_TYPE.TABLE}
      onClick={() => setLayoutType(DASHBOARD_LAYOUT_TYPE.TABLE)}
    >
      <span className="iconSvg"><ListIcon width={18} height={18} /></span>
    </ModeStyled>
  </Container>
);

export default LayoutSelect;



