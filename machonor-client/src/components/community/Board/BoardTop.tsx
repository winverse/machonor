import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { media } from 'styles/styleUtils';

interface IStyled {
  isNotice: boolean;
}

const Positioner = styled.div`  
  width: 100%;
  border-top: 2px solid ${oc.gray[5]};
  background-color: #F9FAFC;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8ec;
  color: ${oc.gray[7]};
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    font-size: 0.9rem;
    text-align: center;
    user-select: none;
    @media ${media.xxMobile} {
      font-size: 0.75rem;
      &:nth-child(n+3) {
        display: none;
      }
    }
  }
`;

export const Likes = styled.div`
  flex: 1;
  ${(props: IStyled) => {
    return css`
      ${props.isNotice && css`display: none !important;`};
    `;
  }}
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 10;
  padding-left: 0.5rem;
  max-width: 450px;
  @media ${media.xxMobile} {
    flex-flow: row wrap;
    align-items: center;
  }
`;

export const Writer = styled.div`
  flex: 2;
  @media ${media.xxMobile} {
    display: none;
  }
`;

export const Date = styled.div`
  flex: 1.5;
  @media ${media.xxMobile} {
    display: none;
  }
`;

export const ViewCount = styled.div`
  flex: 1.5;
  @media ${media.xxMobile} {
    display: none;
  }
`;

interface IProps {
  isNotice: boolean;
}

const BoardTop: React.SFC<IProps> = ({ isNotice }) => (
  <Positioner className="BoardTop">
    <Likes isNotice={isNotice}>추천</Likes>
    <TitleWrapper>제목</TitleWrapper>
    <Writer>글쓴이</Writer>
    <Date>날짜</Date>
    <ViewCount>조회</ViewCount>
  </Positioner>
);

export default BoardTop;