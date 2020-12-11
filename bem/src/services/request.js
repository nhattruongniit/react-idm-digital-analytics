import axios from 'axios';

const request = axios.create({
  // baseURL: REACT_APP_BACKEND_URL,
  withCredentials: true,
});



let collaborationHeaders = {}
const createCollaborationRequest = ( options = {} ) => axios.create({
	baseURL:         process.env.REACT_APP_COLLABORATION_HUB_API_URL,
	withCredentials: true,
	headers: collaborationHeaders,
	...options
})

const collaborationRequestWrapper = {
	setHeaders: headers => collaborationHeaders = headers,
	get:     (...args)  => createCollaborationRequest().get(...args),
	post:    (...args)  => createCollaborationRequest().post(...args),
	put:     (...args)  => createCollaborationRequest().put(...args),
	delete:  (...args)  => createCollaborationRequest().delete(...args),
}

export const collaborationRequest = Object.assign(collaborationRequestWrapper.get, collaborationRequestWrapper);
export default request;
