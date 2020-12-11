/*eslint no-lone-blocks: "off"*/

import * as addonApi from '../services/addons';
import { filterAllAddons, filterAddonsInstalled, filterMyAddons } from '../helpers';

const SET_IS_SHOWING = 'ADDONS/GET_ADDONS/SET_IS_SHOWING';
const FETCH_AVAILABLE_ADDONS_START = 'ADDONS/GET_ADDONS/FETCH_AVAILABLE_ADDONS_START';
const FETCH_AVAILABLE_ADDONS_SUCCESS = 'ADDONS/GET_ADDONS/FETCH_AVAILABLE_ADDONS_SUCCESS';
const SET_SELECTED_CATEGORY = 'ADDONS/GET_ADDONS/SET_SELECTED_CATEGORY';
const SET_SELECTED_ADDON = 'ADDONS/GET_ADDONS/SET_SELECTED_ADDON';
const REMOVE_SELECTED_ADDON = 'ADDONS/GET_ADDONS/REMOVE_SELECTED_ADDON';
const SET_FILTER_KEYWORD = 'ADDONS/GET_ADDONS/SET_FILTER_KEYWORD';
const SET_SORTING = 'ADDONS/GET_ADDONS/SET_SORTING';
const SET_VISIBLE_ADDONS = 'ADDONS/GET_ADDONS/SET_VISIBLE_ADDONS';
const SELECTED_CATEGORY = 'ADDONS/GET_ADDONS/SELECTED_CATEGORY';
// const INSTALL_ADDONS = 'ADDONS/GET_ADDONS/INSTALL_ADDONS';

export function showGetAddons(userId) {
  return async (dispatch) => {
    dispatch({
      type: SET_IS_SHOWING,
      payload: true,
    });
    dispatch({ type: FETCH_AVAILABLE_ADDONS_START });
    const pms = [
      addonApi.getMyAddons(),
      addonApi.getAddonsInstalled(userId),
      addonApi.getAllAddons(userId)
    ]
    const result = await Promise.all(pms);
    const dataMyAddons = result[0].data.addons;
    const dataAddonsInstalled = result[1].data;
    const dataAllAddons = result[2].data.addons;

    const { categoriesAddonsInstalled, visibleAddonsInstalled } = filterAddonsInstalled(dataAddonsInstalled, 'installed'); // structure data different
    const { categoriesMyAddons, visibleMyAddons } = filterMyAddons(dataMyAddons, 'myAddons'); // structure data same
    const { categoriesAllAddons, visibleAllAddons } = filterAllAddons(dataAllAddons, 'public'); // structure data same

    const addons = {
      installed: visibleAddonsInstalled,
      myAddons: visibleMyAddons,
      public: visibleAllAddons,
    }

    const categoryTree = [
      {
        name: 'Installed',
        type: 'installed',
        items: categoriesAddonsInstalled,
        count: dataAddonsInstalled.length,
      },
      {
        name: 'My add-ons',
        type: 'myAddons',
        items: categoriesMyAddons,
        count: dataMyAddons.length,
      },
      {
        name: 'Public',
        type: 'public',
        items: categoriesAllAddons,
        count: dataAllAddons.length,
      }
    ];

    dispatch({
      type: FETCH_AVAILABLE_ADDONS_SUCCESS,
      payload: {
        categoryTree,
        addons
      },
    });
  }
}

export function hideGetAddons() {
  return {
    type: SET_IS_SHOWING,
    payload: false,
  };
}

export function selectCategory(categoryId, addons) {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_CATEGORY,
      payload: {
        categoryId,
        addons,
      },
    });
    dispatch({
      type: REMOVE_SELECTED_ADDON
    });
  }
}

export function setVisibleAddons(addonIds) {
  return {
    type: SET_VISIBLE_ADDONS,
    payload: addonIds,
  }
}

export function toggleSelectAddon(addonId) {
  return (dispatch, getState) => {
    const { selectedAddon } = getState().addons.getAddons;
    if (!selectedAddon) {
      dispatch({
        type: SET_SELECTED_ADDON,
        payload: addonId,
      });
    } else {
      dispatch({
        type: SET_SELECTED_ADDON,
        payload: addonId,
      });
    }
  }
}

export function setSortBy(sortName, sortValue) {
  return {
    type: SET_SORTING,
    payload: {
      sortName,
      sortValue,
    },
  };
}

export function setFilterKeyword(keyword) {
  return {
    type: SET_FILTER_KEYWORD,
    payload: keyword,
  };
}

export const getAddOnByCategory = (typeAddon, category) => {
  return {
    type: SELECTED_CATEGORY,
    payload: { 
      typeAddon,
      category
     }
  }
}

export const installAddon = (id) => async () => {
  try {
    await addonApi.installAddon(id);
    alert('This add ons install successfully!')
  } catch (e) {
    if(e.response.data) {
      alert(`${e.response.data.error.message}`)
    } else {
      alert("Can't install add on. Please reload page.")
    }
  }
}

export default function reducer(state = {
  categoryTree: [],
  addons: {},
  visibleAddonIds: [],
  isShowing: false,
  selectedCategory: null,
  selectedAddon: null,
  typeAddon: '',
  nameCategory: '',
  sortBy: {
    all: null,
    name: null,
    releasedAt: null,
  },
  filterKeyword: '',
  isShowModalConfirm: false
}, action) {
  switch (action.type) {
    case FETCH_AVAILABLE_ADDONS_START: {
      return {
        ...state,
        categoryTree: [],
        addons: {},
        selectedCategory: null,
        selectedAddon: null,
        sortBy: {},
        filterKeyword: '',
        typeAddon: '',
        nameCategory: '',
        isShowModalConfirm: false
      };
    }

    case FETCH_AVAILABLE_ADDONS_SUCCESS: {
      const { addons, categoryTree } = action.payload;
      return {
        ...state,
        categoryTree,
        addons,
      };
    }

    case SET_IS_SHOWING: {
      return {
        ...state,
        isShowing: action.payload,
      }
    };

    case SET_SELECTED_CATEGORY: {
      const { categoryId, addons } = action.payload;
      return {
        ...state,
        selectedCategory: categoryId,
        addonsFromCategory: addons,
      };
    }

    case SELECTED_CATEGORY: {
      return {
        ...state,
        typeAddon: action.payload.typeAddon,
        nameCategory: action.payload.category
      }
    }

    case SET_SELECTED_ADDON: {
      return {
        ...state,
        selectedAddon: action.payload,
      };
    }

    case SET_SORTING: {
      const { sortName, sortValue } = action.payload;
      return {
        ...state,
        sortBy: {
          ...state.sortBy,
          [sortName]: sortValue,
        },
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload,
      }
    }

    case SET_VISIBLE_ADDONS: {
      return {
        ...state,
        visibleAddonIds: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}