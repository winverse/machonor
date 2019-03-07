import * as React from 'react';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
import Masonry from 'react-masonry-component';

import { Post } from 'components/reserve/Post';
import ProposalButton from './ProposalButton';
import data from '../data';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const MasonryWapper = styled(Masonry)`
  width: 100%;
`;

interface IProps {

}

const DataList = data && data.map(
  (data, i) => {
    const {
      title,
      likesCount,
      date,
      liked,
      commentCount,
      writer,
      number,
    } = data;
    return (
      <Post 
        key={i}
        title={title}
        commentCount={commentCount}
        date={date}
        liked={liked}
        likesCount={likesCount}
        writer={writer}
        number={number}
      />
    );
  },
);

const PostsList: React.SFC<IProps> = () => (
  <Wrapper className="PostsList">
    <MasonryWapper options={{ gutter: 32 }}>
      <ProposalButton />
      {DataList}
    </MasonryWapper>
  </Wrapper>
);

export default PostsList;