/*eslint no-useless-computed-key: "off"*/

import idfApi from "services/idf-api"

import request, {collaborationRequest} from 'services/request';
import requestAddon from 'services/requestAddon';
import axios from 'axios';
import { initPusher } from '../services/pusher';
import { 
  requestLogin,
} from './auth';

import { SET_DOCK_STATE } from "modules/Dock"
import { SET_SAVED_ACTIVE_ADDONS } from "modules/Addons/reducers/addons"

import { fetchAddons } from 'modules/Addons/reducers/addons';

import settingsApi from "services/settingsApi";


export const SET_MENU_VISIBILITY = 'SET_MENU_VISIBILITY';
export const SET_LOADING = 'SET_MENSET_LOADING_VISIBILITY';
export const SET_LOADING_MESSAGE = 'SET_MENSET_LOADING_MESSAGE';
export const SET_API_BASE_URL = 'SET_API_BASE_URL';
export const SET_APP_INITIALIZED = 'SET_APP_INITIALIZED';
export const SET_THEME = 'APP/SET_THEME';
export const SET_SIZE_TABLE = 'APP/SET_SIZE_TABLE';
export const SET_ZEBRA_TABLE = 'APP/SET_ZEBRA_TABLE'
export const SET_SIZE_MODAL = 'APP/SET_SIZE_MODAL';
export const SET_MODAL_ERROR = 'APP/SET_MODAL_ERROR';

export const toggleMenu = () => (dispatch, getState) => {
  const showMenu = getState().app.showMenu;
  dispatch({
    type: SET_MENU_VISIBILITY,
    payload: { showMenu: !showMenu }
  });
};

export const setApiBaseUrl = apiBaseUrl => ({
  type: SET_API_BASE_URL,
  payload: { apiBaseUrl }
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: { loading }
});
export const setLoadingMessage = message => ({
  type: SET_LOADING_MESSAGE,
  payload: { message }
});

export const setTheme = theme => ({
  type: SET_THEME,
  payload: { theme }
})

export const setSizeTable = size => ({
  type: SET_SIZE_TABLE,
  payload: { size }
})

export const setZebraTable = useZebraStyles => ({
  type: SET_ZEBRA_TABLE,
  payload: { useZebraStyles }
})

export const setSizeModal = sizeModal => ({
  type: SET_SIZE_MODAL,
  payload: { sizeModal }
})

export const setModalError = isShowing => ({
  type: SET_MODAL_ERROR,
  payload: { isShowing }
})
 
export const applicationInit = () => async (dispatch, getState) => {
  let requestCount = 0;

  dispatch(setLoading(true));

  try{

    const user = await requestLogin(dispatch)

    if(!user){
      return dispatch(setLoadingMessage( "Login Error" ))
    }

    /*
      setApiBaseUrl action is dispatched, by requesrLogin
      but for unknown reasons, axios still makes requests to
      initialy assigned endpoint, so this is the only known
      way to make the request against the right endpoint
    */
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || user.profile.endpoint;
    idfApi.base_url        = process.env.REACT_APP_BACKEND_URL || user.profile.endpoint;



    dispatch(setLoadingMessage( "(1/3) Authorizing IDF API" ));
    axios.defaults.headers.common = { get ["X-Auth-Token"]() {
      return user.access_token;
    }};
    await request.post("/auth/login");


    collaborationRequest.setHeaders({
      get ["X-Auth-Token"]() { return user.access_token; }
    });

    await collaborationRequest("/auth/login")


    // Unset Authorization headers with token
    axios.defaults.headers.common = {};

    dispatch(setLoadingMessage( "(2/3) Initializing Pusher" ))
    await initPusher(dispatch);




    // console.log("DEBUG: get setting model", await settingsApi.get("test-setting-name"));

    // console.log("DEBUG: update setting model", await settingsApi.get("test-setting-name", {ts: Date.now()}));



    let dock_state = (await settingsApi.get("addon-dock-state")).value;
    // if(!dock_state){

    //   dock_state = (await request.post("/settings", {
    //     name: "dock-state-v2",
    //     value: {
    //       viewportWidth:  window.innerWidth,
    //       viewportHeight: window.innerHeight,
    //       type:          "left",
    //       size:           500,
    //       layoutState:    [],
    //     }
    //   })).data.data.value;
    // }

    // dock_state.layoutState = dock_state.layoutState || [];

    const active_addon_ids = (dock_state.layoutState||[]).map( item => parseInt(item.i) );

    dispatch({
      type: SET_SAVED_ACTIVE_ADDONS, ids: active_addon_ids
    });

    dispatch(setLoadingMessage( "(3/3) Initializing Addons" ))
    await fetchAddons()(dispatch);

    dispatch({
      type: SET_DOCK_STATE,
      state: dock_state,
    });



  }
  catch(e){
    // window.history.replaceState(null, '', '/');
    return dispatch(setLoadingMessage("Error: "+ e.message ))
  }





  dispatch({type: SET_APP_INITIALIZED});
  dispatch(setLoading(false));
  dispatch(setLoadingMessage(null))





  request.interceptors.request.use(
    config => {
      if (config.showSpinner) {
        requestCount++;
        dispatch(setLoading(true));
      }
      dispatch(setModalError(false))
      config.baseURL = getState().app.apiBaseUrl;
      return config;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    res => {
      if (res.config.showSpinner) {
        decreaseRequestCount();
      }
      return res;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      dispatch(setModalError(true))
      return Promise.reject(error);
    }
  );

  requestAddon.interceptors.request.use(
    config => {
      if (config.showSpinner) {
        requestCount++;
        dispatch(setLoading(true));
      }
      if (getState().auth.user) {
        const { access_token } = getState().auth.user;
        config.headers.common['Authorization'] = `Bearer ${access_token}`;
      }
      return config;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  requestAddon.interceptors.response.use(
    res => {
      if (res.config.showSpinner) {
        decreaseRequestCount();
      }
      return res;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  function decreaseRequestCount() {
    requestCount--;
    if (requestCount === 0) {
      dispatch(setLoading(false));
    }
  }
};

export default function reducer(
  state = {
    initialized: false,
    showMenu: true,
    loading: false,
    loading_message: null,
    apiBaseUrl: null,
    theme: 'white',
    sizeTable: 'normal',
    useZebraStyles: false,
    sizeModal: 'lg',
    showModalError: false
  },
  action
) {
  switch (action.type) {
    case SET_MENU_VISIBILITY:
      return {
        ...state,
        showMenu: action.payload.showMenu
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    case SET_LOADING_MESSAGE:
      return {
        ...state,
        loading_message: action.payload.message
      };
    case SET_APP_INITIALIZED:
      return {
        ...state,
        initialized: true
      };
    case SET_API_BASE_URL: {
      return {
        ...state,
        apiBaseUrl: action.payload.apiBaseUrl
      };
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      }
    }
    case SET_SIZE_TABLE: {
      return {
        ...state,
        sizeTable: action.payload.size
      }
    }
    case SET_ZEBRA_TABLE: {
      return {
        ...state,
        useZebraStyles: action.payload.useZebraStyles
      }
    }
    case SET_SIZE_MODAL: {
      return {
        ...state,
        sizeModal: action.payload.sizeModal
      }
    }
    case SET_MODAL_ERROR: {
      return {
        ...state,
        showModalError: action.payload.isShowing
      }
    }

    default:
      return state;
  }
}
