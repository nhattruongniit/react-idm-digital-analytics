export const SET_EXPAND_DRAWER = 'APP/SET_EXPAND_DRAWER';
export const SET_LOADING = 'APP/SET_LOADING';

export const setExpandDrawer = (isShow) => ({
  type: SET_EXPAND_DRAWER,
  payload: isShow
});

export const setLoading  = isLoading => ({
  type: SET_LOADING,
  payload: isLoading
})
