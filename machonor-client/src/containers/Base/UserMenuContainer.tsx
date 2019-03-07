import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import enhanceWithClickOutside from 'react-click-outside';

import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import storage from 'lib/storage';
import { IModule } from 'store/modules';
import {
  UserMenu,
  UserMenuItem,
} from 'components/base/UserMenu';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class UserMenuContainer extends React.Component<IProps> {

  public handleClickOutside = () => {
    const { BaseActions, visible } = this.props;
    if (!visible) return;
    setTimeout(() => {
      BaseActions.setUserMenuVisible(false);
    }, 0);
  }
  public onLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { UserActions } = this.props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }
    storage.remove('loggedInfo');
    window.location.reload();
  }

  public render() {
    const { visible } = this.props;

    if (!visible) return null;
    return (
      <UserMenu>
        <UserMenuItem type="profile">프로필</UserMenuItem>
        <UserMenuItem type="mypage">마이페이지</UserMenuItem>
        <UserMenuItem type="config">정보수정</UserMenuItem>
        <UserMenuItem type="logout" onClick={this.onLogout}>로그아웃</UserMenuItem>
      </UserMenu>
    );
  }
}

const mapStateToProps = ({ base }: IModule) => ({
  visible: base.userMenu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch),
  BaseActions: bindActionCreators(baseActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(UserMenuContainer));