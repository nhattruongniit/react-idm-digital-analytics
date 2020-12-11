import { connect } from 'react-redux';

import ModalAddOn from '../../components/ModalAddOn';
import { hideGetAddons } from '../../reducers/getAddons';

const mapStateToProps = state => {
  const { isShowing } = state.addons.getAddons;

  return {
    isShowing,
  }
};

const mapDispatchToProps = {
  hideGetAddons,
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddOn);