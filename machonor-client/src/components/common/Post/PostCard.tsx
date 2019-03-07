import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow, media } from 'styles/styleUtils';

import image from 'static/image/77.jpg';
import oc from 'open-color';

const Wrapper = styled.div`
  padding-bottom: 1rem;
  width: calc((100% - 60px) / 3);
  background-color: white;
  border-radius: 5px;
  ${shadow(0)};
  border: 1px solid ${oc.gray[2]};
  &:nth-child(n+4) {
    margin-top: 1rem;
  }
  @media ${media.xxMobile} {
    width: 100%;
    & + & {
      margin-top: 1rem;
    }
  }
`;

const ImageBox = styled(Link)`
  width: 100%;
  height: 190px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Thumbnail = styled.img`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  min-width: 100%;
  max-width: 100%;
  min-height: 190px;
  max-height: 190px;
`;

const ContentsBox = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

// max length 45;
const Title = styled(Link)`
  color: ${oc.gray[8]};
  font-size: 0.9rem;
  font-weight: 600;
  width: 100%;
  height: 47px;
  word-wrap: break-word;
  word-break: keep-all;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Writer = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  color: ${oc.gray[5]};
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: -2px;
`;

const Line = styled.div`
  margin-top: 0.8rem;
  border-top: 2px solid red;
  margin-bottom: 0.8rem;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  letter-spacing: 0px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Collection = styled.div`
  color: ${oc.gray[8]};
`;

const Participant = styled.div`

`;

interface IProps {

}

const Post: React.SFC<IProps> = () => {
  return (
    <Wrapper className="Post">
      <ImageBox to="/@전두환은전화기/전두환-5.18-발포-명령-증거&증인-확보와-구속을-위해서-동참해주십시오.-djkfljl32">
        <Thumbnail src={image}/>
      </ImageBox>
      <ContentsBox>
        <Title to="/@전두환은전화기/전두환-5.18-발포-명령-증거&증인-확보와-구속을-위해서-동참해주십시오.-djkfljl32">
          전두환 5.18 발포 명령 증거&증인 확보와 구속을 위해서 동참해주십시오.
        </Title>
        <Writer to="/@전두환은전화기">
          전두환은전화기
        </Writer>
        <Line />
        <DetailBox>
          <Participant>213,223 참여</Participant>
          <Collection>7,999,990,000원</Collection>
        </DetailBox>
      </ContentsBox>
    </Wrapper>
  );
};

export default Post;