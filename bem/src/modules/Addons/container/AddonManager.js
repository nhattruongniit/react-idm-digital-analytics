import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { values } from 'lodash';
import AddonManager from '../components/AddonManager';
import { closeAddon } from '../reducers/addons';

const mapStateToProps = state => {



  const activeAddons = values(state.addons.addons.itemById).filter(
    item => item.isActive
  );
  return {
  	app:      state.app,
  	contexts: state.contexts,
    activeAddons
  };
};

const mapDispatchToProps = {
  closeAddon
};


export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddonManager)
);
