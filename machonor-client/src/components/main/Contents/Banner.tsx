import * as React from 'react';
import styled, { css } from 'styled-components';
import Carousel from 'nuka-carousel';

import image5 from 'static/image/66.jpg';
import image6 from 'static/image/23.jpg';
import image7 from 'static/image/34.jpg';
import image8 from 'static/image/45.jpg';
import { shadow, media } from 'styles/styleUtils';

interface IStyled {
  isWidth: number;
  visible: boolean;
}

const Wrapper = styled.div`
  max-width: 100%;
  margin-top: 2rem;
  background-color: white;
  height: 200px;
  border-radius: 5px;
  ${shadow(0)};
  overflow: hidden;
`;

const Slick = styled(Carousel)`
  ${(props: IStyled) => {
    return css`
      width: 100% !important;
      button {
        box-shadow: none !important;
      }
      .slider-control-centerleft{
        display: none;
      }
      .slider-control-centerright{
        display: none;
      }
      @media ${media.xxMobile} {
        .slider-slide {
        ${props.visible === true ? css`
          width: ${`${props.isWidth - 45}px`} !important;
        ` : css`
          width: ${`${props.isWidth - 3.19}px`} !important;
        `}
      }
      }
    `;
  }}
`;

const ImageBox = styled.div`
  object-fit: cover;
  height: 200px;
  border-radius: 5px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  min-width: 100%;
  border-radius: 5px;
`;

interface IProps {
  width: number;
  NavBarVisible: boolean;
}

class Banner extends React.Component<IProps> {
  public ref: any = null;
  constructor(props: IProps) {
    super(props);
    this.ref = React.createRef();
  }
  public componentDidMount = () => {
    const { ref } = this;
    if (!ref.current) return;
    // ref.current.startAutoplay();
  }
  public componentWillUnmount() {
    const { ref } = this;
    if (!ref.crrent) return;
    ref.current.stopAutoplay();
  }
  public render() {
    const { width, NavBarVisible } = this.props;
    return (
      <Wrapper className="ContentsBannerWrapper">
        <Slick
          ref={this.ref}
          isWidth={width}
          visible={NavBarVisible}
        >
          <ImageBox>
            <Image src={image5}/>
          </ImageBox>
          <ImageBox>
            <Image src={image6}/>
          </ImageBox>
          <ImageBox>
            <Image src={image7}/>
          </ImageBox>
          <ImageBox>
            <Image src={image8}/>
          </ImageBox> 
        </Slick>
      </Wrapper>
    );
  }
}

export default Banner;