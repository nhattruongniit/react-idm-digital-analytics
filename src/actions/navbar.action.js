// mockHttp
import { fetchDocument, fetchSimulator } from 'services/mockHttp';

export const SET_TREE_PROJECT = 'NAVBAR/SET_TREE_PROJECT';
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

export const fetchChildItems = (item) => async (dispatch, getState) => {
  const { id, type, key } = item;
  const itemChildren = [];
  const additionTreeData = {};
  const parentData = item;
  console.log('fetchChildItems: ', item);

  if(type === 'project' && item.items.length === 0) {
    const documents = await fetchDocument(item.id);
    
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
    })
  }

  if(type === 'document' && item.items.length === 0) {
    const simulators = await fetchSimulator(item.id);

    console.log('simulators: ', simulators)
    
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
}
