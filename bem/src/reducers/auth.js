import { UserManager } from 'oidc-client';
import config from '../config/oidc';
import { setApiBaseUrl, setLoadingMessage } from './app';

const userManager = new UserManager(config);

const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGIN_USER = 'SET_LOGIN_USER';

const setLoginUser = user => ({
  type: SET_LOGIN_USER,
  payload: { user }
});

export const requestLogin = async (dispatch) => {
  let user = null;
  dispatch(setLoadingMessage( "... Logging in ..." ))
  



  if(window.location.pathname.indexOf("/auth/callback") === 0){
    
    /*
      We are here, because we are authorized by SSO service
    */
    dispatch(setLoadingMessage( "... Processing login callback ..." ));
    user = await processLoginCallback()(dispatch);
    if(!user) throw new Error("Login error (processing callback)");
      const uri = localStorage.initialRequest || "/dashboard"
      delete localStorage.initialRequest
      window.location.href=`${window.location.origin}${uri}`
    dispatch(setLoginUser(user));
    dispatch( setApiBaseUrl((user.profile && user.profile.endpoint) ? user.profile.endpoint : process.env.REACT_APP_BACKEND_URL) );
    return user;
  }
  else if( window.location.pathname.indexOf("/auth/logout") === 0 ){
    /*
      We are here because user clicked "Logout"
    */
    return userManager.signinRedirect();
  }
  else {

    user = await userManager.getUser();
    if(user){

      /*
        We are here, because user is successfully authorized by SSO service
      */
      dispatch(setLoginUser(user));
      dispatch(setApiBaseUrl((user.profile && user.profile.endpoint) ? user.profile.endpoint : process.env.REACT_APP_BACKEND_URL) );
      // dispatch(setApiBaseUrl(process.env.REACT_APP_BACKEND_URL));
      if(localStorage.initialRequest){
        const uri = localStorage.initialRequest || "/dashboard"
        delete localStorage.initialRequest
        window.location.href=`${window.location.origin}${uri}`
      }
      return user;
    }

    /*
      We are here bacause user navigated to bem or is refreshing the page
    */
    if(!(await verifyLogin()(dispatch))){
        localStorage.initialRequest = window.location.pathname
        return userManager.signinRedirect();
        // return null
    }

  }

};

export const requestLogout = () => {
  userManager.signoutRedirect();
}

export const verifyLogin = () => async dispatch => {
  const user = await userManager.getUser();
  if (!user) return false;
  if (user.expires_at < new Date().getTime() / 1000) {
    return false;
  }
  return true;
};

export const processLoginCallback = () => async dispatch => {
  return await userManager.signinRedirectCallback();
};

export default function reducer(
  state = {
    user: null
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_USER: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case SET_LOGIN_ERROR: {
      return {
        ...state,
        error: true
      };
    }

    default:
      return state;
  }
}
