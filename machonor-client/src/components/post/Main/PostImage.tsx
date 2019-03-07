import * as React from 'react';
import styled from 'styled-components';

import { shadow, media } from 'styles/styleUtils';
import image from 'static/image/77.jpg';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 68%;
  min-height: 100%;
  background: white;
  ${shadow(0)};
  border-radius: 5px;
  position: relative;
  padding: 2rem;
  @media ${media.xxMobile} {
    width: 100%;
    padding: 0.5rem;
  }
`;

const Text = styled.h1`
  color: #212121;
  font-size: 2rem;
  line-height: 2rem;
  word-break: keep-all;
  width: 100%;
  margin-top: 0;
  margin-bottom: 2rem;
  line-height: 2.5rem;
  @media ${media.xxMobile} {
    font-size: 1.25rem;
  }
`;

const Sub = styled.div`
  color: ${oc.gray[5]};
  margin-bottom: 2rem;
`;

const ImageBox = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 350px;
`;

const Img = styled.img`
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  border-radius: 5px;
`;

interface IProps {

}

const Image: React.SFC<IProps> = () => (
  <Wrapper className="Image">
    <Text>전두환 발포 명령 증거&증인 확보와 구속을 위해서 동참해주십시오.</Text>
    <Sub>이 프로젝트는 참여연대, 참교육모임회 등과 함께 합니다.</Sub>
    <ImageBox>
      <Img src={image} alt=""/>
    </ImageBox>
  </Wrapper>
);

export default Image;