import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { values } from 'lodash';
import AddonGridManager from '../components/AddonGridManager';
import { closeAddon, setExternalTab } from '../reducers/addons';


import {
  setDockType,
  setDockSize
} from "modules/Dock"

import {
  setCover,
  unsetCover
} from "reducers/iframeCover"


import { saveLayoutState } from "modules/Dock"

const mapStateToProps = state => {

  const activeAddons = values(state.addons.addons.itemById).filter(
    item => item.isActive
  );

  return {

    dockType:    state.dock.type,
    dockSize:    state.dock.size,
    dockColumns: state.dock.columns,
    dockWidth:   state.dock.width,

    layoutState: state.dock.layoutState,
    
  	app:      state.app,
  	contexts: state.contexts,
    activeAddons
  };
};

const mapDispatchToProps = ({
  setDockType,
  setDockSize,
  closeAddon,
  setExternalTab,
  setCover,
  unsetCover,
  saveLayoutState,
});


export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddonGridManager)
);
