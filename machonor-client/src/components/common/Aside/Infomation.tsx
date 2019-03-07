import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;
  ${shadow(0)};
  border-radius: 5px;
  border: 1px solid #e9ecef;
`;

export const Title = styled.div`
  color: #616161;
  font-size: 1.3rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  color: rgba(230, 0, 19, 0.949);
  font-size: 0.95rem;
  font-weight: 800;
  font-style: italic;
  cursor: pointer;
  span {
    margin-right: 0.7rem;
    font-style: normal;
    color: ${oc.gray[5]};
  }
  & + & {
    margin-top: 0.8rem;
  }
`;

interface IProps {
  
}

const Infomation: React.SFC<IProps> = () => (
  <Wrapper className="Infomation">
    <Title>Infomation</Title>
    <Section><span>👊</span>사이트 소개</Section>
    <Section><span>🤠</span>이용 방법</Section>
    <Section><span>📝</span>정의 구매 제안</Section>
  </Wrapper>
);

export default Infomation;