import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { authActions } from 'store/modules/auth';
import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import { IModule } from 'store/modules';
import { ContentsTop } from 'components/common/Contents';
import { Logo, NaviBarControl } from 'components/common/Logo';
import { RegisterContainer, LoginContainer, TermContainer } from 'containers/Auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class ContentsController extends React.Component<IProps> {

  public onTermModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setTermVisible(true);
  }

  public onLoginModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setLoginVisible(true);
  }
  public onShowUserMenu = () => {
    const { BaseActions, visible } = this.props;
    BaseActions.setUserMenuVisible(!visible);
  }
  public onManagerModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setRegisterVisible(false);
    BaseActions.setLoginVisible(false);
    BaseActions.setTermVisible(false);
  }
  public onShowNav = () => {
    const { BaseActions } = this.props;
    BaseActions.setNaviVisible(true);
  }
  public onShowNavBar = () => {
    const { BaseActions } = this.props;
    BaseActions.setNavibar(true);
  }
  public componentWillUnmount() {
    this.onManagerModal();
  }
  
  public render() {
    const { loggedInfo, logged, naviBar } = this.props;
    return (
      <React.Fragment>
        <Logo mode="Contents" naviBar={naviBar}>
          <NaviBarControl 
            onShowNav={this.onShowNav}
            onShowNavBar={this.onShowNavBar}
          />
        </Logo>
        <ContentsTop 
          loggedInfo={loggedInfo}
          logged={logged}
          onRegister={this.onTermModal}
          onLogin={this.onLoginModal}
          onShowUserMenu={this.onShowUserMenu}
        />
        <TermContainer />
        <RegisterContainer />
        <LoginContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, base }: IModule) => ({
  visible: base.userMenu,
  loggedInfo: user.loggedInfo,
  logged: user.logged,
  naviBar: base.navibar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ContentsController);