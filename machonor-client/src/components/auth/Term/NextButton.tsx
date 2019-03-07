import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
  background-color: rgba(230, 0, 19, 0.949);
  padding: 0.75rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: ${oc.red[9]};
  }
  &:active {
    transform: translateY(2px);
    filter: brightness(110%);
  }
`;

const Text = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

interface IProps {
  onClick(): void;
}

const NextButton: React.SFC<IProps> = ({ onClick }) => (
  <Wrapper className="NextButton" onClick={onClick}>
    <Text>회원가입</Text>
  </Wrapper>
);

export default NextButton;