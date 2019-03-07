import * as React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import PostCard from './PostCard';
import TitleBox from './TitleBox';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 100%;
`;

const MasonryWrapper = styled(Masonry)`
  width: 100%;
`;

interface IProps {
  title: string;
  sort: boolean;
}

const PostList: React.SFC<IProps> = ({ title, sort }) => (
  <Wrapper>
    <TitleBox sort={sort} title={title}/>
    <MasonryWrapper options={{ gutter: 30 }}>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </MasonryWrapper>
  </Wrapper>
);

export default PostList;