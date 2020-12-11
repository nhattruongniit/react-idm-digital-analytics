import _ from 'lodash';
import { collaborationRequest as request } from '../../../services/request';

export const createProject = (projectName, versionId, description = "N/A") => {
  return request.post(
    '/projects',
    {
      project_name: projectName,
      version_id: versionId,
      description
    },
    {
      showSpinner: true
    }
  );
};

export const updateProject = (projectId, data) => {
  return request.put(`/projects/${projectId}`, data, {
    showSpinner: true
  });
};

export const deleteProjects = ids => {
  return request.delete('/projects/multiple', {
    data: {
      project_ids: ids
    }
  });
};

export const getProjectById = projectId => {
  return request(`/projects/${projectId}`, { showSpinner: true });
};

export const updateDocument = (documentId, data) => {
  return request.put(`/idf-documents/${documentId}`, data, {
    showSpinner: true
  });
};

export const createProjectFromFiles = files => {
  var data = new FormData();
  files.forEach(file => {
    data.append('inp-file[]', file);
  });
  return request.post('/projects/import', data, { showSpinner: true });
};

export const fetchDocuments = async (setLoadingMessage, projectId, current_page, per_page, sortDirection, keyword) => {

  // setLoadingMessage(null);

  let options = {
    order_by: `updated_at:${sortDirection}`,
    page: current_page,
    per_page
  };

  if (keyword) {
    options = {
      ...options,
      q: keyword,
    }
  }

  const response = (await request(`/api/projects/${projectId}/idf-documents`, {
    params: options,
    showSpinner: true
  }));

  if(response.data.data) {
    setLoadingMessage(null);
    return response;
  }

  else if(response.data.wait){
    setLoadingMessage(response.data.message);
    return fetchDocuments(setLoadingMessage, projectId, current_page, per_page, sortDirection, keyword);
  }

  return 
};

export const fetchProjects = (current_page, per_page, sortDirection, keyword) => {
  let options = {
    order_by: `updated_at:${sortDirection}`,
    page: current_page,
    per_page
  };

  if (keyword) {
    options = {
      ...options,
      q: keyword,
    }
  }
  return request('/projects', {
    params: options,
    showSpinner: true
  })
};

export const upgradeProject = (projectId, version) => {
  return request(`/projects/${projectId}/convert/${version}`, {
    showSpinner: true
  });
};

export const createDocument = (document_name, project_id, version_id, template_id) => {
  return request.post(
    `/idf-documents`,
    {
      document_name,
      project_id,
      version_id,
      template_id
    },
    { showSpinner: true }
  );
};

export const createDocumentFromFile = (projectId, files) => {
  var data = new FormData();
  files.forEach(file => {
    data.append('inp-file[]', file);
  });
  data.append('project-id', projectId);
  return request.post('/projects/import', data, { showSpinner: true });
};

export const deleteDocument = documentId => {
  return request.delete(`/idf-documents/${documentId}`);
};

export const cloneDocuments = documentIds => {
  return request.post(
    `/idf-documents/clone`,
    {
      document_ids: documentIds
    },
  );
};

export const cloneProject = projectId => {
  return request.post(`/projects/${projectId}/clone`);
};

export const upgradeDocuments = (
  documentIds,
  versionId,
  projectName,
  targetProjectId
) => {
  const payload = _.pickBy(
    {
      document_ids: documentIds,
      to_version: versionId,
      project_name: projectName,
      project_id: targetProjectId
    },
    _.identity
  );
  return request.post(`/idf-documents/convert`, payload, { showSpinner: true });
};

export const getProjectCollaborators = projectId => request(
  `/projects/${projectId}/collaborators`
)

export const inviteCollaborators = (projectId, emails) => request.post(
  `/projects/${projectId}/invite-collaborators`, {emails}
)

export const resendInvitation = (projectId, collaboratorId) => request.post(
  `/projects/${projectId}/resend-invitation/${collaboratorId}`
)
