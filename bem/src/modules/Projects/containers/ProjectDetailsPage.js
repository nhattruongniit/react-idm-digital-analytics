import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import DocumentPage from './documentDashboard/DocumentPage';
import ViewPage from 'modules/Views';
import ChartPage from 'modules/Charts';
import { fetchProject } from '../../../reducers/project';
import { fetchDocuments } from 'modules/Projects/reducers/documents';
import { setupProjectApi } from 'modules/Projects/reducers/projects';
import DocumentDetailsPage from './DocumentDetailsPage';
import ModalAddOn from '../../Addons/container/ModalAddOn';

const ProjectDetailsPage = ({
  fetchProject,
  currentPage,
  perPage,
  fetchDocuments, fetchRemoteDocuments,
  match
}) => {
  useEffect(() => {
    if (match.params.projectId) {
      (async()=>{
        const project = await fetchProject(match.params.projectId);
        await setupProjectApi(project);
        // This should be the only initial fetchDocuments call
        fetchDocuments(project.id, currentPage, perPage, 'desc');
      })()
    }
    else {
      setupProjectApi(null);
    }
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/dashboard/:projectId/documents/:documentId"
          component={DocumentDetailsPage}
        />
        <Route
          path="/dashboard/:projectId/documents"
          component={DocumentPage}
        />
        <Route
          path="/dashboard/:projectId/views/:viewId/charts"
          component={ChartPage}
        />
        <Route path="/dashboard/:projectId/views" component={ViewPage} />
      </Switch>
      {/* <GetAddonPanel /> */}
      <ModalAddOn />
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  fetchProject,
  fetchDocuments,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ProjectDetailsPage));
