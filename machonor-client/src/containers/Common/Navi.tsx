import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { baseActions } from 'store/modules/base';

import { IModule } from 'store/modules';
import {
  NaviMain,
  NaviBar,
  NaviList,
} from 'components/common/Navi';
import {
  Logo,
} from 'components/common/Logo';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

interface IState {
  url: string;
}

class NaviConatainer extends React.Component<IProps, IState> {

  public state = {
    url: '',
  };

  public onFindUrl = () => { // 네비게이션 색깔 관리
    const url = window.location.pathname.split('/')[1];
    this.setState({
      url,
    });
  }

  public onPreventLink = (e: MouseEvent) => {
    e.preventDefault();
  }

  public onControlNav = () => {
    const { BaseActions, visible } = this.props;
    BaseActions.setNaviVisible(!visible);
  }
  public onCloseNav = () => {
    const { BaseActions } = this.props;
    BaseActions.setNaviVisible(false);
  }
  public onReduceNav = () => {
    const { BaseActions } = this.props;
    BaseActions.setNavibar(false);
  }
  public componentDidMount() {
    this.onFindUrl();
  }

  public render() {
    const { onPreventLink } = this;
    const { url } = this.state;
    const { visible, history, width, scrollTop, match, offsetTop } = this.props;
    const pathname = history.location.pathname;
    return (
      <React.Fragment>
        <NaviBar
          onControlNav={this.onControlNav} 
          visible={visible}
          scrollTop={scrollTop}
          pathname={match.path}
          offsetTop={offsetTop}
          onReduceNav={this.onReduceNav}
        />
        <NaviMain 
          visible={visible} 
          pathname={pathname}
          onControlNav={this.onControlNav}
          onCloseNav={this.onCloseNav}
          width={width}
        >
          <Logo 
            mode="Navi"
          />
          <NaviList onPrevent={onPreventLink} url={url}/>
        </NaviMain>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ base, core, post }: IModule) => ({
  width: core.width,
  visible: base.navi,
  scrollTop: core.scrollTop,
  offsetTop: post.navi,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NaviConatainer));