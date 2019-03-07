import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Wrapper = styled.aside`
  margin-left: 60px;
  width: 200px;

  @media ${media.xxMobile} {
    display: none;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const AsideWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default AsideWrapper;