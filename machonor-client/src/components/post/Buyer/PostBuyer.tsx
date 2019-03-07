import * as React from 'react';
import styled from 'styled-components';
import { data } from './data';
import { shadow, media } from 'styles/styleUtils';
import BuyerList, { Amount, Username, CheerUp, ItemWrapper, InShort } from './BuyerList';
import { MoreSee } from 'components/common/Button';

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  background: white;
  border-radius: 5px;
  ${shadow(0)};
`;

const Title = styled.div`
  width: 100%;
  color: #212842;
  padding: 1rem;
  padding-left: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0px;
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

interface IProps {
  onShowComment(postId: any): void;
  buyerRef: React.Ref<any>;
}

const PostBuyer: React.SFC<IProps> = ({ buyerRef, onShowComment }) => { 
  const buyerList = data.map(
    (post: any) => (
      <BuyerList
        key={post.id} 
        post={post} 
        onShowComment={onShowComment} 
      />
    ),
  );
  return(
    <React.Fragment>
      <Wrapper className="PostBuyer" ref={buyerRef}>
        <Title>구매자들</Title>
        <ItemWrapper first={true}>
          <Amount>구매액</Amount>
          <Username>구매자</Username>
          <InShort>한마디</InShort>
          <CheerUp>댓글</CheerUp>
        </ItemWrapper>
        {buyerList}
      </Wrapper>
      <MoreSee
        text="구매자들 더보기"
      />
    </React.Fragment>
  );
};

export default PostBuyer;