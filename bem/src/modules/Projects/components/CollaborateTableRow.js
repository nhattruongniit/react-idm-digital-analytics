import React, {Fragment} from 'react';
import styled, { css } from 'styled-components';

import { DataTable } from 'carbon-components-react';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import EditIcon from '@carbon/icons-react/es/edit/16';
import TrashCanIcon from '@carbon/icons-react/es/trash-can/16';
import ErrorOutlineIcon from '@carbon/icons-react/es/error--outline/16';
import CheckmarkFilledIcon from '@carbon/icons-react/es/checkmark--filled/16';

import PopoverButton from 'components/common/PopoverButton';

const { TableRow, TableCell } = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    text-decoration: none;
    color: #152934;
  }
`;

const RowStyled = styled(TableRow)`
  ${props => props.disabled && css`
    cursor: not-allowed;;
    opacity: .7
  `}
`

const ItemsStyled = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`

const ImgStyled = styled.div`
 img {
   width: 30px;
   height: 30px;
 }
`

const StatusStyled = styled.div`
 font-style: italic;
 text-transform: capitalize;
`

const ResendStyled = styled.div`
 text-decoration: underline;
 color: #0062ff;
 cursor: pointer;
 font-size: 12px;
`

const CollaborateTableRow = ({
  rowData, onResendInvitation, onChangeCollaboratorPermission
}) => {

  return (
    <RowStyled key={rowData.id}>
      <TableCell>
        <ImgStyled>
          <img src={rowData.avatar_url} alt="Avatar" />
        </ImgStyled>
      </TableCell>
      <TableCell>{rowData.first_name} {rowData.last_name}</TableCell>
      <TableCell>{rowData.email}</TableCell>
      <TableCell>
        {rowData.invitation_status === 'accepted' ? (
          <CheckmarkFilledIcon />
        ) : (
          <Fragment>
            <StatusStyled>{rowData.invitation_status}</StatusStyled>
            <ResendStyled onClick={() => {
              onResendInvitation(rowData.projectId, rowData.id)
            }}>Resend</ResendStyled>
          </Fragment>
        )}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            icon={<span className="iconSvg"><MenuIcon /></span>}
            content={
              <TableContextMenu>
                <MenuItem className={ rowData.permission === "read_write" ? "active" : "" } onClick={() => {
                  onChangeCollaboratorPermission(rowData.projectId, rowData.email, "read_write");
                }}>
                  <ItemsStyled onClick={ () => {
                      
                    } 
                  }>
                    <EditIcon />
                    <span>Can Edit</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem className={ rowData.permission === "read_only" ? "active" : "" } onClick={() => {
                  onChangeCollaboratorPermission(rowData.projectId, rowData.email, "read_only");
                }}>
                  <ItemsStyled onClick={ () => {
                      
                    } 
                  }>
                    <ErrorOutlineIcon />
                    <span>View Only</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <ItemsStyled>
                    <TrashCanIcon />
                    <span>Remove</span>
                  </ItemsStyled>
                </MenuItem>
                
              </TableContextMenu>
            }
          />
        </MenuIconContainer>
      </TableCell>
    </RowStyled>
  );
};

export default CollaborateTableRow;
