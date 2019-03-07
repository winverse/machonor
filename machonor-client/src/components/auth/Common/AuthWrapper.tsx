import * as React from 'react';
import styled from 'styled-components';

import { shadow, media } from 'styles/styleUtils';
import { Logo } from 'components/auth/Common';

const Wrapper = styled.div`
  width: 450px;
  background-color: white;
  ${shadow(2)};
  @media ${media.xxMobile} {
    /* value is 80% of full width  */
    width: 340.4px; 
  }
  @media ${media.xMobile} {
    width: 308px;
  }
`;

const ContentsWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  @media ${media.xxMobile} {
    padding: 1.5rem;
  }
`;

interface IProps {
  onClick(): void;
  children: React.ReactNode;
}

const AuthWrapper: React.SFC<IProps> = ({ onClick, children }) => (
  <Wrapper className="AuthWrapper">
    <Logo onClick={onClick}/>
    <ContentsWrapper>
      {children}
    </ContentsWrapper>
  </Wrapper>
);

export default AuthWrapper;