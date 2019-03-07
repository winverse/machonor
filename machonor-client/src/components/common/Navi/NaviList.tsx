import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import { media } from 'styles/styleUtils';

interface IStyled {
  active: boolean;
}

const Wrapper = styled.nav`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.div`
  ${(props: IStyled) => {
    const active = css`
      background-color: ${oc.red[0]};
      a:first-child {
        background-color: ${oc.red[1]};
        position: relative;
        color: rgba(230, 0, 19, 0.949);
        border-radius: 5px;
        margin-bottom: 1rem;
        &::after {
          position: absolute;
          top: 50%;
          left: 0.3%;
          transform: translateY(-50%);
          content:"";
          width: 5px;
          height: 98%;
          background: ${oc.red[5]};
          border-radius: 6px;
        }
      }
      a:hover {
        color: rgba(230, 0, 19, 0.949);
      }
    `;

    return css `
      border-radius: 5px;
      width: 100%;
      margin-top: 0.5rem;
      color: ${oc.gray[6]};
      &:first-child {
        margin-top: 0;
        @media ${media.xxMobile} {
          margin-top: 1rem;
        }
      }

      a:first-child {
        padding-bottom: 1rem;
      }
      
      a:last-child {
        padding-bottom: 1rem;
      }
      ${props.active && active}
    `;
  }};
`;

const MainTitle = styled(Link)`
  padding-top: 1rem;
  border-radius: 5px;
  padding-bottom: 1rem;
  padding-left: 2rem;
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  user-select: none;
  color: ${oc.gray[8]};
`;

const SubTitle = styled(Link)`
  padding-left: 2.5rem;
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  color: ${oc.gray[7]};
  & + & {
    margin-top: 1rem;
  }
`;

interface IProps {
  url: string;
  onPrevent(e: any): void;
}

const NaviList: React.SFC<IProps> = ({ onPrevent, url }) => (
  <Wrapper className="NaviList">
    <TitleBox active={url === 'explanations'}>
      <MainTitle to="/explanations">정의를 산다는 건</MainTitle>
    </TitleBox>
    <TitleBox active={url === 'main'}>
      <MainTitle to="/main">정의 프로젝트</MainTitle>
      <SubTitle to="/main/buying" replace={true}>구매중인 정의</SubTitle>
      <SubTitle to="/main/judging">심사중인 정의</SubTitle>
      <SubTitle to="/main/completed">구매완료된 정의</SubTitle>
    </TitleBox>
    <TitleBox active={url === 'justice'}>
      <MainTitle to="/justice/reserve" >정의 구매제안</MainTitle>
      <SubTitle to="/justice/reserve">예비정의</SubTitle>
      <SubTitle to="/justice/proposal" replace={true}>제안하기</SubTitle>
    </TitleBox>
    <TitleBox active={url === 'community'}>
      <MainTitle to="/community/free" >커뮤니티</MainTitle>
      <SubTitle to="/community/free">자유게시판</SubTitle>
      <SubTitle to="/community/notice">공지사항</SubTitle>
    </TitleBox>
    <TitleBox active={url === 'committe'}>
      <MainTitle to="/committe/introduce" >시민위원회</MainTitle>
      <SubTitle to="/committe/introduce">위원소개</SubTitle>
      <SubTitle to="/committe">위원회</SubTitle>
      <SubTitle to="/committe/request">위원신청</SubTitle>
      <SubTitle to="/committe/space">위원룸</SubTitle>
    </TitleBox>
  </Wrapper>
);

export default NaviList;