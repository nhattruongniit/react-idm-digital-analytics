import React from 'react';
import AddonPanel from './AddonPanel';

const AddonManager = ({ activeAddons, closeAddon, contexts, app, match }) => {
	
  return <div>
    { activeAddons.map( addonData => {
      const addon_context = {};
      for(let context_name of addonData.contexts){
      	if(contexts[context_name]){
      		addon_context[context_name] = contexts[context_name]
      	}
      }

      return <AddonPanel 
      	key={addonData.id}
      	closeAddon={closeAddon}
      	context={addon_context}
      	addon={ addonData }
      />
    })}
  </div>
};

export default AddonManager;
