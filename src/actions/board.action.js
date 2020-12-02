export const ADD_ADDON = 'BOARD/ADD_ADDON';
export const REMOVE_ADDON = 'BOARD/REMOVE_ADDON';

export const addAddon = (addon) => ({
  type: ADD_ADDON,
  payload: addon
})

export const removeAddon = (addon) => ({
  type: REMOVE_ADDON,
  payload: addon
})
