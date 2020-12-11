/*eslint default-case: "off"*/

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import CloseIcon from '@carbon/icons-react/es/close/16';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';
import PopoverButton, {
  PopoverMenuItem
} from '../../../components/common/PopoverButton';

const Container = styled.div`
  position: absolute;
  left: ${props => props.position.left}px;
  top: ${props => props.position.top}px;
`;

const PanelContent = styled.div`
  background: white;
  box-shadow: 0px 0px 10px #00000029;
  display: flex;
  flex-direction: column;
  width: ${props => props.size.width}px;
  height: ${props => props.size.height}px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const PanelTitle = styled.div`
  color: #5596e6;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  cursor: move;
`;

const PanelBody = styled.div`
  position: relative;
  overflow: hidden;
  padding: 10px;
  flex-grow: 1;
`;

const PanelFooter = styled.div`
  padding: 10px;
  background-color: #f4f7fb;
`;

const ActivityStatusContainer = styled.div`
  display: flex;
`;

const StatusCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  margin-right: 5px;
  border-radius: 50%;

  ${props =>
    props.isRunning &&
    css`
      background-color: #8cd211;
    `}
`;

const ResizeControl = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  flex-basis: 7px;
  flex-grow: 0;
  flex-shrink: 0;
  cursor: se-resize;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid #00000045;
  border-bottom: 5px solid #00000045;
`;

const IframeElement = styled.iframe`
  width: 100%;
  height: 100%;
`

const TransformCover = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: transparent;
  display: ${ ({show}) => show ? 'block' : 'none'};
`

const AddonPanel = ({ addon, context, closeAddon }) => {
  const [position, setPosition] = useState({ left: 100, top: 100 });
  const [size, setSize] = useState(addon.size);
  const [isMinimize, setIsMinimize] = useState(false);
  const [heightBeforeMinimize, setHeightBeforeMinimize] = useState(350);

  const [showCover, setCover] = useState(false);

  const { id, url, isRunning } = addon;

  const [initialized, setInitialized] = useState(false);
  const [origin, setOrigin] = useState(null);

  const [iframe, setIframe] = useState(null);

  if(iframe && !iframe.addonMessageListener){
    iframe.addonMessageListener = function ({ data, origin }){
      if(url.indexOf(origin) !== 0) return;
      switch(data.type){
        case "ready":
          iframe.contentWindow.postMessage(context, origin );
          setOrigin(origin);
          setInitialized(true);
          break;
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



  function minimizePanel() {
    setIsMinimize(true);
    setHeightBeforeMinimize(size.height);
    setSize({
      width: size.width,
      height: 38,
    });
  }

  function expandPanel() {
    setIsMinimize(false);
    setSize({
      width: size.width,
      height: heightBeforeMinimize,
    });
  }

  function movePanel(e) {
    if (e.button > 0) return;

    setCover(true);

    const baseX = e.screenX;
    const baseY = e.screenY;
    const winX = position.left;
    const winY = position.top;

    function handleMove(e) {
      const diffX = e.screenX - baseX;
      const diffY = e.screenY - baseY;
      setPosition({
        top: Math.min(
          Math.max(10, winY + diffY),
          window.innerHeight - size.height - 10
        ),
        left: Math.min(
          Math.max(10, winX + diffX),
          window.innerWidth - size.width - 10
        )
      });
    }

    function releaseMove(e) {
      handleMove(e);
      setCover(false);
      document.body.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseup', releaseMove);
      document.body.removeEventListener('mouseleave', releaseMove);
    }

    document.body.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseup', releaseMove);
    document.body.addEventListener('mouseleave', releaseMove);

    handleMove(e);
  }

  function resizePanel(e) {
    if (e.button > 0) return;

    setCover(true);

    const baseX = e.screenX;
    const baseY = e.screenY;
    const winX = size.width;
    const winY = size.height;

    function handleResize(e) {
      const diffX = e.screenX - baseX;
      const diffY = e.screenY - baseY;
      setSize({
        width: Math.max(200, winX + diffX),
        height: Math.max(150, winY + diffY),
      });
    }

    function releaseResize(e) {
      handleResize(e);
      setCover(false);
      document.body.removeEventListener('mousemove', handleResize);
      document.body.removeEventListener('mouseup', releaseResize);
      document.body.removeEventListener('mouseleave', releaseResize);
    }

    document.body.addEventListener('mousemove', handleResize);
    document.body.addEventListener('mouseup', releaseResize);
    document.body.addEventListener('mouseleave', releaseResize);
    handleResize(e);
  }

  return (
    <Portal>
      <TransformCover show={showCover} />
      <Container position={position}>
        <PanelContent size={size}>
          <PanelHeader onMouseDown={movePanel}>
            <CloseButton onClick={() => closePanel()}>
              <CloseIcon />
            </CloseButton>
            <PanelTitle>{addon.name}</PanelTitle>
            <PopoverButton
              icon={<MenuIcon />}
              content={
                <div>
                  <PopoverMenuItem onClick={minimizePanel} disabled={isMinimize}>
                    Minimize
                  </PopoverMenuItem>
                  <PopoverMenuItem onClick={expandPanel}>
                    Expand
                  </PopoverMenuItem>
                  <PopoverMenuItem onClick={() => closePanel()}>
                    Close
                  </PopoverMenuItem>
                </div>
              }
            />
          </PanelHeader>
          {!isMinimize && (
            <>
              <PanelBody>
                <IframeElement src={url} ref={setIframe} />
              </PanelBody>
              <PanelFooter>
                <ActivityStatusContainer>
                  <StatusCircle isRunning={isRunning} />
                  <div>{isRunning ? 'Running' : 'Stopped'}</div>
                </ActivityStatusContainer>
                <ResizeControl onMouseDown={resizePanel} />
              </PanelFooter>
            </>
          )}
        </PanelContent>
      </Container>
    </Portal>
  );
};

export default AddonPanel;
