import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  CommentWrapper,
  CommentInput,
} from 'components/community/CommentInput';
import {
  CommentList,
  CommentSort,
} from 'components/community/CommentList';
import { banded } from 'lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

interface IOnWriteComment {
  text: string;
  replyTo?: string;
  postId: string;
  commentId?: string;
  displayname: string;
  password: string;
}
interface IOnToggleLikePayload {
  commentId: string;
  liked: boolean;
  sort: 'popular' | 'recently' | 'past';
}

interface IState {
  sort: string;
}

class CommentContainer extends React.Component<IProps, IState> {
  public state = {
    sort: 'popular',
  };
  public initialize = async () => {
    const { sort } = this.state;
    const { postId, PostsActions } = this.props;
    if (!postId) return;
    try {
      await PostsActions.readComments({ postId, order: sort });
    } catch (e) {
      console.log(e);
    }
  }
  public onWriteComment = async ({ text, postId, replyTo, commentId, displayname, password }: IOnWriteComment): Promise<any> => {
    const { PostsActions, logged } = this.props;
    if (!logged) {
      if (displayname === '') {
        alert('닉네임을 입력해주세요');
        return;
      }
      if (password === '') {
        alert('비밀번호를 입력해주세요');
        return;
      }
      if (displayname.length > 11 || password.length > 11) {
        alert('닉네임과 패스워드는 10자 이내로 해주세요');
        return;
      }
      const search: any = banded.map((word) => {
        return displayname.search(word);
      });
      if (search.indexOf(0) > -1) {
        alert('닉네임에 금지어가 포함되어 있습니다.');
        return;
      }
    }
    try {
      await PostsActions.commentWrite({
        text,
        replyTo,
        postId,
        commentId,
        displayname: displayname.trim(),
        password: password.trim(),
      });
    } catch (e) {
      console.log(e);
      if (e && e.response && e.response.status === 406) {
        alert('댓글은 10초마다 작성 할 수 있습니다.');
        return;
      }
    }
  }
  public onLikeToggle = async ({ commentId, liked }: IOnToggleLikePayload) => {
    const { logged, PostsActions, likeInProcess } = this.props;
    if (!logged) {
      alert('로그인을 해주세요');
      return;
    }
    if (likeInProcess) return;

    if (liked) {
      PostsActions.unlikeComment(commentId);
    } else {
      PostsActions.likeComment(commentId);
    }
  }
  public onCommentRemove = async (commentId: string) => {
    const { PostsActions } = this.props;
    try {
      await PostsActions.removeComment(commentId);
    } catch (e) {
      console.log(e);
    }
  }
  public onCommentsSort = async (e: any): Promise<any> => {
    const { postId, PostsActions, commentInProcess } = this.props;
    const { title } = e.target;
    if (!postId || commentInProcess) return;
    const sort = title || 'recently';
    this.setState({
      sort,
    });
    try {
      await PostsActions.readComments({ postId, order: sort });
    } catch (e) {
      console.log(e);
    }
  }
  public componentDidMount() {
    this.initialize();
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.postId !== this.props.postId) {
      this.initialize();
    }
  }
  public render() {
    const { sort } = this.state;
    const { logged, loggedInfo, postId, comments, commentCount } = this.props;
    const CommentWrite = (
      <CommentInput
        logged={logged}
        loggedInfo={loggedInfo}
        onWriteComment={this.onWriteComment}
        postId={postId}
        reply={false}
        commentCount={commentCount}
        editMode={false}
        isEdit={false}
      />
    );
    return (
      <CommentWrapper CommentInput={CommentWrite}>
        <CommentSort 
          onClick={this.onCommentsSort}
          sort={sort}
        />
        <CommentList
          data={comments}
          logged={logged}
          loggedInfo={loggedInfo}
          postId={postId}
          onWriteComment={this.onWriteComment}
          onLikeToggle={this.onLikeToggle}
          onCommentRemove={this.onCommentRemove}
        />
      </CommentWrapper>
    );
  }
}

const mapStateToProps = ({ user, post, pender }: IModule) => ({
  logged: user.logged,
  loggedInfo: user.loggedInfo,
  postId: post.postData.id,
  comments: post.comments.rows,
  commentCount: post.comments.count!,
  commentInProcess: pender.pending['posts/READ_COMMNETS'],
  likeInProcess: pender.pending['comments/LIKE_COMMENT'] || pender.pending['comments/UNLIKE_COMMNET'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CommentContainer);