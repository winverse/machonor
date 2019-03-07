import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  margin-top: 6rem;
  width: 100%;
`;

interface IProps {
  children: React.ReactNode;
}

const AsideWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="AsideWrapper">
    {children}
  </Wrapper>
);

export default AsideWrapper;