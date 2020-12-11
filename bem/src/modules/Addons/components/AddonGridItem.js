import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@carbon/icons-react/es/close/16';

import CoveredIframe from "components/common/CoveredIframe";


const CloseBtn = styled.span`
	display: inline-block;
	float: right;
	cursor: pointer;
	font-size: 24px;
`


const GridItem = styled.div`
  background-color: grey;
  border-color: 2px solid black;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  outline: 1px solid black;
  

  & >.addon-grid-item-header{
  	flex-basis: 35px;
  	display: flex;
  	flex-direction: row;
  }

  & > .addon-grid-item-header > .addon-grid-item-title {
  	flex-grow: 1;
  	flex-shrink: 1;
  }

  & > .addon-grid-item-header > .addon-grid-item-controls {
  	flex-grow: 1;
  	flex-shrink: 1;
  	flex-basis: 1px;
  }

  &>.addon-grid-item-header{
  	flex-basis: 35px;
  }



  & > .addon-grid-item-content{
  	flex-shrink: 1;
  	flex-grow:   1;
  }
`

export default ({
	setExternalTab,
	closeAddon,
	context,
	addon,
	gridPosition,
	setCover,
	unsetCover
}) => {


	const [iframe, setIframe]           = useState(null);
	const [initialized, setInitialized] = useState(false);
	const [origin, setOrigin]           = useState(null);

	if(addon.externalTab){

		return null;
	}




	if(iframe && !iframe.addonMessageListener){
	    iframe.addonMessageListener = function ({ data, origin }){
	      if(url.indexOf(origin) !== 0) return;
	      switch(data.type){
	        case "ready":
	          iframe.contentWindow.postMessage(context, origin );
	          setOrigin(origin);
	          setInitialized(true);
	          break;

	         default: return;
	      }

	    };
    	window.addEventListener("message", iframe.addonMessageListener);
 	}

	if(initialized){
		iframe.contentWindow.postMessage( context , origin );
	}

	function closePanel(){
		window.removeEventListener("message", iframe.addonMessageListener);
		setIframe(null);
		setInitialized(false);
		closeAddon(id);
	}

	function openInNewTab(){
		console.log("DEBUG: OPEN IN NEW TAB!!!", setExternalTab);
		setExternalTab(addon.id);
		window.removeEventListener("message", iframe.addonMessageListener);
	}


	const {id, url} = addon

	return <GridItem onClick={unsetCover}>
		<div className="addon-grid-item-header">
			<div className="addon-grid-item-title">Title here</div>
			<div className="addon-grid-item-controls">
				<button 
					onMouseDown={ e => e.stopPropagation() }
					onClick={ e => openInNewTab() }
				><a href={`/addons/${addon.id}`} target="_blank">New Tab</a></button>
				<CloseBtn 
					onClick={ e => closePanel(addon.id)}
					onMouseDown={ e => e.stopPropagation() }

					><CloseIcon /></CloseBtn>
			</div>
		</div>
		<div className="addon-grid-item-content">
			<CoveredIframe src={url} getRef={setIframe} style={{width: "100%", height: "100%"}} />
		</div>
		
	</GridItem>

}



