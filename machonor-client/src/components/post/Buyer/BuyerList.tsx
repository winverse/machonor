import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Comment as CommentContaienr } from 'containers/Post';
import { media } from 'styles/styleUtils';

interface IStyled {
  first?: boolean;
}

export const ItemWrapper = styled.div`
  ${(props: IStyled) => {
    const first = css`
      color: #2C324B;
      font-weight: 600;
      font-size: 0.9rem;
      background-color: rgba(255, 227, 227, 0.6) !important;
    `;
    return css`
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      padding-left: 2rem;
      cursor: pointer;
      user-select: none;
      color: ${oc.gray[6]};
      ${props.first && first};
      &:nth-child(2n) {
        background-color: ${oc.red[0]};
      }
      &:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &:hover {
        background-color: ${oc.pink[0]};
      }
      &:active {
        background-color: ${oc.red[1]};
      }
    `;
  }};
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

export const Amount = styled.div`
  flex: 2;
  letter-spacing: -1px;
  color: red;
  font-weight: 600;
`;

export const Username = styled.div`
  flex: 2;
  color: ${oc.gray[9]};
`;

export const InShort = styled.div`
  flex: 5.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 2rem;
`;

export const CheerUp = styled.div`
  flex: 1.5;
  letter-spacing: -1px;
`;

interface IProps {
  post: any;
  onShowComment(postId: any): void;
}

const BuyerList: React.SFC<IProps> = ({ post, onShowComment }) => {
  const {
    id,
    username,
    amount,
    comments,
    inShort,
  } = post;

  const showComment = () => onShowComment(id);
  return (
    <React.Fragment>
      <ItemWrapper onClick={showComment}>
        <Amount>￦{amount}</Amount>
        <Username>{username}</Username>
        <InShort>{inShort}</InShort>
        <CheerUp>댓글({comments.length})</CheerUp>
      </ItemWrapper>
      <CommentContaienr
        post={post}
      />
    </React.Fragment>
  );
};

export default BuyerList;