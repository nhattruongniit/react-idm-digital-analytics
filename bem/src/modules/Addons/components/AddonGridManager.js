import React from 'react';
import AddonGridItem from './AddonGridItem';
import { Responsive } from "react-grid-layout";
import styled from 'styled-components';
import ExternalAddonItem from "./ExternalAddonItem";

const GridItem = styled.div`
  background-color: grey;
  border-color: 2px solid black;
`








const AddonManager = ({
  activeAddons, closeAddon, setExternalTab, contexts, app, match,
  dockType, dockSize, dockColumns, dockWidth,
  setCover, unsetCover, setDockType,

  layoutState,

  saveLayoutState
 }) => {

  function getBlockProps(props){
    
    /*{
      x: 0,
      y: 0,
      w: 100,
      h: 150,
    }*/

    return props;
  }

  const itemStateByAddonId = {}
  layoutState.forEach( item => { itemStateByAddonId[item.i] = item } )
	
  return <div>
    <div>
      <button onClick={()=>{setDockType("left")}}>Left</button>
      <button onClick={()=>{setDockType("right")}}>Right</button>
      <button onClick={()=>{setDockType("bottom")}}>Bottom</button>
      <button onClick={()=>{setDockType("float")}}>Float</button>
    </div>
    
    <Responsive 
      onDragStart={setCover}
      onDragStop={unsetCover}
      onResizeStart={setCover}
      onResizeStop={unsetCover}
      onDrop={unsetCover}

      onLayoutChange={saveLayoutState}

      className="layout" 

      breakpoints={{
        lg: 1200, 
        md: 996, 
        sm: 768, 
        xs: 480, 
        xxs: 0
      }}

      cols={({
        lg: dockWidth, md: dockWidth, sm: dockWidth, xs: dockWidth, xxs: dockWidth
      })} rowHeight={3} width={dockWidth}>
      

      { activeAddons.map( (addonData, i) => {
        const addon_context = {};
        for(let context_name of addonData.contexts){
          if(contexts[context_name]){
            addon_context[context_name] = contexts[context_name]
          }
        }


        if(addonData.externalTab) return <ExternalAddonItem
          key={addonData.id}
          context={addon_context}
          addon={ addonData }
          closeAddon={closeAddon}
        />;


        return <GridItem
          key={addonData.id}
          data-grid={ getBlockProps(itemStateByAddonId[addonData.id] || ({
            x: 0,
            y: 0,
            w: 500,
            h: 50,
            i: addonData.id.toString()
          }))}
        >
          <AddonGridItem 
            setCover={setCover}
            unsetCover={unsetCover}
            setExternalTab={setExternalTab}
            closeAddon={closeAddon}
            context={addon_context}
            addon={ addonData }
        />
        </GridItem>
      })}
    </Responsive>
  </div>
};

export default AddonManager;
