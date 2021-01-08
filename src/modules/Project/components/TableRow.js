import React from 'react';
import dayjs  from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled, { css } from 'styled-components';

// carbon cores
import { TableCell, TableRow } from 'carbon-components-react';
import { Link } from 'react-router-dom';

// carbon icon
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import EventsIcon from '@carbon/icons-react/es/events/16';
import EditIcon from '@carbon/icons-react/es/edit/16';
import CopyIcon from '@carbon/icons-react/es/copy/16';
import UpgradeIcon from '@carbon/icons-react/es/upgrade/16';
import TrashCanIcon from '@carbon/icons-react/es/trash-can/16';
import ViewIcon from '@carbon/icons-react/es/view/16';
import SchematicsIcon from '@carbon/icons-react/es/schematics/16';

// components
import PopoverButton from 'components/PopoverButton';

dayjs.extend(relativeTime);

function DashboardRow({ rowData }) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`project/${rowData.id}`}>
          {rowData.project_name}
        </Link>
      </TableCell>
      <TableCell>{rowData.version}</TableCell>
      <TableCell>{rowData.idf_documents}</TableCell>
      <TableCell>{rowData.simulations}</TableCell>
      <TableCell>{rowData.charts}</TableCell>
      <TableCell>{dayjs().from(dayjs(rowData.updated_at).format('YYYY-DD-MM'))}</TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            autoHidden={false}
            icon={<span className="iconSvg"><MenuIcon /></span>}
            content={
              <TableContextMenuStyled>
                <MenuItemStyled onClick={() => {}}>
                  <ItemsStyled>
                    <EditIcon />
                    <span>Rename</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled onClick={() => {}}>
                  <ItemsStyled>
                    <CopyIcon />
                    <span>Duplicate</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled onClick={() => {}}>
                  <ItemsStyled>
                    <SchematicsIcon />
                    <span>Make public</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled
                  disabled
                  onClick={() => {}}
                >
                  <ItemsStyled>
                    <UpgradeIcon />
                    <span>Upgrade IDF Version</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled onClick={() => {}}>
                  <ItemsStyled>
                    <TrashCanIcon />
                    <span>Delete</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled>
                  <ItemsStyled>
                    <ViewIcon />
                    <span>Go to Views</span>
                  </ItemsStyled>
                </MenuItemStyled>
                <MenuItemStyled onClick={() => {}}>
                  <ItemsStyled>
                    <EventsIcon />
                    <span>Share</span>
                  </ItemsStyled>
                </MenuItemStyled>
              </TableContextMenuStyled>
            }
          />
        </MenuIconContainer>
      </TableCell>
    </TableRow>
    
  )
}

export default DashboardRow;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    text-decoration: none;
    color: #152934;
  }
`;

const ItemsStyled = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`


export const MenuItemStyled = styled.div`
  display: block;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #152934;
  padding: 0 16px;
  cursor: pointer;

  &:hover, &.active {
    background-color: rgba(85, 150, 230, 0.1);
  }

  ${props => props.disabled && css`
    color: #e6e6e657;
    fill: #e6e6e657;
    cursor: not-allowed;
  `}
`;

export const TableContextMenuStyled = styled.div`
  display: block;
  border: 1px solid #dde2e6;
`;
