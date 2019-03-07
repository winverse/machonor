import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import shouldCancel from 'lib/shouldCancel';
import {
  BoardWrapper,
  BoardTop,
  BoardList,
} from 'components/community/Board';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;
interface IOwnProps {
  urlSlug?: string;
}
class FreeBoardContainer extends React.Component<IProps> {

  public getPosts = async () => {
    // ** shouldCancel 이 true 면 함수 끝냄
    if (shouldCancel()) return;
    const { PostsActions, page } = this.props;
    try {
      const category = 'free';
      await PostsActions.getPostList({ category, page });
    } catch (e) {
      console.log(e);
    }
  }
  public componentDidMount() {
    this.getPosts();
  }
  public componentDidUpdate(prevProps: IProps) {
    const { searchMode } = this.props;
    if ((prevProps.page !== this.props.page) && !searchMode) {
      this.getPosts();
    }
    if ((prevProps.title !== this.props.title) && !searchMode) {
      this.getPosts();
    }
  }
  public render() {
    const { list, title } = this.props;
    return (
      <BoardWrapper>
        <BoardTop 
          isNotice={false}
        />
        <BoardList
          list={list}
          title={title}
          isNotice={false}
        />
      </BoardWrapper>
    );
  }
}

const mapStateToProps = ({ post }: IModule, ownProps: IOwnProps) => ({
  list: post.posts,
  title: post.postData.title,
  page: post.page,
  searchMode: post.searchMode,
  urlSlug: ownProps.urlSlug,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FreeBoardContainer));