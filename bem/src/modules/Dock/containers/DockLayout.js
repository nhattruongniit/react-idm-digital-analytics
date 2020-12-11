import React, {Fragment} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  setDockType,
  setDockSize,
  togleVisibility
} from "../reducers";

import {
  setCover, unsetCover
} from "reducers/iframeCover"

import { saveState } from "modules/Dock"


const ShowBtnContainer = styled.div`
  flex-basis: 0px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: visible;
  width: 0px;
  z-index: 1000000000;
`

const DockContainer = styled.div`
  height: 100%;
  display: ${ ({dockType}) => {
    switch(dockType){
      case 'left':
      case 'right':
      case 'bottom': 
        return 'flex';
      default: return 'block';
    }
  }};
  ${ ({dockType}) => {
    switch(dockType){
      case 'left':   return 'flex-direction: row;';
      case 'right':  return 'flex-direction: row-reverse;';
      case 'bottom': return 'flex-direction: column-reverse;';
      default:       return '';
    }
  } }
`

const DockLayoutContent = styled.div`
  overflow: auto;
  ${ ({dockType}) => {
    switch(dockType){
      case 'left':   
      case 'right':  
      case 'bottom': 
        return 'flex-grow: 1; flex-shrink: 1;';
      default:       return '';
    }
  } }
    
`

const DockLayoutToolbar = styled.div`
  z-index: 200;
  overflow: auto;
  background-color: white;
  border: 3px solid red;
  padding-bottom: 20px;

  ${ ({dockType}) => {

    switch(dockType){
      case 'left':   
      case 'right':  
      case 'bottom': 
        return `
          flex-grow: 0;
          flex-shrink: 0;
        `;
      default:
        return `
          position: absolute;
          width: 30%;
          height: 30%;
          top: 10%;
          left: 10%;
        `;
    }
  } }
    
`


const DockResizeBand = styled.div`

  background-color: grey;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 5px;

  ${ ({dockType}) => {

    switch(dockType){
      case 'left':   
      case 'right':
        return 'cursor: col-resize;';
      case 'bottom': 
        return 'cursor: row-resize;';
      default:
        return 'display: none;';
    }
  } }

`

const DockLayoutToolbarInner = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
`


const ResizeControls = styled.div`
  position: absolute;
  font-size: 30px;
  text-align: center;
  ${ ({dockType}) => {
      switch(dockType){
        case 'left': 
          return `
            width: 10px;
            height: 100px;
            top: calc(50% - 50px);
            right: 0px;
            cursor: col-resize;
          `; 
        case 'right':
          return `
            width: 10px;
            height: 100px;
            top: calc(50% - 50px);
            left: 0px;
            cursor: col-resize;
          `; 
        case 'bottom': 
          return `
            width: 100px;
            height: 10px;
            left:   calc(50% - 50px);
            top:    0px;
            cursor: row-resize;
          `; 
        default:       return '';
      }

  }}
`


var disableSelection = function(){
  Object.assign(document.body.style, {
    '-moz-user-select':'none',
    '-webkit-user-select':'none',
    'user-select':'none',
    '-ms-user-select':'none'    
  });
  document.body.setAttribute("unselectable", "on");
  document.body.onselectstart = e => false;
};
var enableSelection = function(){
  Object.assign(document.body.style, {
    '-moz-user-select':'auto',
    '-webkit-user-select':'auto',
    'user-select':'auto',
    '-ms-user-select':'auto'
  });
  document.body.removeAttribute("unselectable");
  document.body.onselectstart = null
};



let resizeListenerInitialized = false;
function setResizeListener(dispatch){
  if(!resizeListenerInitialized){
    window.addEventListener("resize", e => dispatch({
      type: "/DOCK/SET_SCREEN_SIZE",
      data: {
        viewportWidth:  window.innerWidth, 
        viewportHeight: window.innerHeight,
      }
    }));
    resizeListenerInitialized = true;
  } 

  return {}
}



export default connect(

  (state) => ({
    dockType:    state.dock.type,
    dockSize:    state.dock.size,
    dockColumns: state.dock.columns,
    dockWidth:   state.dock.width,
    hidden:      state.dock.hidden,
  }),

  (dispatch) => ({
    ...setResizeListener(dispatch),
    setDockType: type => dispatch(setDockType(type)),
    setDockSize: size => dispatch(setDockSize(size)),
    togleVisibility: () => dispatch(togleVisibility()),
    setCover: () => dispatch(setCover()),
    unsetCover: () => dispatch(unsetCover()),
    saveState: () => dispatch(saveState())
  })

)(function DockLayout({
  children, hidden,
  dockType, dockSize, dockColumns, dockWidth,
  setDockType, setDockSize,
  setCover, unsetCover, saveState,
  togleVisibility,

  addonManager
  
}){


  function startDockedResize(e, mods){
    setCover()
    const direction = mods.x ? mods.x : mods.y;
    const base = mods.x ? e.pageX : e.pageY;
    const getDiff = mods.x 
      ? ( e => (e.pageX - base) * direction )
      : ( e => (e.pageY - base) * direction )
    console.log("mods", mods);
    console.log("direction", direction);
    console.log("diff", getDiff(e));



    disableSelection()

    const doResize = e => {
      const diff = getDiff(e);


      setDockSize(dockSize + diff);
    }

    const stopResize = e => {
      unsetCover();
      saveState();
      enableSelection();
      window.removeEventListener("mousemove",    doResize);
      window.removeEventListener("mouseup",      stopResize);
      window.removeEventListener("mouseleave",   stopResize);
    };

    window.addEventListener("mousemove",    doResize);
    window.addEventListener("mouseup",      stopResize);
    window.addEventListener("mouseleave",   stopResize);


  }

  let dockToolbarStyle = {};

  switch(dockType){
    case "left":
    case "right":
    case "bottom":
      dockToolbarStyle = {"flexBasis": dockSize + "px"}; break;
    default: dockToolbarStyle = {display: "none"}; break;
  }

  const hiddenStyle = hidden ? {display: 'none'} : {};




  return <DockContainer dockType={dockType} dockSize={dockSize}>

      <Fragment>

        <DockLayoutToolbar dockType={dockType} dockSize={dockSize} style={{...dockToolbarStyle, ...hiddenStyle }}>
          <DockLayoutToolbarInner>
            <button onClick={togleVisibility}>Hide</button>
            {addonManager}
          </DockLayoutToolbarInner>
        </DockLayoutToolbar>
        
        <DockResizeBand style={hiddenStyle}
          dockType={dockType} 
          onMouseDown={ e => {
            switch(dockType){
              case "left":   return startDockedResize(e, { x:  1, y:  0 });
              case "right":  return startDockedResize(e, { x: -1, y:  0 });
              case "bottom": return startDockedResize(e, { x:  0, y: -1 });

              default: break;
            }
          }} />
        </Fragment>

    {hidden && <ShowBtnContainer><br /><br /><br /><button onClick={togleVisibility}>Show</button></ShowBtnContainer>}

    <DockLayoutContent dockType={dockType}>{children}</DockLayoutContent>
  </DockContainer>
});
