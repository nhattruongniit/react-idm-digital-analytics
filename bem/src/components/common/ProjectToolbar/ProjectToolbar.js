import React from 'react';
import styled from 'styled-components';
import CaretDownIcon from '@carbon/icons-react/es/caret--down/16';
import CaretUpIcon from '@carbon/icons-react/es/caret--up/16';
import FolderAddIcon from '@carbon/icons-react/es/folder--add/16';
import ActionBar from './ActionBar';
import { SORT_DIRECTION } from 'appConstants';

// components
import ButtonPrimary from 'components/common/ButtonPrimary';
import TextDefault from 'components/common/TextDefault';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 48px;
  box-sizing: border-box;
  align-items: center;
`;

const ToggleSortButton = styled.div`
  font-size: 14px;
  line-height: 1.29;
  text-align: left;
  color: #5a6872;
  display: flex;
  align-items: center;
  fill: #3d70b2;
  cursor: pointer;
`;

const ProjectToolbar = (props) => (
  <Container>
    { props.selectedItemCount === 0 &&
      <>
        <ToggleSortButton onClick={props.toggleSortDirection}>
          <TextDefault text="Sort by date" />
          {props.sortDirection === SORT_DIRECTION.ASC ? (
            <span className="iconSvg">
              <CaretDownIcon />
            </span>
            ) : (
            <span className="iconSvg">
              <CaretUpIcon />
            </span>
          )}
        </ToggleSortButton>
        <ButtonPrimary title={props.title} icon={<FolderAddIcon fill="white" />} onClick={props.createNewFn}/>
      </>
    }

    { props.selectedItemCount > 0 &&
      <ActionBar {...props} />
    }
  </Container>
);

export default ProjectToolbar;
