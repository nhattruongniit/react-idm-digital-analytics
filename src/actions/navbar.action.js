// actions
import { setLoading } from './app.action';

// mockHttp
import * as api from 'services/mockHttp';

export const SET_TREE_ITEM = 'NAVBAR/SET_TREE_ITEM';
export const ADD_TREE_ITEM = 'NAVBAR/ADD_TREE_ITEM';
export const SET_TREE_DATA = 'NAVBAR/SET_TREE_DATA';

export const fetchProjects = projects => async dispatch => {
  const treeData = {};
  projects.forEach(project => {
    const key = `project-${project.id}`;
    const item = {
      key,
      id: project.id,
      type: 'project',
      root: true,
      label: project.project_name,
      items: [],
      canExpand: true
    };
    treeData[key] = item;
  })
  dispatch({
    type: SET_TREE_DATA,
    payload: treeData
  })
}

export const fetchDocuments = documents => async dispatch => {
  const treeData = {};
  documents.forEach(document => {
    const key = `document-${document.id}`;
    const item = {
      key,
      id: document.id,
      type: 'document',
      root: true,
      label: document.document_name,
      items: [],
      canExpand: true
    };
    treeData[key] = item;
  })
  dispatch({
    type: SET_TREE_DATA,
    payload: treeData
  })
}

export const fetchChildItems = (item) => async (dispatch) => {
  const { id, type, key } = item;
  const itemChildren = [];
  const additionTreeData = {};
  const parentData = item;

  if(type === 'project' && item.items.length === 0) {
    dispatch(setLoading(true));
    const documents = await api.fetchDocument(id);
    
    documents.forEach(document => {
      const key = `document-${document.id}`;
      const item = {
        key,
        id: document.id,
        type: 'document',
        label: document.document_name,
        items: [],
        canExpand: true
      };
      itemChildren.push(key)
      additionTreeData[key] = item;
    });
  }

  if(type === 'document' && item.items.length === 0) {
    dispatch(setLoading(true));
    const simulators = await api.fetchSimulator(id);
    
    simulators.forEach(simulator => {
      const key = `simulator-${simulator.id}`;
      const item = {
        key,
        id: simulator.id,
        type: 'simulator',
        label: simulator.simulator_name,
        items: [],
        canExpand: true
      };
      itemChildren.push(key)
      additionTreeData[key] = item;
    })
  }

  parentData.items = parentData.items.concat(itemChildren);

  dispatch({
    type: ADD_TREE_ITEM,
    payload: additionTreeData
  });

  dispatch({
    type: SET_TREE_ITEM,
    payload: {
      key,
      item: parentData
    }
  });

  dispatch(setLoading(false));

}
