import { connect } from 'react-redux';
import TopNavigation from '../components/TopNavigation';
import { toggleMenu, setTheme, setSizeTable, setZebraTable, setSizeModal, setModalError } from '../reducers/app';
import { requestLogout } from '../reducers/auth';
import { toggleAddonMenu } from '../modules/Addons/reducers/addonMenu';
import { setLayoutType } from '../reducers/dashboardOptions';
import { setZebraIdfEditor, setSizeTableIdfEditor } from '../modules/IdfEditor/reducers/controlSize';
import { fetchNotification } from '../reducers/notification';

const mapStateToProps = state => ({
  showMenu: state.app.showMenu,
  showAddonMenu: state.addons.addonMenu.isShowingMenu,
  layoutType: state.dashboardOptions.layoutType,
  sizeTable: state.app.sizeTable,
  theme: state.app.theme,
  sizeModal: state.app.sizeModal,
  notifies: state.notification.notifies,
  showModalError: state.app.showModalError
});

const mapDispatchToProps = {
  toggleMenu,
  requestLogout,
  toggleAddonMenu,
  setLayoutType,
  setTheme,
  setSizeTable,
  setZebraTable,
  setSizeModal,
  setZebraIdfEditor,
  setSizeTableIdfEditor,
  fetchNotification,
  setModalError
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
