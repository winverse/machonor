import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 2rem;
  width: 100%;

  @media ${media.xxMobile} {
    flex-flow: row wrap;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const InfoBox: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="PostWrapper">
    {children}
  </Wrapper>
);

export default InfoBox;