import * as React from 'react';
import styled, { css } from 'styled-components';
import generateRandomColor from './RandomColor';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  ${() => {
    return css`
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 1rem);
      padding: 1rem;
      background: rgba(230, 0, 19, 0.949);
      /* background: linear-gradient(to left,#f00000,#dc281e); */
      /* background: linear-gradient(to right,#dc2424,#4a569d); */
      /* background-color: linear-gradient(to right,#cb356b,#bd3f32);  */
      /* background: linear-gradient(to right, ${generateRandomColor()}); */
      color: white;
      border-radius: 5px;
      ${shadow(3)};
    `;
  }}
`;

const Amount = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Oswald:400,700');
  font-family: 'Oswald', sans-serif;
  letter-spacing: 1px;
  margin-top: 1rem; 
  font-size: 2.5rem;
  font-weight: 600;
  font-style: italic;
`;

const Text = styled.div`
  margin-bottom: 0.5rem;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
`;

interface IProps {
  amount: string;
  children: React.ReactNode;
}

const Board: React.SFC<IProps> = ({ amount, children }) => (
  <Wrapper className="Board">
    <Text>총 모금액</Text>
    <Amount>￦ {amount}</Amount>
    {children}
  </Wrapper>
);

export default Board;