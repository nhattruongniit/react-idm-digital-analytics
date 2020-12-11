/*eslint no-lone-blocks: "off"*/

const SET_ADDON_MENU_VISIBILITY = 'ADDONS/SET_ADDON_MENU_VISIBILITY';

export function toggleAddonMenu() {
  return (dispatch, getState) => {
    const { isShowingMenu } = getState().addons.addonMenu;
    const { items } = getState().addons.addons;
    if (!isShowingMenu) {
      dispatch({ type: SET_ADDON_MENU_VISIBILITY, payload: true });
    } else {
      dispatch({ type: SET_ADDON_MENU_VISIBILITY, payload: false });
    }
  }
}

export function closeAddonMenu() {
  return {
    type: SET_ADDON_MENU_VISIBILITY,
    payload: false,
  }
}

export default function reducer(state = {
  isShowingMenu: false,
}, action) {
  switch (action.type) {
    case SET_ADDON_MENU_VISIBILITY: {
      return {
        ...state,
        isShowingMenu: action.payload,
      };
    };

    default:
      return state;
  }
}