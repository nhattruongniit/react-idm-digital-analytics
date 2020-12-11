import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Loading } from 'carbon-components-react';

const Wrapper = styled.div`
  z-index: 9999;
  .bx--loading-overlay {
    z-index: 9999;
  }
`;

const LoadingMessage = styled.p`
	position: fixed;
	top: calc(50% + 50px);
	text-align: center;
	width: 100%;
`

const CustomLoading = ({message}) => console.log("message::", message)||(
  <Portal>
    <Wrapper>
      { message && <LoadingMessage>{message}</LoadingMessage>}
      <Loading />
    </Wrapper>
  </Portal>
);

export default CustomLoading;
