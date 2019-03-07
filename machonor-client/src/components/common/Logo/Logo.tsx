import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { media } from 'styles/styleUtils';

interface IStyled {
  mode: 'Contents' | 'Navi';
}

const Wrapper = styled.div`
  ${(props: IStyled) => {
    const navi = css `
      width: 100%;
      padding-top: 3rem;
      padding-bottom: 1rem;
      @media ${media.xxMobile} {
        display: none;
      }
    `;
    const contents = css`
      width: 100%;
      display: none;
      @media ${media.Laptop} {
        padding-top: 2rem;
        padding-bottom: 1rem;
        display: block;
      }
    `;
    return css`
      ${props.mode === 'Navi' ? navi : contents};
      width: 100%;
      h4 {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding-right: 1rem;
        padding-top: 0.075rem;
        margin: 0;
        color: rgba(230, 0, 19, 0.949);
        font-style: italic;
        font-weight: 400;
        letter-spacing: -1px;
        font-weight: 600;
        font-size: 0.875rem;
      }
    `;
  }};
`;

const Text = styled(Link)`
  ${(props: IStyled) => {
    return css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Black Han Sans', sans-serif;
      font-size: 2.5rem;
      color: rgba(230, 0, 19, 0.949);
      letter-spacing: 0px;
      font-style: italic;
      width: 100%;
      ${props.mode === 'Contents' ? 'font-size: 2rem' : null };
    `;
  }};
`;

interface IProps {
  mode: 'Contents' | 'Navi';
  naviBar?: boolean;
  children?: React.ReactNode;
}

const Logo: React.SFC<IProps> = ({ mode, naviBar, children }) => (
  <Wrapper className="logoWrapper" mode={mode}>
    <Text to="/main" mode={mode} >
      Mustice
    </Text>
    <h4>{naviBar || children}우리는 정의를 산다</h4>
  </Wrapper>
);

export default Logo;