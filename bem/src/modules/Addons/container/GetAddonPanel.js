import { connect } from 'react-redux';
import GetAddonPanel from '../components/GetAddonPanel';
import { hideGetAddons, setVisibleAddons } from '../reducers/getAddons';

const mapStateToProps = state => {
  const { isShowing, categoryTree, addons, visibleAddonIds } = state.addons.getAddons;
  const visibleAddons = visibleAddonIds.map(id => addons[id]);
  return {
    isShowing,
    categoryTree,
    addons,
    visibleAddons,
  };
};

const mapDispatchToProps = {
  closeModal: hideGetAddons,
  selectItems: setVisibleAddons,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetAddonPanel);
