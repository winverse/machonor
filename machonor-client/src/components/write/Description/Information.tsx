import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 1.15rem;
`;

const Board = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  background-color: ${oc.gray[1]};
  border-radius: 5px;
  user-select: none;
`;

const Text = styled.div`
  color: ${oc.gray[5]};
  font-size: 0.8rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

interface IProps {

}

const Information: React.SFC<IProps> = () => (
  <Wrapper className="Information">
    <Name>안내사항</Name>
    <Board>
      <Text>- 비리유치원 '간판 갈이' 봉쇄…'지원금→보조금' 법개정 추진</Text>
      <Text>- 정두언 "유시민, 대권 앞에 장사 없다!"</Text>
      <Text>- "넘어진 아이를 안 일으켰어?" 맘카페에 신상 공개된 교사</Text>
      <Text>- '미라' 소유 "얼마 벌었냐고? 부모님 집+건물 구매</Text>
    </Board>
  </Wrapper>
);

export default Information;