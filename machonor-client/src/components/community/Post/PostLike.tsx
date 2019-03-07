import * as React from 'react';
import styled, { css } from 'styled-components';
import { MdThumbUp } from 'react-icons/md';
import oc from 'open-color';

interface IStyled {
  liked: string;
}

const Positioner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const Like = styled(MdThumbUp)`
  ${(props: IStyled) => {
    return css`
      ${props.liked === 'true' ? 
      css`color: rgba(230, 0, 19, 0.749);` : 
      css`color: ${oc.gray[3]};`
      }
    `;
  }}
  font-size: 1.25rem;
`;

const LikeCount = styled.div`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0px;
  user-select: none;
`;

interface IProps {
  likesCount: number;
  liked: boolean;
  onLike(): void;
}

const PostLike: React.SFC<IProps> = ({
  likesCount,
  liked,
  onLike,
}) => (
  <Positioner className="PostLike">
    <Wrapper onClick={onLike}>
      <Like liked={liked.toString()}/>
      <LikeCount>
        {likesCount}
      </LikeCount>
    </Wrapper>
  </Positioner>
);

export default PostLike;