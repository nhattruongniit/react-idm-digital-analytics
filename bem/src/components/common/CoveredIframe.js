import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';

const IframeElement = styled.iframe`
  width: 100%;
  height: 100%;
  display: block;
`

const CoverDiv = styled.div`
	position: absolute;
	top: 0px; bottom: 0px; left: 0px; right: 0px;
	background-color: transparent;
`

// const Marker = styled.div`
// 	position: absolute;
// 	top: 0px; bottom: 0px; left: 0px; right: 0px;
// 	background-color: blue;	opacity: 0.2;
// `


export default connect(
	state => ({iframeCover: state.iframeCover}),
	dispatch => ({})
)( ({getRef, src, sandbox, iframeCover, ...rest}) => {
	return <div {...rest}>
		<IframeElement ref={getRef} src={src} sandbox={sandbox || null} />
		<CoverDiv style={{display: iframeCover ? 'block' : 'none'}}/>
	</div>
});
