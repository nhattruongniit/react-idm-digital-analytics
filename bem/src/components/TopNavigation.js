import React, { Component } from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { matchPath, Link, withRouter } from "react-router-dom";

// carbon 
import { Dropdown, HeaderPanel, Switcher, Checkbox } from "carbon-components-react";
import ChevronDown from "@carbon/icons-react/es/chevron--down/20";
import NotificationIcon from '@carbon/icons-react/es/notification/32';
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import CloseIcon from "@carbon/icons-react/lib/close/20";

// other
import logoImage from "../assets/images/logo.svg";
import { loadVersions } from "../actions/version";
import path from "../config/path";

// components
import AddonMenu from '../modules/Addons/container/AddonMenu';
import PopoverButton from './common/PopoverButton';
import Notification from '../containers/Notification';
import ModalError from './common/ModalError';

const TopNavigationBar = styled.div`
  width: 100%;
  background-color: var(--cds-ui-01,#f4f4f4);
  box-shadow: 0 2px 10px 0 var(--cds-ui-01,#f4f4f4);
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const TopNavigationContainer = styled.div`
  width: 100%;
  flex-basis: 40px; flex-grow: 0; flex-shrink: 0;
  z-index: 999;
`;

const MenuStyled = styled.div`
  width: 100%;
  display: flex;
`

const Logo = styled.img`
  padding-left: 5.5px;
  padding-right: 5.5px;
  width: 39px;
  height: 40px;
  margin-right: 25px;
`;

const Title = styled(Link)`
  position: relative;
  text-decoration: none;
  font-size: 16px;
  font-weight: ${props => (props.active ? 600 : "normal")};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: ${props => (props.active ? "#5596e6" : "var(--cds-text-02,#525252)")};
  margin-right: 35px;
  cursor: pointer;
`;

const DropdownButton = styled(Dropdown)`
  margin-right: 25px;
  span {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.88;
    letter-spacing: normal;
    text-align: left;
  }
  .bx--list-box__menu {
    max-height: 320px;
  }
`;

const LibrariesButton = styled(DropdownButton)`
  width: 145px;
`;

const ActionMenu = styled.div`
  z-index: 2000;
  position: absolute;
  top: 0;
  left: calc(50% - 50px);
  width: 100px;
  height: 34px;
  box-shadow: 0 2px 10px 0 #d9ebfd;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #454658;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionMenuArrow = styled(ChevronDown)`
  transition: transform 0.3s ease;
  transform: scale(1, ${props => props.flipped});
`;

const AddonMenuContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  z-index: 5000;
`;

const OptionStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  ${props => props.isMatch && css`
    width: 100%;
  `}
