import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectPage from './projectDashboard/ProjectPage';


const Container = () => {
  return (
    <Switch>
      <Route key={1} path="/dashboard/:projectId"><ProjectDetailsPage /></Route>
      <Route key={1} path="/dashboard"><ProjectPage/></Route>
    </Switch>
  );
}

export default Container;