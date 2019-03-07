import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow, media } from 'styles/styleUtils';
import { MoreSee } from 'components/common/Button';

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  color: #212842;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0px;
`;

const AlikeWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem 2rem;
  ${shadow(0)};
  cursor: pointer;
  border: 1px solid transparent;
  &:hover{
    border: 1px solid rgba(230, 0, 19, 0.949);
  }
  & + & {
    margin-top: 2rem;
  }
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

const Date = styled.div`
  color: ${oc.gray[8]};
  font-size: 0.95rem;
`;

const AlikeTitle = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
`;

const ALikeText = styled.div`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: ${oc.gray[7]};
  word-break: keep-all;
  line-height: 1.2rem;
  letter-spacing: 0px;
`;

interface IALike {
  date: string;
  title: string;
  text: string;
}

const ALikeCard: React.SFC<IALike> = ({ date, title, text }) => {
  return (
    <AlikeWrapper>
      <Date>{date}</Date>
      <AlikeTitle>{title}</AlikeTitle>
      <ALikeText>
        {text}
      </ALikeText>
    </AlikeWrapper>
  );
};

interface IProps {
  alikeRef: any;
}

const PostAlike: React.SFC<IProps> = ({ alikeRef }) => (
  <Wrapper className="PostAlikeEvent" ref={alikeRef}>
    <Title>유사정의</Title>
    <ALikeCard 
      date="2018년 10월 25일"
      title="신군부 12.12사태 주동자 증인 확보를 부탁드립니다."
      text="이를 실천에 옮기기 위하여 11월 중순 국방부 군수차관보 유학성, 1군단장 황영시, 수도군단장 차규헌, 
      9사단장 노태우 등과 함께 모의한 후 12월 12일을 거사일로 결정하고 20사단장 박준병, 1공수여단장 박희도, 
      3공수여단장 최세창, 5공수여단장 장기오 등과 사전 접촉하였다. 그리고 12월 초순 전두환은 보안사 대공처장
      이학봉과 보안사 인사처장 허삼수, 육군본부 범죄수사단장 우경윤에게 정승화연행계획을 수립하도록 지시..."
    />
    <ALikeCard 
      date="2017년 5월 15일"
      title="전두환, 5·18민주화운동 초기부터 계엄군작전 주도적 논의"
      text="경향신문 입수 '제5공화국 전사'에 수뇌부 회의 지속 참석 기록 전두환 전역식 장면[연합뉴스 자료사진] 전두환 전 대통령이 5·18 민주화운동 초기부터 군 수뇌부 회의에 지속적으로 참석, 계엄군 작전을 주도적으로..."
    />
    <ALikeCard 
      date="2019년 1월 7일"
      title="기무사들에 대한 시급한 논의가 필요한 시점입니다."
      text="국군기무사령부는 전두환과 노태우가 소속되어 있었던 보안사의 후신으로 전직 대통령을 2명이나 배출한 기관이지만 역사 속 군사 쿠데타의 중심에 있었다. 이날 방송에서는 기무사 출신 고위 간부들의 증언으로.."
    />
    <ALikeCard 
      date="2018년 12월 23일"
      title="은산분리가 전두환 정권 시절 만들어진 건 아시나요?"
      text="산업자본이 은행을 아예 소유할 수 없도록 정부가 소유하고 있었기 때문에 어떻게 보면 ‘완벽한 은산분리’가 되고 있었던 것이다. 전두환 정권은 국가 소유의 은행들을 하나씩 민영화 했다. 그러나 이미 삼성, LG 등..."
    />
    <ALikeCard 
      date="2018년 8월 27일"
      title="38년 전 오늘 ‘체육관 대통령’된 전두환, 여전히 반성은 없다."
      text="38년 전 오늘, 전두환 대통령이 되다 “통일주체국민회의, 총 투표자 2525명 가운데 2524표를 얻은 전두환 후보를 제11대 대통령으로 선출” <동아일보> , <경향신문>, <매일경제> 1980년 8월27일 치. 무효 1표, 99.9%의..."
    />
    <MoreSee 
      text="유사정의 더보기"
    />
  </Wrapper>
);

export default PostAlike;