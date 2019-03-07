import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  PagenationWrapper,
  PageNumber,
  Button,
} from 'components/community/Pagenation';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class PagenationContainer extends React.Component<IProps> {
  public onSetPage = (e: any) => {
    const { title: page } = e.currentTarget;
    const { PostsActions } = this.props;
    if (!page) return;
    PostsActions.setPageNumber(page);
  }
  public render() {
    const { page, lastPage, loggedInfo, list } = this.props;
    const { displayname } = loggedInfo;
    return (
      <PagenationWrapper list={list}>
      {
        ['운영자'].indexOf(displayname) > -1 ? 
        <Button
          type="write"
          text="글쓰기"
          to="/community/free/write"
        /> : null
      }
      <PageNumber
        page={Number(page)}
        lastPage={Number(lastPage)}
        onSetPage={this.onSetPage}
      />
    </PagenationWrapper>
    );
  }
}

const mapStateToProps = ({ post, user }: IModule) => ({
  page: post.page,
  lastPage: post.lastPage,
  list: post.posts,
  loggedInfo: user.loggedInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PagenationContainer);