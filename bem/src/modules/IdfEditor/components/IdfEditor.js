import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import styled from 'styled-components';
import ClassList from '../containers/ClassList';
import Header from '../containers/Header';
import WidthResizer from '../../../components/common/WidthResizer';
import IdfObjects from '../containers/IdfObjects';
import Toolbar from '../containers/Toolbar';
import IdfObjectPagination from '../containers/IdfObjectPagination';

import { setupProjectApi } from 'modules/Projects/reducers/projects';

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;

  .bx--text-input__field-wrapper {
    height: 100%
  }
  button, button:focus {
    outline: 0;
  }
`;

const IdfItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  width: ${props => props.width}px;
  min-width: ${props => props.width}px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.28;
  text-align: left;
  margin-bottom: 15px;
`;

const IdfEditor = ({
  isShowed,
  match,
  setProjectId,
  fetchClassList,
  setActiveClassByClassName,
  className,
  height,
  fontSize,
  fetchProject
}) => {
  const [sideBarWidth, setSideBarWidth] = useState(isShowed ? 350 : 32);
  const { documentId, className: classNameParam, projectId } = match.params;
  useEffect(() => {
    (async () => {
      const project = await fetchProject(projectId);
      await setupProjectApi(project);
      setProjectId(documentId);
      fetchClassList(documentId)
        .then(() => {
          if (classNameParam) {
            setActiveClassByClassName(classNameParam);
          }
        });
      document.title = 'Usonia IDF Editor';
    })();


  }, []);

  useEffect(() => {
    if (className) {
      document.title = `${className} - Usonia IDF Editor`;
    }
  }, [className])

  return (
    <ThemeProvider theme={{ height, fontSize }}>
      <Container>
        <Sidebar width={isShowed ? sideBarWidth : 32}>
          <Header />
          <ClassList />
        </Sidebar>
        <WidthResizer onChange={width => setSideBarWidth(width)} width={isShowed ? sideBarWidth: 32} />
        <IdfItemContainer>
          { className &&
            <Title><span className="bx-text-default">{className}</span></Title>
          }
          <Toolbar />
          <IdfObjects />
          <IdfObjectPagination />
        </IdfItemContainer>
      </Container>
    </ThemeProvider>
    
  );
}

export default IdfEditor;
