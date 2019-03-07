import * as React from 'react';
import styled, { css } from 'styled-components';
import { MdMoreHoriz, MdThumbUp, MdSubdirectoryArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import { media } from 'styles/styleUtils';
import { fromNow } from 'lib/common';
import { CommentInput } from 'components/community/CommentInput';
import CommentMenu from './CommentMenu';
import { ModalWrapper } from 'components/common/modal';
import { 
  ModalWrapper as Wrapper,
  ModalButton,
  ModalInput,
  ModalError,
} from '../Modal';

interface IStyled {
  recomment?: string;
  liked?: any;
  isEdit?: boolean;
  deleted?: boolean;
}

const Positioner = styled.div`
  padding-bottom: 1rem;
  ${(props: IStyled) => {
    return css`
      ${props.recomment === 'true' ? css`
        padding: 1rem;
        padding-right: 2rem;
        padding-bottom: 0rem;
        display: flex;
        flex-flow: row nowrap;
        @media ${media.xxMobile} {
          padding-left: 0.02rem;
          padding-right: 0.5rem;
        }
      ` : css``}
    `;
  }}
  padding-top: 1rem;
  width: 100%;
  border-top: 1px solid ${oc.gray[2]};
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  width: 100%;
`;

const Username = styled(Link)`
  font-size: 0.875rem;
  color: #495057;
`;
const NotUsername = styled.div`
  font-size: 0.875rem;
  color: #495057;
`;

const Date = styled.div`
  margin-left: 0.5rem;
  font-size: 0.685rem;
  margin-top: 0.25rem;
  color: ${oc.gray[6]};
`;

const Amount = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.deleted && css`display: none;`}
    `;
  }}
  margin-left: 0.5rem;
  font-size: 0.685rem;
  margin-top: 0.25rem;
  letter-spacing: -1px;
  color: rgba(230, 0, 19, 0.949);
  span {
    color: ${oc.gray[5]};
  }
`;

const Option = styled(MdMoreHoriz)`
  cursor: pointer;
  margin-left: auto;
`;

const ContentWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  letter-spacing: -1px;
  line-height: 1.3rem;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: keep-all;
  user-select: none;
  a {
    text-decoration: underline;
  }
`;

const BottomWrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.recomment === 'true' ? css`display: none;` : 'display: flex;'}
    `;
  }}
  user-select: none;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ReplyButton = styled.div`
  padding: 0.5rem;
  color: #495057;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  span {
    color: rgba(230, 0, 19, 0.949);
    margin-left: 0.25rem;
    font-size: 0.785rem;
  }
`;

const Likes = styled(MdThumbUp)`
  ${(props: IStyled) => {
    return css`
      ${props.liked === 'true' ? css`color: rgba(230, 0, 19, 0.949);` : css`color: ${oc.gray[5]};`};
    `;
  }}
  cursor: pointer;
  margin-left: auto;
`;

const LikeCount = styled.div`
  margin-left: 0.5rem;
  color: rgba(230, 0, 19, 0.949);
`;

const ReplyWrapper = styled.div`
  background-color: #F9F9F9;
  width: 95%;
  margin: 1rem auto;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 1rem;
  border-radius: 5px;
  @media ${media.xxMobile} {
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    padding-left: 0;
  }
`;

const Arrow = styled(MdSubdirectoryArrowRight)`
  ${(props: IStyled) => {
    return css`
      ${props.recomment === 'true' ? css`display: inline-block;` : css`display: none;`}
    `;
  }}
  margin-right: 1rem;
  color: ${oc.gray[5]};
  @media ${media.xxMobile} {
    margin-right: 0.25rem;
  }
`;

const FlexWrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      display: block;
      ${props.isEdit && css`display: none;`};
    `;
  }}
  width: 100%;
`;

