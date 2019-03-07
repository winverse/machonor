import * as React from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import oc from 'open-color';
import { ILoggedInfo } from 'store/modules/user';

const Positioner = styled.div`
  margin-top: 1rem;
`;

const NoComment = styled.div`
  text-align: center;
  color: ${oc.gray[5]};
  margin-top: 1rem;
  margin-bottom: 1rem;
  letter-spacing: 0px;
`;

interface IProps {
  data: any;
  logged: boolean;
  loggedInfo: ILoggedInfo;
  postId: string;
  onLikeToggle({ commentId, liked }: any): Promise<any>;
  onWriteComment({ text, postId, replyTo, password, displayname }: any): Promise<any>;
  onCommentRemove(commentId: string): Promise<any>;
}

const CommentList: React.SFC<IProps> = ({ 
  data, logged, loggedInfo, postId, onWriteComment, onLikeToggle, onCommentRemove,
}) => {
  const List = data && data.map((comment: any) => {
    return (
      <Comment
        key={comment.id}
        id={comment.id}
        anonymous={comment.anonymous}
        createdAt={comment.createdAt}
        displayname={comment.displayname}
        likesCount={comment.likesCount}
        text={comment.text}
        logged={logged}
        loggedInfo={loggedInfo}
        postId={postId}
        onWriteComment={onWriteComment}
        reply={comment.reply}
        reComment={false}
        liked={comment.liked}
        onLikeToggle={onLikeToggle}
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
  return (
    <Positioner className="CommentList">
      {data && data.length === 0 ? <NoComment>아직 댓글이 없습니다. 댓글을 입력해주세요</NoComment> : List}
    </Positioner>
  );
};

export default CommentList;