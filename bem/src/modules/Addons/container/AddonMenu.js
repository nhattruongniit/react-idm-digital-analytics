import { connect } from 'react-redux';
import AddonMenu from '../components/AddonMenu';
import { toggleAddon } from '../reducers/addons';
import { closeAddonMenu } from '../reducers/addonMenu';
import { showGetAddons } from '../reducers/getAddons';

const mapStateToProps = state => {
  const { sub } = state.auth.user.profile;
  const { items, itemById } = state.addons.addons;
  const addons = items.map(id => itemById[id]);

  addons.forEach( addon => {
    addon.isAvailable = addon.contexts.every( ctx_name => !!state.contexts[ctx_name]);
  });
  
  return {
    addons,
    sub
  };
};

const mapDispathToProps = {
  toggleAddon,
  closeAddonMenu,
  showGetAddons,
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(AddonMenu);
