import * as React from 'react';
import styled, { css } from 'styled-components';

interface IStyled {
  appear: boolean;
  disappear: boolean;
}

const Wrapper = styled.div`
  position: relative;
  z-index: 999;
`;

const Dimmer = styled.div`
  background: rgba(10,10,10,0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Positioner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  @keyframes modalAppear {
  0% {
    opacity: 0;
    transform: scale(1.25, 1.25);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

@keyframes modalDisappear {
  0% {
    opacity: 1;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(1.25, 1.25);
  }
}
  ${(props: IStyled) => {
    const appear = css`
      animation: modalAppear .15s ease-in-out;
      animation-fill-mode: forwards;
    `;

    const disappear = css`
      animation: modalDisappear .15s ease-in-out;
      animation-fill-mode: forwards;
    `;
    return css`
      ${props.appear && appear};
      ${props.disappear && disappear};

    `;
  }};
`;

interface IProps {
  visible: boolean;
  children: React.ReactNode;
}

interface IState {
  animate: boolean;
}

class ModalWrapper extends React.Component<IProps, IState> {
  public animateId: any;
  public state = {
    animate: false,
  };

  public animate = () => {
    this.setState({
      animate: true,
    });
    this.animateId = setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 150);
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevProps.visible !== this.props.visible) {
      this.animate();
    }
  }
  public componentWillUnmount() {
    clearTimeout(this.animateId);
  }
  public render() {
    const { children, visible } = this.props;
    const { animate } = this.state;

    if (!visible && !animate) return null;
    const disappear = animate && !visible;
    return (
      <Wrapper className="ModalWrapper">
        <Dimmer>
          <Positioner>
            <ModalContent appear={visible} disappear={disappear}>
              {children}
            </ModalContent>
          </Positioner>
        </Dimmer>
      </Wrapper>
    );
  }
}

export default ModalWrapper;