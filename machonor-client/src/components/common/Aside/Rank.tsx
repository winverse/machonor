import * as React from 'react';
import styled from 'styled-components';
import { GoCommentDiscussion } from 'react-icons/go';

import { Title } from './Infomation';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  padding: 1rem;
  margin-top: 2rem;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  ${shadow(0)};
  border: 1px solid #e9ecef;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  & + & {
    margin-top: 1rem;
  }
`;

const Number = styled.div`
  flex: 2;
  height: 100%;
  font-size: 1.5rem;
  color: ${oc.gray[5]};
  font-weight: 600;
`;

const DataWrapper = styled.div`
  flex: 8;
  height: 100%;
`;

const Username = styled.div`
  margin-top: 0.1rem;
  width: 100%;
  height: 50%;
  color: ${oc.gray[8]};
  font-size: 1.2rem;
  font-weight: 600;
`;

const Comment = styled.div`
  margin-top: 0.4rem;
  width: 100%;
  height: 50%;
  color: ${oc.gray[5]};
  font-size: 0.8rem;
  letter-spacing: -1px;
  svg {
    margin-right: 0.5rem;
    color: ${oc.gray[7]};
  }
`;

interface IProps {

}

const Rank: React.SFC<IProps> = () => (
  <Wrapper className="Rank">
    <Title>Rank</Title>
    <ContentsBox>
      <Number>01</Number>
      <DataWrapper>
        <Username>정상을향해</Username>
        <Comment><GoCommentDiscussion/>2167명의 댓글</Comment>
      </DataWrapper>
    </ContentsBox>
    <ContentsBox>
      <Number>02</Number>
      <DataWrapper>
        <Username>김앤장현</Username>
        <Comment><GoCommentDiscussion/>1923명의 댓글</Comment>
      </DataWrapper>
    </ContentsBox>
    <ContentsBox>
      <Number>03</Number>
      <DataWrapper>
        <Username>이명박구송</Username>
        <Comment><GoCommentDiscussion/>3157명의 댓글</Comment>
      </DataWrapper>
    </ContentsBox>
    <ContentsBox>
      <Number>04</Number>
      <DataWrapper>
        <Username>FakerIsGod</Username>
        <Comment><GoCommentDiscussion/>897명의 댓글</Comment>
      </DataWrapper>
    </ContentsBox>
    <ContentsBox>
      <Number>05</Number>
      <DataWrapper>
        <Username>행복해이젠</Username>
        <Comment><GoCommentDiscussion/>884명의 댓글</Comment>
      </DataWrapper>
    </ContentsBox>
  </Wrapper>
);

export default Rank;