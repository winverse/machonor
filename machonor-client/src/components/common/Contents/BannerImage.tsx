import * as React from 'react';
import styled from 'styled-components';

import { shadow } from 'styles/styleUtils'; 
import GG from 'static/image/gg.jpg';

const Wrapper = styled.div`
  margin-top: 2rem;
  max-width: 100%;
  min-width: 100%;
  height: 200px;
  border-radius: 5px;
  ${shadow(0)};
`;

const Image = styled.img`
  border-radius: 5px;
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  min-width: 100%;
`;

interface IProps {

}

const BannerImage: React.SFC<IProps> = () => (
  <Wrapper className="BannerImage">
    <Image src={GG}/> 
  </Wrapper>
);

export default BannerImage;