interface IProps {
  id: string;
  text: string;
  displayname: string;
  likesCount?: number;
  anonymous: boolean;
  createdAt: string;
  logged: boolean;
  loggedInfo: {
    displayname: string;
    thumbnail: string;
    shortBio: string;
  };
  reComment: boolean;
  postId: string;
  reply: any[];
  liked?: boolean;
  commentId?: string;
  deleted: boolean;
  amount: number;
  userId: string;
  password: string;
  ipAddress: string;
  onWriteComment({ text, postId, replyTo }: any): Promise<any>;
  onLikeToggle?({ commentId, liked }: any): Promise<any>;
  onCommentRemove(commentId: string): Promise<any>;
}

interface IState {
  visible: boolean;
  menuVisible: boolean;
  modalVisible: boolean;
  modalMode: string;
  modalText: string;
  modalValue: string;
  error: boolean;
  isEdit: boolean;
}

class Comment extends React.Component<IProps, IState> {
  public state = {
    visible: true,
    menuVisible: false,
    modalVisible: false,
    modalMode: '',
    modalText: '',
    modalValue: '',
    error: false,
    isEdit: false,
  };
  public setVisible = () => {
    const { reply } = this.props;
    if (reply.length === 0) {
      this.setState({
        visible: false,
      });
    }
  }
  public onShowReplyWrapper = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }
  public onLikeClick = () => {
    const { id, liked, onLikeToggle, deleted } = this.props;
    if (deleted) {
      alert('삭제된 글에는 추천하실 수 없습니다.');
      return;
    }
    if (onLikeToggle) {
      onLikeToggle({
        commentId: id,
        liked,
      });
    }
  }
  public onClickMenuVisible = () => {
    const { menuVisible } = this.state;
    this.setState({
      menuVisible: !menuVisible,
    });
  }
  public onEditComment = () => {
    this.setState({
      modalVisible: true,
      menuVisible: false,
      modalMode: 'edit',
      modalText: '이 댓글을 수정하시겠습니까?',
    });
  }
  public onRemoveComment = () => {
    this.setState({
      modalVisible: true,
      menuVisible: false,
      modalMode: 'remove',
      modalText: '이 댓글을 삭제하시겠습니까?',
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
      modalValue: value,
    });
  }
  public onModalCancel = () => {
    this.setState({
      modalVisible: false,
      modalValue: '',
    });
  }
  public onModalConfirm = async () => {
    const { modalValue, modalMode } = this.state;
    const { password, anonymous, commentId, onCommentRemove } = this.props;
    if (anonymous) {
      if (!password) {
        alert('잘못된접근입니다.');
        window.location.href = '/';
        return;
      }
      if (modalValue !== password) {
        this.setState({
          error: true,
        });
        return;
      }
      if (modalMode === 'edit') {
        this.setState({
          modalVisible: false,
          modalValue: '',
          isEdit: true,
        });
        return;
      }
      if (modalMode === 'remove') {
        if (!commentId) return;
        onCommentRemove(commentId);
        this.setState({
          modalVisible: false,
        });
        return;
      }
    }
    if (!anonymous) {
      const { displayname, loggedInfo } = this.props;
      if (!displayname || !loggedInfo) return;
      if (displayname !== loggedInfo.displayname) {
        alert('허용되지 않은 접근 입니다.');
        this.setState({
          menuVisible: false,
        });
        return;
      }
      if (modalMode === 'edit') {
        this.setState({
          modalVisible: false,
          menuVisible: false,
          modalValue: '',
          isEdit: true,
        });
        return;
      }
      if (modalMode === 'remove') {
        if (!commentId) return;
        onCommentRemove(commentId);
        this.setState({
          modalVisible: false,
          menuVisible: false,
          modalValue: '',
        });
        return;
      }
    }
  }
  public onEditCancel = () => {
    this.setState({
      isEdit: false,
    });
  }
  public onConvrtToLink = () => {
    const comments = document.getElementsByClassName('commentText');
    if (!comments) return;
    const htmlCollection = Array.from(comments);
    htmlCollection.length > 0 && htmlCollection.map((comment) => {
      const text = comment.innerHTML;
      const exp =  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      const convertText = text.replace(exp, "<a target=_blank' href='$1'>$1</a>");
      const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      comment.innerHTML = convertText.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    });
  }
  public componentDidMount() {
    this.setVisible();
    this.onConvrtToLink();
  }
  public render() {
    const { visible, menuVisible, isEdit, modalVisible, modalMode, modalText, modalValue, error } = this.state;
    const { userId, amount, reply, displayname, text, likesCount, createdAt, logged, loggedInfo, postId, id, onWriteComment, reComment, liked, commentId, onCommentRemove, deleted, anonymous, password, ipAddress } = this.props;
    const isOwn = userId === (loggedInfo as any).id!;
    const replyData = reply.length > 0 && reply.map((comment) => {
      return (
        <Comment
          key={comment.id}
          id={comment.id}
          text={comment.text}
          anonymous={comment.anonymous}
          createdAt={comment.createdAt}
          displayname={comment.displayname}
          logged={logged}
          loggedInfo={loggedInfo}
          postId={comment.fk_post_id}
          reply={[]}
          onWriteComment={onWriteComment}
          reComment={true}
          commentId={comment.id}
          onCommentRemove={onCommentRemove}
          deleted={comment.deletedAt ? true : false}
          amount={comment.anonymous ? 0 : comment.User.UserProfile.amount}
          userId={comment.anonymous ? '' : comment.User.id}
          password={comment.password}
          ipAddress={comment.ipAddress}
        />
      );
    });
    
    const ReplySection = ( // 댓글의 댓글 입력창 // 수정 불필요
      <ReplyWrapper>
        <CommentInput
          logged={logged}
          loggedInfo={loggedInfo}
          onWriteComment={onWriteComment}
          postId={postId}
          reply={true}
          editMode={false}
          replyTo={id}
          isEdit={isEdit}
          editCancel={this.onEditCancel}
          password={password}
          displayname={displayname}
        />
        {replyData}
      </ReplyWrapper>
    );
    return (
      <Positioner recomment={reComment.toString()} className="freeComment">
        <Arrow recomment={reComment.toString()} />
        <FlexWrapper isEdit={isEdit}>
          <HeaderWrapper>
            {
              deleted ?
              <NotUsername>알 수 없음</NotUsername>
              :
              <Username to={`/@${displayname}`}>{displayname}</Username>
            }
            <Amount deleted={deleted}>{anonymous ? <span>(비회원${ipAddress})</span> : `(총구매액 ￦${amount})`}</Amount>
            <Date>{fromNow(createdAt)}</Date>
            {!deleted ?  
              (anonymous ? <Option onClick={this.onClickMenuVisible} /> : (isOwn === false ? null : <Option onClick={this.onClickMenuVisible} />)) : null
            }
            <CommentMenu
              onEdit={this.onEditComment}
              onRemove={this.onRemoveComment}
              visible={menuVisible}
              deleted={deleted}
            />
            <ModalWrapper visible={modalVisible}>
              <Wrapper text={modalText}>
                <ModalInput
                  value={modalValue}
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
          </HeaderWrapper>
          <ContentWrapper className="commentText">
            {deleted ? '삭제된 댓글입니다.' : text}
          </ContentWrapper>
          <BottomWrapper recomment={reComment.toString()}>
            <ReplyButton onClick={this.onShowReplyWrapper}>답글<span>{reply.length}</span></ReplyButton>
            <Likes liked={typeof(liked) === 'boolean' ? liked!.toString() : null} onClick={this.onLikeClick}/>
            <LikeCount>{likesCount}</LikeCount>
          </BottomWrapper>
        </FlexWrapper>
        <CommentInput  // 댓글의 댓글 및 댓글 수정 창 default값이 필요
          logged={logged}
          loggedInfo={loggedInfo}
          onWriteComment={onWriteComment}
          postId={postId}
          reply={false}
          replyTo={id}
          editMode={true}
          isEdit={isEdit}
          editCancel={this.onEditCancel}
          defaultValue={isEdit && text}
          commentId={commentId}
          password={password}
          displayname={displayname}
        />
        {(visible && !reComment) && ReplySection}
      </Positioner>
    );
  }
}

export default Comment;