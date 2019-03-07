import * as React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../Post/Post';

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  background-color: Rgba(230, 0, 19, 0.949);
  width: 100%;
  height: 100%;
  border-radius: 5px;
  user-select: none;
`;

const Notice = styled.div`
  width: calc(100% - 4.5rem);
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  color: white;
  font-family: 'Black Han Sans', sans-serif;
  font-size: 3rem;
`;

const SubText = styled.div`
  padding-top: 0.5rem;
  color: white;
  font-size: 0.9rem;
`;

interface IProps {
  
}

const ProposalButton: React.SFC<IProps> = () => (
  <Wrapper className="ProposalButton">
    <InnerWrapper>
      <Notice>예비정의 공지사항</Notice>
      <Text>정의구매 제안하기</Text>
      <SubText>- 밀어주기가 100개가 넘어가면 구매중인 정의로 넘어갑니다</SubText>
      <SubText>- 밀어주기가 100개가 넘어가면 구매중인 정의로 넘어갑니다</SubText>
    </InnerWrapper>
  </Wrapper>
);

export default ProposalButton;