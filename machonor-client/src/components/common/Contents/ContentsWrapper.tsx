import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface IProps {
  children: React.ReactNode;
}

const ContentsWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="ContentsWrapper">
    {children}
  </Wrapper>
);

export default ContentsWrapper;