/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 100%;
  #cke_editor {
    border: 1px solid #e9ecef;
    border-radius: 5px;
    ${shadow(0)};
  }
  .cke_inner {
    border-radius: 5px;
  }
  .cke_top {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .cke_bottom {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .cke_chrome {
    border: none;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const EditorWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default EditorWrapper;