import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setupProjectApi } from 'modules/Projects/reducers/projects';

import { setFilterKeyword } from "../reducers/simulators";

import FilterBar from './FilterBar';
import SimulatorToolbar from './SimulatorToolbar';
import SimulatorList from './SimulatorList';
import DeleteModal from './DeleteModal';
import ConvertProjectModal from './ConvertProjectModal';
import ViewLogModal from './ViewLogModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
  .bx--data-table-v2 td:nth-child(2) {
    width: 25%;
  }
  .bx--data-table-v2 td:nth-child(5) {
    width: 18%;
    padding: 10px 30px 10px 0;
  }
  .bx--data-table-v2 td  a div {
    width: 100%;
  }
`;

const ProjectName = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: var(--cds-text-02,#525252);
  margin-bottom: 20px;
`;

const Container = ({ project, setFilterKeyword, match }) => {

  // Skip if no project is provided
  if(!project.id) return null;
 
  useEffect(() => {
    (async () => {
      await setupProjectApi(project);
      setFilterKeyword('', match.params.documentId);
    })();
  }, [project.id]);



  
  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <ProjectName><Link to="/dashboard">{project.project_name}</Link> / Simulations / </ProjectName>
          <FilterBar />
          <SimulatorToolbar />
          <SimulatorList />
          <DeleteModal />
          <ConvertProjectModal />
          <ViewLogModal />
        </React.Fragment>
      )}
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
  } = state;

  return {
    project,
  };
}

const mapDispatchToProps = {
  setFilterKeyword
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);

