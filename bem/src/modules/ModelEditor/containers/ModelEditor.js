/*eslint default-case: "off"*/

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as geomeryApi from '../services/geomeryApi';

import { fetchProject } from 'reducers/project';
import { setupProjectApi } from 'modules/Projects/reducers/projects';

import { setContext, unsetContext } from "reducers/contexts"

import CoveredIframe from "components/common/CoveredIframe";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

let messageHandler;
window.addEventListener('message', payload => {
  messageHandler && messageHandler(payload);
})

const ModelEditor = ({ match, setContext, unsetContext, app, fetchProject, fetchDocuments }) => {

  // const addon_settings = {
  //   project_endpoint: app.apiBaseUrl,
  //   library_endpoint: app.apiBaseUrl,
  //   document_id: match.params.documentId,
  // }

  const { REACT_APP_MODEL_EDITOR_URL } = process.env;
  const iframeRef = useRef();
  const {documentId} = match.params;


  // useEffect(() => () => {
  //   console.log("DEBUG: ", "EDITOR Mounted");
  // }, []);

  useEffect(() => {
    // componentDidMount
    handleIncomingMessage();
    initEditor()
    setContext("3d-editor", { selected: [] });

    return () => {
      // componentWillUnmount
      unsetContext("3d-editor");
    }
  }, [])

  async function initEditor() {

    const project = await fetchProject(match.params.projectId);
    await setupProjectApi(project);

    sendMessage({
      type: 'switch_theme',
      theme: 'light'
    });
    try {
      const res = await geomeryApi.fetchGeometries(match.params.documentId);
      sendMessage({
        type: 'geometry_created',
        objects: res.data,
      });
    } catch (e) {
      console.error(e);
    }

  }

  function sendMessage(message) {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  }

  function handleIncomingMessage(messageType, callback) {
    messageHandler = payload => {
      switch (payload.data.type) {
        // case 'ready':            return initEditor();
        case 'geometry_created': return handleGeometryCreated(payload.data);
        case 'vertex_changed':   return handleVertexChanged(payload.data);
        case 'deleted':          return handleGeometryDeleted(payload.data);
        case 'selected':         return setContext("3d-editor", { selected: payload.data.ids });
      }
    };
  }


  async function handleGeometryCreated(data) {
    try {
      const response = await geomeryApi.createGeometries(documentId, data.objects);

      const geometry_ids = response.data.map( ({id}) => id );

      geomeryApi.applyTemplate(documentId, geometry_ids);

      const switch_map = {};

      for(let object of data.objects) {
        switch_map[object.id] = [];
      }

      for(let object_num of Object.keys(response.data)) {
        let object = response.data[object_num];
        switch_map[object.editor_id] = [ object.id, object.name];
      }

      sendMessage({
        type: 'replace_ids_and_names',
        map:  switch_map
      });

      sendMessage({ type: 'take_snapshot' });
    } catch (e) {
      console.error(e);
      return sendMessage({
        type: 'deleted',
        ids: _.map(data.objects, 'id'),
      });
    }
  }

  async function handleGeometryDeleted(data) {
    await geomeryApi.deleteGeometries(documentId, data.ids);
  }

  async function handleVertexChanged(data) {
    await geomeryApi.updateGeometries(documentId, data.objects);
  }


  return (
    <Container>
      <CoveredIframe
        style={{width: "100%", height: "100%"}}
        title="mode-editor"
        sandbox="allow-scripts allow-same-origin"
        getRef={iframeRef}
        src={REACT_APP_MODEL_EDITOR_URL}
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch=> ({ 
  setContext:    setContext(dispatch),
  unsetContext:  unsetContext(dispatch),
  fetchProject: projectId => fetchProject(projectId)(dispatch),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModelEditor)
);