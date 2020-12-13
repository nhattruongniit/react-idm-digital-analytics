import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Loading } from 'carbon-components-react';

// selectors
import { isLoadingSelector } from 'selectors/app.selector';

const DefaultPage = () => {
  
  const isLoading = useSelector(isLoadingSelector);
  return (
    <>
      {isLoading ? (
        <Portal>
          <WrapperStyled>
            <Loading />
          </WrapperStyled>
        </Portal>
      ) : null }
    </>
    
  );
};

export default DefaultPage;

const WrapperStyled = styled.div`
  z-index: 9999;
  .bx--loading-overlay {
    z-index: 9999;
  }
`;
