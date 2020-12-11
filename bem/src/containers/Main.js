import { connect } from 'react-redux';
import Main from '../components/Main';

const mapStateToProps = state => ({
  showMenu: state.app.showMenu,
  theme: state.app.theme,
});

export default connect(mapStateToProps)(Main);
