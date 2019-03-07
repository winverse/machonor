import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: Rgba(230, 0, 19, 0.949);
  user-select: none;
  padding: 1.25rem;
  cursor: pointer;

  @media ${media.xxMobile} {
    padding: 1rem;
  }
`;  

const Text = styled.div`
  color: white;
  font-weight: 400;
  font-size: 1.79rem;
  font-family: 'Black Han Sans', sans-serif;
  font-style: italic;
  letter-spacing: 0px;
  @media ${media.xxMobile} {
    font-size: 1.5rem;
  }
`;

interface IProps {
  onClick(): void;
}

const Logo: React.SFC<IProps> = ({ onClick }) => (
  <Wrapper className="Logo" onClick={onClick}>
    <Text>우리는 정의를 산다</Text>
  </Wrapper>
);

export default Logo;