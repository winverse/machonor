import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 200px;
  height: 40px;
  background-color: rgba(230, 0, 19, 0.949);
  user-select: none;
  cursor: pointer;
`;

const Text = styled.div`
  color: white;
  font-weight: 600;
`;

interface IProps {
  onClick(): void;
}

const Button: React.SFC<IProps> = ({
  onClick,
}) => (
  <Wrapper className="Button" onClick={onClick}>
    <Text>정의작성하기</Text>
  </Wrapper>
);

export default Button;