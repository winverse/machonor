import * as React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import oc from 'open-color';

import { shadow, media } from 'styles/styleUtils';
import beautiful from 'static/image/Beautiful.jpg';
import happy from 'static/image/happy.jpg';
import join from 'static/image/join.jpg';
import koreaPress from 'static/image/koreaPress.jpg';
import memorial from 'static/image/memorial.jpg';

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const MasonryWapper = styled(Masonry)`
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  color: #212842;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0px;
  margin-bottom: 1rem;
  @media ${media.xxMobile} {
    margin-bottom: 0rem;
  }
`;

const CardWrapper = styled.div`
  width: calc((100% - 60px) / 3);
  height: 200px;
  background-color: white;
  ${shadow(0)};
  border-radius: 5px;
  z-index: 10;
  padding-bottom: 1rem;
  &:nth-child(n+4) {
    margin-top: 2rem;
  }
  @media ${media.xxMobile} {
    width: 100%;
    &:nth-child(n+1) {
      margin-top: 1rem;
    }
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Image = styled.img`
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  object-fit: contain;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const GroupName = styled.div`
  padding-left: 1rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${oc.gray[9]};
  letter-spacing: -1px;
`;

const Description = styled.p`
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${oc.gray[6]};
  margin-top: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: -1px;
  line-height: 1.1rem;
  word-break: keep-all;
`;

interface IOzCard {
  name: string;
  thumbnail: string;
  text: string;
}

const OzCard: React.SFC<IOzCard> = ({ name, thumbnail, text }) => {
  return (
    <CardWrapper>
      <ImageBox>
        <Image src={thumbnail}/>
      </ImageBox>
      <GroupName>{name}</GroupName>
      <Description>
        {text}
      </Description>
    </CardWrapper>
  );
};

interface IProps {
  NGORef: any;
}

const PostWithNGO: React.SFC<IProps> = ({ NGORef }) => (
  <Wrapper className="PostWithOZ" ref={NGORef}>
    <Title>함께하는 재단</Title>
    <MasonryWapper options={{ gutter: 30 }}>
      <OzCard 
        name="5.XX 기념재단"
        thumbnail={memorial}
        text="5 18 광주민주항쟁, 사진자료, 체험관, 증언록 제공."
      />
      <OzCard 
        name="행복나눔재단"
        thumbnail={happy}
        text="창의적이고 지속가능한 사업 모델을 개발·확산하는 사회공헌 전문재단"
      />
      <OzCard 
        name="한국언론진흥재단"
        thumbnail={koreaPress}
        text="서울특별시 중구 태평로 위치, 미디어발전 지원, 정책연구, 정부광고대행, 기금사업 등 소개."
      />
      <OzCard 
        name="아름다운재단"
        thumbnail={beautiful}
        text="기부 문화 정착 및 확산 캠페인 전개, 비영리 공익재단, 1% 나눔운동 소개."
      />
      <OzCard 
        name="참여연대"
        thumbnail={join}
        text="참여연대는 정부, 특정 정치세력, 기업에 정치적 재정적으로 종속되지 않고 독립적으로 활동합니다."
      />
    </MasonryWapper>
  </Wrapper>
);

export default PostWithNGO;