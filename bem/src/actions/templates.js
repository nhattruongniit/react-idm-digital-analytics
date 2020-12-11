import request from '../services/request';
import { SET_TEMPLATES } from '../reducers/templates';

export const loadTemplates = idf_version => dispatch => request
	.get(`/templates/version/${idf_version}`   )
	.then(  res => setTemplates(res.data.data)(dispatch) )
	.catch( err => console.log(err)            );


export const setTemplates = templates => dispatch => dispatch({
  	type: SET_TEMPLATES,
  	payload: templates
})
