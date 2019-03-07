import * as React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import GlobalStyles from 'styles/globalStyles';

import { coreActions } from 'store/modules/core';
import { Core } from 'containers/Common';
import { Rendered } from 'lib/shouldCancel';
import { IModule } from 'store/modules';
import {
  Explanation,
  Main,
  Buying,
  Judging,
  Completed,
  Reserve,
  Proposal,
  Free,
  Notice,
  Introduce,
  Committe,
  Request,
  Space,
  Post,
  JusticeWrite,
  User,
  FreeWrite,
  FreePost,
  NoticePost,
} from 'pages';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type IProps = StateProps & DispatchProps & RouteComponentProps;

class App extends React.Component<IProps> {
  public render() {
    return(
      <React.Fragment>
        <GlobalStyles />
        <Switch>
          {/* 정의를 산다는 건 */}
          <Route exact={true} path="/explanations" component={Explanation} />

          {/*  정의 프로젝트 */}
          <Route exact={true} path="/main" component={Main} />
          <Route path="/main/buying" component={Buying} />
          <Route path="/main/judging" component={Judging} />
          <Route path="/main/completed" component={Completed} />

          {/* 정의 구매제안 */}
          <Route path="/justice/reserve" component={Reserve} />
          <Route path="/justice/proposal" component={Proposal} />
          <Route path="/justice/write" component={JusticeWrite} />
 
          {/* 커뮤니티 */}
          <Route exact={true} path="/community/free" component={Free} />
          <Route exact={true} path="/community/notice" component={Notice} />
          <Route path="/community/notice/:urlSlug" component={NoticePost}/>
          <Route exact={true} path="/community/free/write" component={FreeWrite}/>
          <Route exact={true} path="/community/free/write/:urlSlug" component={FreeWrite}/>
          <Route path="/community/free/:urlSlug" component={FreePost}/>

          {/* 위원회 */}
          <Route path="/committe/introduce" component={Introduce} />
          <Route exact={true} path="/committe" component={Committe} />
          <Route path="/committe/request" component={Request} />
          <Route path="/committe/space" component={Space} />

          {/* 기타 */}
          <Route path="/@:username/:urlSlug" component={Post}/>
          <Route path="/@:username" component={User}/>
        </Switch>
        <Core />
        <Rendered />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ core }: IModule) => ({
  language: core.language,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  CoreActions: bindActionCreators(coreActions, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));