import { connect } from 'react-redux';
import { requestLogin, verifyLogin } from '../reducers/auth';
import App from '../components/App';

const mapStateToProps = state => ({
  user: state.auth.user,
  initialized: state.app.initialized,
  loading: state.app.loading,
  loading_message: state.app.loading_message
});

const mapDispatchToProps = dispatch => ({
  requestLogin: () => dispatch(requestLogin),
  verifyLogin: () => dispatch(verifyLogin()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);