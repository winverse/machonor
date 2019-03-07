import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
  font-weight: 600;
  opacity: 0.8;
`;

const Donation = styled.div`
  flex: 4;
  color: rgba(230, 0, 19, 0.949);
`;

const Username = styled.div`
  flex: 4.5;
  color: #212842;
`;

const Comment = styled.div`
  color: #212842;
  flex: 2;
`;

interface IProps {

}

const RankerSection: React.SFC<IProps> = () => (
  <Wrapper className="RankerSection">
    <Donation>정의구매금</Donation>
    <Username>닉네임</Username>
    <Comment>댓글</Comment>
  </Wrapper>
);

export default RankerSection;