import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { SubspaceProvider } from 'react-redux-subspace'
import TopNavigation from '../containers/TopNavigation';
import { DockLayout } from '../modules/Dock';
import { IdfEditor } from '../modules/IdfEditor';
import ProjectsModule from '../modules/Projects';
import path from '../config/path';
import AppContext from "../hooks/appContext"


// import AddonManager from '../modules/Addons/container/AddonManager';
import AddonGridManager from '../modules/Addons/container/AddonGridManager';




// themes
import { ThemeWhite, ThemeGray10, ThemeGray90, ThemeGray100 } from "../themes";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

const IdfEditorModule = (props) => {
  return (
    <SubspaceProvider mapState={(state) => state.idfEditor}>
      <IdfEditor {...props} />
    </SubspaceProvider>
  )
}

const Main = ({ showMenu, theme }) => {
  return (
    <Container>
      {theme === "white" && <ThemeWhite />}
      {theme === "gray10" && <ThemeGray10 />}
      {theme === "gray90" && <ThemeGray90 />}
      {theme === "gray100" && <ThemeGray100 />}
      <AppContext />
      
      <TopNavigation />

      <DockLayout addonManager={ <AddonGridManager /> }>

        

        <Content showMenu={showMenu}>
          <Switch>
            <Route key={1} path={path.idfEditor.classDetail} component={IdfEditorModule}></Route>
            <Route key={1} path={path.idfEditor.allClasses} component={IdfEditorModule}></Route>
            <Route key={1} path={path.dashboard}><ProjectsModule/></Route>
            <Redirect key={1} from='/' to='/dashboard' exact={true} />
          </Switch>
        </Content>

      </DockLayout>

    </Container>
  )
};

export default Main;
