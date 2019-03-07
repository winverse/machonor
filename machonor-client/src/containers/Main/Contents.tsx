import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { baseActions } from 'store/modules/base'; 

import { IModule } from 'store/modules';
import {
  ContentsWrapper,
  BannerImage,
} from 'components/common/Contents';
import { PostList } from 'components/common/Post';
import { Banner } from 'components/main/Contents';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

class Contents extends React.Component<IProps> {
  public render() {
    const { width, NavBarVisible } = this.props;
    return (
      <ContentsWrapper>
        <Banner
          NavBarVisible={NavBarVisible}
          width={width}
        />
        <PostList
          title="가장 핫한 구매중인 정의"
          sort={true}
        />
        <BannerImage />
        <PostList 
          title="최근 올라온 구매중인 정의"
          sort={false}
        />
        <div style={{ height: '100px' }} />
      </ContentsWrapper>
    );
  }
}

const mapStateToProps = ({ core, base }: IModule) => ({
  width: core.width,
  NavBarVisible: base.navibar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
});

export default withRouter(connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Contents));