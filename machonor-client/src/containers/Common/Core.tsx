import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';

import storage from 'lib/storage';

import { coreActions } from 'store/modules/core';
import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';
import { authActions } from 'store/modules/auth';

import { IModule } from 'store/modules';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

interface IState {
  once: boolean;
}

class Core extends React.Component<IProps, IState> {
  public state = {
    once: false,
  };
  constructor(props: IProps) {
    super(props);
    this.setWidth();
  }

  public inititalizeUserinfo = async () => {
    const loggedInfo = storage.get('loggedInfo');
    if (!loggedInfo) return;
    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
      await UserActions.getUserInfo(loggedInfo.displayname);
    } catch (e) {
      const { BaseActions, AuthActions } = this.props;
      alert('로그아웃 에러 발생!!');
      storage.remove('loggedInfo');
      AuthActions.setError({
        form: 'login',
        name: 'message',
        message: '나도 모르는 일이 일어났네요! 다시 로그인 해주세요',
      });
      BaseActions.setLoginVisible(true);
    }
  }

  public moveMain = () => {
    const url = window.location.pathname;
    if (url === '/') {
      window.location.href = '/main';
    }
  }

  public setWidth = () => {
    if (typeof window === 'undefined') return;
    const { CoreActions } = this.props;
    CoreActions.setWidth(window.innerWidth);
    const innerWidth = window.innerWidth;
    if (innerWidth <= 425) {
      const { BaseActions } = this.props;
      BaseActions.setNaviVisible(false);
    } else {
      const { BaseActions } = this.props;
      BaseActions.setNaviVisible(true);
    }
  }

  public reSize = throttle(() => {
    this.setWidth();
  }, 500);
  public initialize = () => {
    let lastTouchEnd = 0;
    window.addEventListener('resize', this.reSize);
    document.addEventListener('touchstart', (e: any) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, false);
    document.addEventListener('touchmove', (event: any) => {
      if (event.scale !== 1) { 
        event.preventDefault(); 
      }
    }, false);
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  public componentDidMount() {
    // this.getLanguage();
    this.moveMain();
    this.initialize();
    this.inititalizeUserinfo();
  }

  public render() {
    return (
      <React.Fragment />
    );
  }
}

const mapStateToProps = ({ base }: IModule) => ({
  navi: base.navi,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  CoreActions: bindActionCreators(coreActions, dispatch),
  BaseActions: bindActionCreators(baseActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Core);