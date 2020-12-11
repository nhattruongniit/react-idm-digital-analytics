import React, {useEffect} from 'react';



export default function ExternalAddonItem({
  context, addon
}){

	localStorage.setItem(`external-addon-${addon.id}`, JSON.stringify({context, addon}));

	useEffect( () => {

		const listener = e => {
			if( 
				e.key === `external-addon-${addon.id}`
				&& e.newValue.indexOf("ready") === 0
			){
				localStorage.setItem(`external-addon-${addon.id}`, JSON.stringify({context, addon}));
			}
		}


		window.addEventListener("storage", listener);



		return () => {
			// Component removed
		}

	}, []);

  console.log("DEBUG: HANDLE EXTERNAL ADDON ITEM");
  return null;
}

