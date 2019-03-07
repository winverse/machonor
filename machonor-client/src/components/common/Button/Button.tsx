import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: 200px;
  margin: 1rem auto -1rem;
  padding: 0.5rem;
  background-color: rgba(230,0,18,0.949);
  border-radius: 5px;
  ${shadow(0)};
  &:hover {
    background-color: ${oc.red[9]};
  }
  &:active {
    transform: translateY(2px);
    filter: brightness(110%);
  }
`;

const Text = styled.span`
  display: flex;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

interface IProps {
  text: string;
}

const Button: React.SFC<IProps> = ({ text }) => (
  <Wrapper className="Button">
    <Text>{text}</Text>
  </Wrapper>
);

export default Button;