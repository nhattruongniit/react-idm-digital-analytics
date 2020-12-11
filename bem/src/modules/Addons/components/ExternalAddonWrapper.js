import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components"

const StyledIframe = styled.iframe`
	width: 100%;
	height: 100%;
`



export default () => {

	const { addonId } = useParams();

	const [initialized, setInitialized] = useState(false);
	const [iframe, setIframe]           = useState(null);
	const [origin, setOrigin]           = useState(null);

	const [context, setContext]         = useState(null);
	const [addon,   setAddon]           = useState(null);


	if(iframe && !iframe.addonMessageListener){
	    iframe.addonMessageListener = function ({ data, origin }){
	      if(addon.url.indexOf(origin) !== 0) return;
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

	useEffect( () => {
		
		localStorage.setItem(`external-addon-${addonId}`, "ready-" + Date.now());


		const listener = e => {
			if( e.key === `external-addon-${addonId}` ){
				const {addon, context} = JSON.parse(e.newValue);
				setContext(context);
				setAddon(addon);
				console.log("DEBUG: GET DATA FROM BEM:::::", {addon, context});
			}
		}

		window.addEventListener("storage", listener);
		
	}, [addonId])




	return <Fragment>
		
		{ addon && <StyledIframe src={addon.url} ref={setIframe} /> }

	</Fragment>
}