import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

// carbon icon
import EventsIcon from '@carbon/icons-react/es/events/16';
import SchematicsIcon from '@carbon/icons-react/es/schematics/16';
import EditIcon from '@carbon/icons-react/es/edit/16';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import RestartIcon from '@carbon/icons-react/es/restart/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';

// assets
import FolderIcon from 'assets/images/icon-folder.svg';
import PlugIcon from 'assets/images/icon-plug.png';
import IconViews from 'assets/images/icon-views.svg';

function GridItem({ item }) {
  const  history = useHistory();

  const _onOpen = projectId => () => {
    history.push(`project/${projectId}`)
  }

  return (
    <div className="dashboardGrid_item">
      <div className="dashboardGrid_folder">
        <img src={FolderIcon} alt="Folder" />
        <div className="dashboardGrid_quantity">
          <div className="dashboardGrid_quantity_row">
            <div className="dashboardGrid_quantity_title">IDF Docs</div>
            <div className="dashboardGrid_quantity_number">{item.idf_documents}</div>
          </div>
          <div className="dashboardGrid_quantity_row">
            <div className="dashboardGrid_quantity_title">Simulations</div>
            <div className="dashboardGrid_quantity_number">{item.simulations}</div>
          </div>
          <div className="dashboardGrid_quantity_row">
            <div className="dashboardGrid_quantity_title">Graphs</div>
            <div className="dashboardGrid_quantity_number">{item.charts}</div>
          </div>
        </div>
        <div className="dashboardGrid_blur">
          <div className="dashboardGrid_blur_option">
            <ButtonStyled onClick={() => {}}>
              <EditIcon fill="#fff" width={16} height={16} />
            </ButtonStyled>
            <ButtonStyled onClick={() => {}}>
              <CopyFileIcon fill="#fff"  width={16} height={16} />
            </ButtonStyled>
            <ButtonStyled onClick={() => {}}>
              <SchematicsIcon fill="#fff"  width={16} height={16} />
            </ButtonStyled>
            <ButtonStyled onClick={() => {}}>
              <RestartIcon fill="#fff" width={16} height={16} />
            </ButtonStyled>
            <ButtonStyled onClick={() => {}}>
              <EventsIcon fill="#fff" width={16} height={16} />
            </ButtonStyled>
            <ButtonStyled onClick={() => {}}>
              <TrashIcon fill="#fff" width={16} height={16} />
            </ButtonStyled>
          </div>
          <div className="dashboardGrid_blur_view">
            <img src={IconViews} title="Icon" alt="Icon" />
          </div>
          <button type="button" onClick={_onOpen(item.id)}>Open</button>
        </div>
      </div>
      <div className="dashboardGrid_infor">
        <img src={PlugIcon} alt="Plug" />
        <div className="dashboardGrid_description">
          <div className="dashnoardGrid_title">{item.project_name}</div>
          <div className="dashboardGrid_option">
            <div className="dashboardGrid_option_version">v {item.version}</div>
            <div className="dashboardGrid_option_date">
              {dayjs(item.updated_at).format('MMM DD, YYYY HH:mm')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridItem;


const ButtonStyled = styled.div`
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
