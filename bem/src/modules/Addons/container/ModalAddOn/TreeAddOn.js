import { connect } from 'react-redux';

import TreeAddOn from '../../components/ModalAddOn/TreeAddOn';
import { getAddOnByCategory } from '../../reducers/getAddons';

const mapStateToProps = state => {
  const { categoryTree, nameCategory } = state.addons.getAddons;

  return {
    categoryTree,
    nameCategory
  }
};

const mapDispatchToProps = {
  getAddOnByCategory,
};


export default connect(mapStateToProps, mapDispatchToProps)(TreeAddOn);