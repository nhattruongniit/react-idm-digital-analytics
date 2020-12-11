import { combineReducers } from 'redux';
import addonMenu from './addonMenu';
import addons from './addons';
import getAddons from './getAddons';

export default combineReducers({
  addonMenu,
  addons,
  getAddons
});

