export const SET_EXPAND_DRAWER = 'APP/SET_EXPAND_DRAWER';
export const SET_LOADING = 'APP/SET_LOADING';
export const SET_LAYOUT_TYPE = 'APP/SET_LAYOUT_TYPE'

export const setExpandDrawer = (isShow) => ({
  type: SET_EXPAND_DRAWER,
  payload: isShow
});

export const setLoading  = isLoading => ({
  type: SET_LOADING,
  payload: isLoading
})

export const setLayoutType  = type => ({
  type: SET_LAYOUT_TYPE,
  payload: type
})
