import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'carbon-components-react';

const Container = styled.div`
  width: 238px;
  font-size: 0.9rem;
  position: relative;
  border-bottom: 2px solid var(--cds-ui-01,#f4f4f4);
  background: var(--cds-ui-01,#f4f4f4) 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 8px var(--cds-ui-01,#f4f4f4);
`;

const Title = styled.div`
  font-weight: bold;
  color: ${props => props.color || '#801C98'};
  margin-bottom: 5px;
`;

const MenuItem = styled.div`
  padding: 8px 11px;
  border-bottom: 1px solid var(--cds-ui-03,#e0e0e0);
  color: var(--cds-text-02,#525252);
  &:last-child {
    border-bottom: none;
  }
`;

const AddonItem = styled.div`
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bx--form-item.bx--checkbox-wrapper {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// function getEditorContext() {
//   const availableContexts = ['3d-editor', 'idf-editor'];
//   const context = availableContexts.find(item => window.location.pathname.indexOf(item) !== -1);
//   return context;
// }

const AddonMenu = ({ addons, sub, toggleAddon, closeAddonMenu, showGetAddons }) => {
  const containerRef = useRef(null);
  // let context = getEditorContext();

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  function handleDocumentClick(e) {
    if (containerRef.current && containerRef.current.contains(e.target) === false) {
      closeAddonMenu();
    }
  }

  function handleShowModalAddOn() {
    showGetAddons(sub);
    closeAddonMenu();
  }

  return (
    <Container ref={containerRef}>
      <MenuItem onClick={handleShowModalAddOn}>Get add-ons...</MenuItem>
      <MenuItem>Manage add-ons...</MenuItem>
      <MenuItem>
        <Title>Installed Add-ons</Title>
        { addons.map( addon => {
            const addon_style = addon.isAvailable ? {} : { opacity: 0.3, pointerEvents: 'none'};
            return <AddonItem key={addon.id} onClick={() => toggleAddon(addon.id)} style={addon_style}>
              <Checkbox
                id={`toggle-addon-${addon.id}`}
                checked={addon.isActive}
                onChange={() => toggleAddon(addon.id)}
                labelText={addon.name}
              />
              <div>{addon.usageStatus}</div>
            </AddonItem>
        }
        )}
      </MenuItem>
    </Container>
  );
};

export default AddonMenu;
