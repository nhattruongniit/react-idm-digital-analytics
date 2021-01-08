import axios from 'axios';

export const createProjectFromFiles = files => {
  var data = new FormData();
  files.forEach(file => {
    data.append('inp-file[]', file);
  });
  return axios.post('/projects/import', data, { showSpinner: true });
};
