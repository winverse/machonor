import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { ModalWrapper } from 'components/common/modal';
import {
  PostWrapper,
  PostHead,
  PostBody,
} from 'components/community/Post';
import { 
  ModalWrapper as Wrapper,
  ModalButton,
  ModalInput,
  ModalError,
} from 'components/community/Modal';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

interface IOwnProps {
  urlSlug: string;
}

interface IState {
  menuVisible: boolean;
  modalMode: string;
  modalVisible: boolean;
  value: string; // 익명 글쓰기 수정 & 삭제 시 패스워드
  error: boolean;
  modalText: string;
}

class PostContainer extends React.Component<IProps, IState> {
  public state = {
    menuVisible: false,
    modalVisible: false,
    modalMode: '',
    value: '',
    error: false,
    modalText: '',
  };
  public initialize = async () => {
    const { urlSlug, PostsActions } = this.props;
    if (!urlSlug) return;
    try {
      await PostsActions.readPost({
        category: 'free',
        urlSlug,
      });
    } catch (e) {
      console.log(e);
      if (e && e.response && e.response.status === 404) {
        this.props.history.replace('/404');
      }
    }
    window.scrollTo(0, 0);
  }
  public onSetMenuVisible = () => {
    const { menuVisible } = this.state;
    this.setState({
      menuVisible: !menuVisible,
    });
  }
  public onModalInputChange = (e: any) => {
    const { value } = e.target;
    const { error } = this.state;
    if (error) {
      this.setState({
        error: false,
      });
    }
    this.setState({
      value,
    });
  }
  public onModalCancel = () => {
    this.setState({
      modalVisible: false,
      value: '',
    });
  }
  public onModalConfirm = async () => {
    const { modalMode } = this.state;
    const { history, urlSlug, PostsActions } = this.props;
    if (modalMode === 'edit') {
      history.push(`/community/notice/write/${urlSlug}`);
      return;
    }
    if (modalMode === 'remove') {
      try {
        await PostsActions.removePost({
          category: 'free',
          urlSlug,
        });
        PostsActions.initialize();
        window.location.href = '/community/notice';
      } catch (e) {
        console.log(e);
      }
      return;
    }
  }
  public onPostEdit = () => {
    this.setState({
      modalMode: 'edit',
      modalVisible: true,
      menuVisible: false,
      modalText: '이 포스트를 수정하시겠습니까?',
    });
  }
  public onPostRemove = () => {
    this.setState({
      modalMode: 'remove',
      modalVisible: true,
      menuVisible: false,
      modalText: '이 포스트를 삭제하시겠습니까?',
    });
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.urlSlug !== this.props.urlSlug) {
      const { PostsActions } = this.props;
      PostsActions.unloadPost();
      this.initialize();
    }
  }
  public componentDidMount() {
    this.initialize(); // 데이터 불러오기
  }
  public componentWillUnmount() {
    const { PostsActions } = this.props;
    PostsActions.unloadPost();
  }
  public render() {
    const { modalVisible, value, error, modalText, modalMode } = this.state;
    const { post, commentCount, loggedInfo, loggedUserId } = this.props;
    const UserProfile = post.User && post.User.UserProfile;
    const { anonymous, User } = post;
    const isOwn =  anonymous === true ? true : 
    (loggedInfo.displayname === 'admin' ? true : User.id === loggedUserId);
    return (
      <PostWrapper>
        <ModalWrapper visible={modalVisible}>
          <Wrapper text={modalText}>
            <ModalInput
              value={value}
              onChange={this.onModalInputChange}
              anonymous={anonymous}
            />
            <ModalError
              active={error}
            />
            <ModalButton
              mode={modalMode}
              onConfirm={this.onModalConfirm}
              onRemove={this.onModalCancel}
            />
          </Wrapper>
        </ModalWrapper>
        <PostHead
          displayname={post.displayname}
          thumbnail={UserProfile && UserProfile.thumbnail}
          shortBio={UserProfile && UserProfile.shortBio}
          ipAddress={post.ipAddress}
          anonymous={post.anonymous}
          showMenu={this.onSetMenuVisible}
          visible={this.state.menuVisible}
          isOwn={isOwn}
          onEdit={this.onPostEdit}
          onRemove={this.onPostRemove}
        />
        <PostBody
          title={post.title}
          body={post.body}
          date={post.createdAt}
          totalViews={post.totalViews}
          commentCount={commentCount}
        />
      </PostWrapper>
    );
  }
}

const mapStateToProps = ({ post, user, pender }: IModule, ownProps: IOwnProps) => ({
  loggedUserId: user.userId,
  urlSlug: ownProps.urlSlug,
  post: post.postData,
  liked: post.postData.liked,
  commentCount: post.comments.count!,
  loggedInfo: user.loggedInfo,
  proceeInLike: pender.pending['posts/LIKE_POST'] || pender.pending['posts/UNLIKE_POST'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PostContainer));