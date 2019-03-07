import * as React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'styles/styleUtils';

interface IStyled {
  path?: string;
  showNavibar: boolean;
}
const Wrapper = styled.div`
  ${(props: IStyled) => {
    const postWidth = css`
      width: 850px;
    `;
    const defaultWidth = css`
      width: 800px;
    `;
    return css`
      display: block;
      margin-left: 60px;
      height: 100%;
      ${props.path === '/@:username/:urlSlug' ? postWidth : defaultWidth };
      transition: all 0.5s cubic-bezier(0.49, 0.01, 0.14, 0.86);
      @media ${media.xxMobile} {
        width: calc(100% - 32px);
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        margin-left: 0;
        ${props.showNavibar === false ? 
        css`
          width: 100%;
        ` 
        : ''};
      }
    `;
  }};
`;

interface IProps {
  path?: string;
  children: React.ReactNode;
  showNavibar: boolean;
}

const ContentsWrapper: React.SFC<IProps> = ({ children, path, showNavibar }) => (
  <Wrapper path={path} showNavibar={showNavibar}>
    {children}
  </Wrapper>
);

export default ContentsWrapper;