`

const NotifyStyled = styled.div`
  fill: #5a6872;
  outline: none;
  width: 50px;
  svg {
    width: 27px;
    fill: var(--cds-text-02,#525252);
  }

  input {
    width: 27px;
    height: 32px;
    left: 11px;
  }
  & > div > div {
    right: 0
  }
`

const ButtonStyled = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  height: 100%;
  border: none;
  display: inline-block;
  background-color: transparent;
  text-align: left;
  padding: 10px 0;
  cursor: pointer;
  color: #152935;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--cds-text-02,#525252);
`

const AddonStyled = styled.div`
  position: relative;
  display:inline-block;
  -webkit-text-decoration: none;
  text-decoration: none;
  height: 20px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--cds-text-02,#525252);
  margin-right: 35px;
  cursor: pointer;
`

const SettingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  margin-top: -3px;
  cursor: pointer;
  svg  {
    fill: var(--cds-text-02,#525252);
  }
`

const SwitcherStyled = styled.div`
  ul {
    padding: 0 15px;
  }
  ul li {
    width: 100%;
  }
  ul li a {
    text-decoration: none;
  }

  .space {
    margin: 10px 0;
  }

  .bx--header-panel {
    
  }
`

const BudgetStyled = styled.div`
  position: relative;
  span {
    position: absolute;
    right: -7px;
    top: -9px;
    border-radius: 50%;
    background-color: #fa4d56;
    color: #fff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }
`

class TopNavigation extends Component {
  state = {
    item: null,
    expanded: false,
  };

  componentDidMount() {
    this.props.loadVersions();
    this.props.fetchNotification();
  }

  handleChangeLibraries = e => {
    const { history } = this.props;
    const selectedItem = e.selectedItem;
    const idfEditorPath = path.idfEditor.allClasses
      .replace(":projectId", "library-" + selectedItem.version)
      .replace(":documentId", selectedItem.id);
    history.push(idfEditorPath);
  }; 

  handleChangeTemplates = e => {
    console.log(e);
  };

  matchIdfEditorPath = () => {
    const { history } = this.props;
    if (
      matchPath(history.location.pathname, {
        path: path.idfEditor.classDetail
      }) ||
      matchPath(history.location.pathname, { path: path.idfEditor.allClasses })
    ) {
      return true;
    }
    return false;
  };

  handleDashboard = () => {
    window.location.href = 'https://dashboard.dev.usonia.io/dashboard/applications';
  }

  handleLogout = () => {
    const { requestLogout } = this.props;
    requestLogout();
  }

  onChangeTheme = (e) => {
    const { setTheme } = this.props;
    setTheme(e.selectedItem.id);
  }
 
  onChangeSizeTable = (e) => {
    const { setSizeTable, setSizeTableIdfEditor }  = this.props;
    setSizeTable(e.selectedItem.id);
    setSizeTableIdfEditor(e.selectedItem.id);
  }

  onChangeSizeModal = (e) => {
    const { setSizeModal }  = this.props;
    setSizeModal(e.selectedItem.id)
  }

  onChangeModeGrid = (e) => {
    this.props.setLayoutType(e.selectedItem.id);
  }

  render() {
    const { showMenu, toggleMenu, versions, history, toggleAddonMenu, showAddonMenu, setZebraTable, setZebraIdfEditor, notifies, showModalError, setModalError } = this.props;
    const { item } = this.state;
    const match = matchPath(history.location.pathname, {
      path: '/dashboard/:projectId/documents/:documentId',
    });
    const matchChartEditor = matchPath(history.location.pathname, {
      path: "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/charts/:chartId/editor",
    });

    if(!showMenu){
      return <Portal>
        <ActionMenu onClick={toggleMenu}>
          <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
          <div>Menu</div>
          <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
        </ActionMenu>
      </Portal>
    }


    
    return (
      <TopNavigationContainer>
        {showMenu && (
          <TopNavigationBar>
            <Logo src={logoImage}></Logo>
            <Title
              active={!match ? 1 : 0}
              to={path.dashboard}
            >
              PROJECTS
            </Title>
            {!(match && versions) && (
              <LibrariesButton
                id="LIBRARIES"
                selectedItem={item}
                label="LIBRARIES"
                items={versions}
                itemToString={item => (item ? item.version : "")}
                onChange={this.handleChangeLibraries}
              />
            )}
            {match && (
              <MenuStyled>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/3d-editor"
                  )}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/3d-editor`}
                >
                  3D EDITOR
                </Title>
                <Title
                  active={this.matchIdfEditorPath() ? 1 : 0}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/idf-editor`}
                >
                  IDF EDITOR
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator"
                  ) && !matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/simulation-result"
                  ) && !matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/charts/:chartId/editor"
                  ) ? 1 : 0}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/simulator`}
                >
                  SIMULATIONS & RESULT
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/simulation-result"
                  )}
                  to="#"
                >
                  RESULT
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/views"
                  )}
                  to={`/dashboard/${match.params.projectId}/views`}
                >
                  VIEWS
                </Title>
                {matchChartEditor && (<Title
                  to="#"
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/charts/:chartId/editor"
                  )}
                >
                  CHART EDITOR
                </Title>)}
                <AddonStyled>
                  <div onClick={toggleAddonMenu}>ADD-ONS</div>
                  { showAddonMenu &&
                    <AddonMenuContainer>
                      <AddonMenu />
                    </AddonMenuContainer>
                  }
                </AddonStyled>
              </MenuStyled>
            )}
            <OptionStyled isMatch={!match}>
              <NotifyStyled>
                <PopoverButton
                  icon={
                    <BudgetStyled>
                      {Array.isArray(notifies) && notifies.length > 0 && (
                        <span>{notifies.length >= 100 ? '99+' : notifies.length}</span>
                      )}
                      <NotificationIcon />
                    </BudgetStyled>
                  }
                  content={<Notification/>}
                />
              </NotifyStyled>
              <SettingStyled onClick={() => this.setState({ expanded: !this.state.expanded })}>
                {this.state.expanded ? <CloseIcon width={50} /> : <AppSwitcher20 width={50} /> }
              </SettingStyled>
              <SwitcherStyled>
                <HeaderPanel expanded={this.state.expanded} aria-label="Header Panel">
                  <Switcher aria-label="Switcher Container">
                    <li>
                      <ButtonStyled type="button" onClick={this.handleDashboard}>
                        App Dashboard
                      </ButtonStyled>
                    </li>
                    <li style={{margin: '5px 0'}}></li>
                    <li>
                      <div className="text-themes">Mode Grid</div>
                      <Dropdown
                        ariaLabel="Dropdown"
                        id="carbon-dropdown-mode-grid"
                        items={[
                          {
                            id: "grid",
                            label: "Tile",
                          },
                          {
                            id: "table",
                            label: "Table",
                          },
                        ]}
                        onChange={this.onChangeModeGrid}
                        label="Select Mode Grid"
                        titleText=""
                      />
                    </li>
                    <li className="space"></li>
                    <li>
                      <div className="text-themes">Themes</div>
                      <Dropdown
                        ariaLabel="Dropdown"
                        id="carbon-dropdown-themes"
                        items={[
                          {
                            id: "white",
                            label: "White",
                          },
                          {
                            id: "gray10",
                            label: "Gray 10",
                          },
                          {
                            id: "gray90",
                            label: "Gray 90",
                          },
                          {
                            id: "gray100",
                            label: "Gray 100",
                          },
                        ]}
                        onChange={this.onChangeTheme}
                        label="Select Themes"
                        titleText=""
                      />
                    </li>
                    <li className="space"></li>
                    <li>
                      <div className="text-themes">DataTable</div>
                      <Checkbox
                        className="bx-useZebraTable"
                        id="checkbox-zebra-table"
                        indeterminate={false}
                        labelText="useZebraStyles"
                        onChange={(e) => {
                          setZebraTable(e);
                          setZebraIdfEditor(e);
                        }}
                        wrapperClassName=""
                      />
                      <Dropdown
                        ariaLabel="Dropdown"
                        id="carbon-dropdown-datatable"
                        items={[
                          {
                            id: "compact",
                            label: "Compact",
                          },
                          {
                            id: "short",
                            label: "Short",
                          },
                          {
                            id: "normal",
                            label: "Normal",
                          },
                          {
                            id: "tall",
                            label: "Tall",
                          },
                        ]}
                        onChange={this.onChangeSizeTable}
                        label="Select size"
                        titleText=""
                      />
                    </li>
                    <li className="space"></li>
                    <li>
                      <div className="text-themes">Modal</div>
                      <Dropdown
                        ariaLabel="Dropdown"
                        id="carbon-dropdown-modal"
                        items={[
                          {
                            id: "xs",
                            label: "Xs",
                          },
                          {
                            id: "sm",
                            label: "Sm",
                          },
                          {
                            id: "md",
                            label: "Md",
                          },
                          {
                            id: "lg",
                            label: "Lg",
                          },
                        ]}
                        onChange={this.onChangeSizeModal}
                        label="Select size"
                        titleText=""
                      />
                    </li>
                    <li style={{margin: '5px 0'}}></li>
                    <li>
                      <ButtonStyled type="button" onClick={this.handleLogout}>
                        Logout
                      </ButtonStyled>
                    </li>
                  </Switcher>
                </HeaderPanel>
              </SwitcherStyled>
            </OptionStyled>
          </TopNavigationBar>
        )}
        <Portal>
          <ActionMenu onClick={toggleMenu}>
            <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
            <div>Menu</div>
            <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
          </ActionMenu>
        </Portal>
        <Portal>
          <ModalError showModalError={showModalError} closeModal={setModalError} />
        </Portal>
      </TopNavigationContainer>
    );
  }
}

function mapStateToProps({ version, idfEditor }) {
  return {
    versions: version.list,
    idfEditor
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadVersions: () => {
      dispatch(loadVersions());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavigation));
