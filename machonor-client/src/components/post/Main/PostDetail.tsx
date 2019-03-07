import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import { FaCalendarAlt, FaTags } from 'react-icons/fa';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 2rem 1rem;
  ${shadow(0)};
  @media ${media.xxMobile} {
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  &:first-child{
    margin-top: 0;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const Title = styled.span`
  margin-right: 0.5rem;
  font-weight: 600;
  color: #23242b;
`;

const Value = styled.div`
  font-size: .875rem;
  margin: 0;
  color: #8e919d;
`;

const ValueBox = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

const TagName = styled(Link)`
  display: inline-block;
  background-color: ${oc.pink[1]};
  color: #2c2d33;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  margin: 3px;
`;

const tags = ['신군부', '전두환', '광주민주화운동'];

interface IProps {

}

const tagList = tags.map(
  (tag, i) => (
  <TagName to="/" key={i}>{`#\t${tag}`}</TagName>
  ),
);

const PostDetail: React.SFC<IProps> = () => (
  <Wrapper className="PostDetail">
    <ContentWrapper>
      <FaCalendarAlt/>
      <Title>작성일</Title>
    </ContentWrapper>
      <ValueBox>
        <Value>2018년 10월 11일 </Value>
      </ValueBox>
    <ContentWrapper>
      <FaCalendarAlt/>
      <Title>작성자</Title>
    </ContentWrapper>
    <ValueBox>
      <Value>익명 </Value>
    </ValueBox>
    <ContentWrapper>
      <FaTags/>
      <Title>태그</Title>
    </ContentWrapper>
    <ValueBox>
      {tagList}
    </ValueBox>
  </Wrapper>
);

export default PostDetail;