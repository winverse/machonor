import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  BoardWrapper,
  BoardTop,
  BoardList,
} from 'components/community/Board';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

class BoardContainer extends React.Component<IProps> {
  public getPosts = async () => {
    const { PostsActions } = this.props;
    try {
      const category = 'notice';
      await PostsActions.getPostList({
        category,
        page: 1,
      });
    } catch (e) {
      console.log(e);
    }
  }
  public componentDidMount() {
    this.getPosts();
  }
  public render() {
    const { list, title } = this.props;
    return (
      <BoardWrapper>
        <BoardTop 
          isNotice={true}
        />
        <BoardList
          list={list}
          title={title}
          isNotice={true}
        />
      </BoardWrapper>
    );
  }
}

const mapStateToProps = ({ post }: IModule) => ({
  list: post.posts,
  title: post.postData.title,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BoardContainer));