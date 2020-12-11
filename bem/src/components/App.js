import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Main from '../containers/Main';
import Loading from '../components/common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import ExternalAddonWrapper from "modules/Addons/components/ExternalAddonWrapper"

const App = ({  initialized, loading, loading_message }) => {
  return ( <Switch>

  	<Route path="/addons/:addonId">
  		<ExternalAddonWrapper />
  	</Route>
  	
  	<Route path="/">
	    <Fragment>
	      { (loading || loading_message) && ( <Loading message={loading_message}/> ) }
	      { (!loading_message && initialized) && <Main /> }
	    </Fragment>
  	</Route>
  </Switch>
  );
}

export default withRouter(App);
