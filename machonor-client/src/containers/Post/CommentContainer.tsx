import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { 
  PostComments,
} from 'components/post/Comments';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;
interface IOwnProps {
  post: any;
}

class Comment extends React.Component<IProps> {

  public onSetPostId = () => {
    const { PostsActions, post } = this.props;
    const postId = post.id;
    PostsActions.setPostId(postId);
  }

  public componentDidMount() {
    this.onSetPostId();
  }

  public render() {
    const { post, comments } = this.props;
    const postId = post.id;
    if (!comments[postId]) return null;
    const visible = comments[postId].visible;
    return (
      <PostComments
        post={post}
        visible={visible}
      />
    );
  }
}

const mapStateToProps = ({ post }: IModule, ownProps: IOwnProps) => ({
  post: ownProps.post,
  comments: post.comments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);