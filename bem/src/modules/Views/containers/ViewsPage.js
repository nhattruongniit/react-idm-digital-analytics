import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FilterBar from './FilterBar';
import ViewToolbar from './ViewToolbar';
import ViewList from './ViewList';
import DeleteViewModal from './DeleteViewModal';
import CreateViewModal from './CreateViewModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
`;

const ProjectName = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: var(--cds-text-02,#525252);
  margin-bottom: 20px;
`;

const Container = ({ project }) => {
  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <ProjectName><Link to="/dashboard">{project.project_name}</Link> / Views / </ProjectName>
        </React.Fragment>
      )}
      <FilterBar />
      <ViewToolbar />
      <ViewList />
      <DeleteViewModal />
      <CreateViewModal />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
  } = state;

  return {
    project
  };
}

export default connect(mapStateToProps, null)(Container);

