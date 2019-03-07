import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 2rem;
  background-color: ${oc.orange[5]};
  width: 100%;
  ${shadow(4)};
  border-radius: 5px;
`;

const BoxItem = styled.div`
  flex: 1;
  padding: 1rem 1rem;

  & + & {
    border-left: 1px solid ${oc.gray[3]};
  }
`;

const Text = styled.div`
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.9;
`;

const Number = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Oswald:400,700');
  font-family: 'Oswald', sans-serif;
  margin-top: 0.5rem;
  color: white;
  font-weight: 600;
  letter-spacing: 0px;
`;

const Unit = styled.span`
  font-size: 0.9rem;
  margin-left: 0.2rem;
`;

interface IProps {

}

const DarkBox: React.SFC<IProps> = () => (
  <Wrapper className="DarkBox">
    <BoxItem>
      <Text>구매자들</Text>
      <Number>3000<Unit>명</Unit></Number>
    </BoxItem>
    <BoxItem>
      <Text>응원자들</Text>
      <Number>5312<Unit>명</Unit></Number>
    </BoxItem>
    <BoxItem>
      <Text>투표하기</Text>
    </BoxItem>
  </Wrapper>
);

export default DarkBox;