import { connect } from 'react-redux';
import { requestLogin } from '../../reducers/auth';
import LogoutPage from '../../components/AuthPage/LogoutPage';

const mapDispatchToProps = {
  requestLogin,
};

export default connect(null, mapDispatchToProps)(LogoutPage);
