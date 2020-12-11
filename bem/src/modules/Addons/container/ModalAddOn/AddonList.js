import { connect } from 'react-redux';

import AddonList from '../../components/ModalAddOn/AddonList';
import { installAddon } from '../../reducers/getAddons';

const mapStateToProps = state => {
  const { addons, typeAddon, nameCategory } = state.addons.getAddons;

  return {
    visiableAddOns: addons,
    typeAddon,
    nameCategory
  }
};

const mapDispatchToProps = {
  installAddon
}

export default connect(mapStateToProps, mapDispatchToProps)(AddonList);