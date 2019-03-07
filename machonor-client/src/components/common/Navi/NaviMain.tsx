import * as React from 'react';
import styled, { css } from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import { media } from 'styles/styleUtils';
import oc from 'open-color';

interface IStyled {
  appear: boolean;
  disappear: boolean;
  
}

const Wrapper = styled.div`
      @keyframes naviAppear {
      0% {
        opacity: 0;
        margin-left: -100px;
      }
      100% {
        opacity: 1;
        margin-left: 32px;
      }
    }

    @keyframes naviDisappear {
      0% {
        opacity: 1;
        margin-left: 32px;
      }
      100% {
        opacity: 0;
        margin-left: -100px;
      }
    }
  ${(props: IStyled) => {
    const appear = css`
      animation: naviAppear 0.25s cubic-bezier(0.49, 0.01, 0.14, 0.86);
      animation-fill-mode: forwards;
    `;
    const disappear = css`
      animation: naviDisappear 0.25s cubic-bezier(0.49, 0.01, 0.14, 0.86);
      animation-fill-mode: forwards;
    `;
    return css`
    position: fixed;
    top: 0;
    /* left: auto; */
    width: 230px;
    margin-left: 50px;
    min-height: 100%;
    background: white;
    border: 1px solid ${oc.gray[2]};
      @media ${media.xxMobile} {
        width: 230px;
        z-index: 100;
        margin-left: 32px;
        ${props.appear && appear}
        ${props.disappear && disappear}
      }
    `;
  }};
`;

interface IProps {
  width: number;
  visible: boolean;
  pathname: string;
  onControlNav(): void;
  onCloseNav(): void;
}

interface IState {
  animating: boolean;
  pathname: string;
}

class NaviMain extends React.Component<IProps, IState> {
  public animateTimeout: any;

  public state = {
    animating: false,
    pathname: '',
  };
  public handleClickOutside = () => {
    const { onCloseNav, width } = this.props;
    if (width <= 425) {
      onCloseNav();
    }
  }

  public animate = () => {
    clearTimeout(this.animateTimeout);
    this.setState({
      animating: true,
    });
    this.animateTimeout = setTimeout(() => {
      this.setState({
        animating: false,
      });
    }, 250);
  }

  public componentDidMount() {
    const { pathname } = this.props;
    const { animating } = this.state;
    this.setState({
      pathname,
      animating,
    });
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { pathname } = this.state;
    const { width, visible } = this.props;
    if (prevProps.visible !== this.props.visible) {
      this.animate();
    }
    if (prevState.pathname !== pathname && visible) {
      if (width <= 425) {
        this.props.onControlNav();
      }
    }
  }

  public componentWillUnmount() {
    clearTimeout(this.animateTimeout);
  }

  public render() {
    const { visible, children } = this.props;
    const { animating } = this.state;
    if (!visible && !animating) return null;
    const disappear = animating && !visible;
    return (
      <Wrapper appear={visible} disappear={disappear}>
        {children}
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(NaviMain);