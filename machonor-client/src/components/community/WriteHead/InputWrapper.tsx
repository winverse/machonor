import * as React from 'react';
import styled, { css } from 'styled-components';

const Positioner = styled.div`
  ${(props: IProps) => {
    return css`
      flex-flow: row nowrap;
      margin-top: 1rem;
      ${props.visible === true ? 
        css`display: flex;` : 
        css`display: none;`
      }
    `;
  }}; 
`;

interface IProps {
  visible: boolean;
}

const InputWrapper: React.SFC<IProps> = ({ visible, children }) => (
  <Positioner className="InputWrapper" visible={visible}>
    {children}
  </Positioner>
);

export default InputWrapper;