import * as React from 'react';
import styled, { css } from 'styled-components';
import { shadow } from 'styles/styleUtils';
import enhanceWithClickOutside from 'react-click-outside';

interface IStyled {
  visible: boolean;
}

const Positional = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.visible ? css`display: block;` : css`display: none;`};
      position: absolute;
      left: -25px;
      top: 40px;
      min-width: 100px;
      background-color: white;
      border-radius: 5px;
      ${shadow(0)};
    `;
  }};
`;

interface IProps {
  onClose(): void;
  visible: boolean;
}

class OptionWrapper extends React.Component<IProps> {
  public handleClickOutside = () => {
    const { onClose, visible } = this.props;
    if (!visible) return;
    setTimeout(() => {
      onClose();
    }, 0);
  }
  public render() {
    const { children, visible } = this.props;
    if (!visible) return null;
    return (
      <Positional className="OptionsWrapper" visible={visible}>
        {children}
      </Positional>
    );
  }
}

export default enhanceWithClickOutside(OptionWrapper);