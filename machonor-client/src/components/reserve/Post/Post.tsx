import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import oc from 'open-color';
import CircularProgressbar from 'react-circular-progressbar';
import { IoIosPeople } from 'react-icons/io';
import { TiMessages } from 'react-icons/ti';

export const Wrapper = styled.div`
  margin-top: 2rem; 
  background-color: white;
  width: 48%;
  height: 174px;
  border-radius: 5px;
  ${shadow(0)};
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid #e9ecef;

  & + & {
    &:hover {
      box-shadow: 0 0 0 0.1rem ${oc.red[4]};
    }
  }

  @media ${media.xxMobile} {
    width: 100%;
  }
`;

const PostHead = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.5rem;
  background-color: ${oc.gray[1]};
`;

const Displayname = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: ${oc.gray[8]};
  margin-left: 0.5rem;
`;

const Time = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${oc.gray[5]};
  margin-right: 0.5rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const CircleWrapper = styled.div`
  display: flex;
  width: 35%;
  justify-content: center;
  align-items: center;
  
  .CircularProgressbar {
    width: 70%;
  }
  .CircularProgressbar .CircularProgressbar-trail {
    stroke: #F6F7F9;
  }
  .CircularProgressbar .CircularProgressbar-path {
    transition: all 10s ease-in-out;
    stroke: rgba(230, 0, 19, 0.949);
  }
  .CircularProgressbar .CircularProgressbar-text {
    fill: black;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-right: 1rem;
  display: flex;
  width: 65%;
`;

const Title = styled.span`
  border-radius: 5px;
  background-color: ${oc.orange[0]};
  padding: 0.5rem;
  font-size: 0.95rem;
  /* 한 줄 자르기 */ 
  display: inline-block; 
  width: 230px;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  /* 여러 줄 자르기 추가 스타일 */ 
  white-space: normal; 
  line-height: 1.2;
  text-align: left; 
  word-wrap: break-word; 
  display: -webkit-box; 
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  font-weight: 600;
  transition: all 0.25s ease;
  ${Wrapper}:hover & {
    color: ${oc.red[6]};
    background-color: ${oc.gray[0]};
  }
`;

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikesCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${oc.gray[5]};
  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

interface IProps {
  title: string;
  likesCount: number;
  date: string;
  liked: boolean;
  commentCount: number;
  writer: string;
  number: number;
}

const Post: React.SFC<IProps> = ({
  title,
  likesCount,
  date,
  liked,
  commentCount,
  writer,
  number,
}) => {
  const result = Math.floor((likesCount / 50) * 100);
  return(
    <Wrapper className="Post">
      <PostHead>
        <Displayname>{`@${writer}`}</Displayname>
        <Time>{date}</Time>
      </PostHead>
      <InnerWrapper>
        <CircleWrapper>
          <CircularProgressbar 
            percentage={result}
            text={`${result}%`}
          />
        </CircleWrapper>
        <InfoWrapper>
          <Title>{title.length >= 40 ? `${title.slice(0, 37)}...` : title}</Title>
          <DetailsBox>
            <LikesCount><IoIosPeople />밀어준 사람들 {likesCount}</LikesCount>
            <LikesCount><TiMessages />댓글 {commentCount} </LikesCount>
          </DetailsBox>
        </InfoWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Post;