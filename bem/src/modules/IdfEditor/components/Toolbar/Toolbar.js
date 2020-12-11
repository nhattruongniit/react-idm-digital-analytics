import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'carbon-components-react';
import IdfObjectToolbar from '../../containers/Toolbar/IdfObjectToolbar';
import ImportModal from '../../containers/ImportObject/ImportModal';
import ImportIcon from '@carbon/icons-react/es/migrate/20';
// import ControlSize from '../../containers/ControlSize';

import ButtonPrimary from 'components/common/ButtonPrimary';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 48px;

  .bx--search {
    flex: 50%;
  }

`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
  align-items: center;
`;

const ActionButton = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;

  .bx--btn {
    padding: 0 12px;
  }
`;

const IconButton = styled.div`
  cursor: pointer;
  margin-right: 5px;
`;

const StyledSearchbox = styled(Search)`
  .bx--search-input {
    width: 300px;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
  }
`;


const IdfItemToolbar = ({
  hasSelectedObjects,
  setFilterFieldName,
  categories,
  addObject
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (event) => {
    setFilterFieldName(event.target.value);
  }
  const onClose = (event) => {
    setIsOpen(false);
    console.log(event);
  }
  const onSubmit = () => {
    setIsOpen(false);
  }
  const addNew = () => {
    addObject();
  }
  const importData = () => {
    setIsOpen(true);
  }
  return (
    <Container>
      { false === hasSelectedObjects &&
        <React.Fragment>
          <StyledSearchbox placeHolderText="Search" labelText="Search" onChange={onChange} />
          <ActionsContainer>
            {categories && categories.length > 0 && (
              <IconButton>
                <ImportIcon fill="var(--cds-text-02,#525252)" onClick={importData}></ImportIcon>
              </IconButton>
            )}
            <ActionButton>
              {/* <ControlSize /> */}
              <ButtonPrimary title="Add New" onClick={addNew}/>
            </ActionButton>
          </ActionsContainer>
        </React.Fragment>
      }
      <ImportModal open={isOpen} onClose={onClose} onSubmit={onSubmit} />

      { hasSelectedObjects &&
        <IdfObjectToolbar/>
      }

    </Container>
  );
}

export default IdfItemToolbar;
