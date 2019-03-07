import * as React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'styles/styleUtils';

interface IStyled {
  showNavibar: boolean;
  visible: boolean | null;
}

const Wrapper = styled.div`
  ${(props: IStyled) => {
    return css`
    /* @keyframes barAppear {
      0% {
        opacity: 0;
        margin-left: -32px;
      }
      100% {
        opacity: 1;
        margin-left: 32px;
      }
    }

    @keyframes barDisappear {
      0% {
        opacity: 1;
        margin-left: 32px;
      }
      100% {
        opacity: 0;
        margin-left: -32px;
      }
    } */
      position: relative;
      z-index: 200;
      width: 280px;
      min-height: 110vh;
      @media ${media.xxMobile} {
        width: 32px;
        ${props.showNavibar === false ? 
        css` 
          /* 사라질때 */
          margin-left: -32px;
          transition: margin-left 0.5s cubic-bezier(0.49, 0.01, 0.14, 0.86);
        `
        : 
        css`
          /* 나타날떄 */
          transition: margin-left 0.5s cubic-bezier(0.49, 0.01, 0.14, 0.86);
        `};
      }
    `;
  }};
`;

interface IProps {
  showNavibar: boolean;
  visible: boolean | null;
  children: React.ReactNode;
}

const NaviMain: React.SFC<IProps> = ({ children, visible, showNavibar }) => (
  <Wrapper visible={visible} showNavibar={showNavibar}>
    {children}
  </Wrapper>
);

export default NaviMain;