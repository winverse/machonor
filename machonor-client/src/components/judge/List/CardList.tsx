import * as React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import data from 'components/judge/data';
import Card from '../Card/Card';

const Wrapper = styled.div`
  position: relative;
`;

const MasonryWrapper = styled(Masonry)`
  width: 100%;
`;

interface IProps {

}

const cardList = data && data.map(
  (data, i) => (
    <Card key={i} data={data}/>
  ),
);

const CardList: React.SFC<IProps> = () => (
  <Wrapper className="CardList">
    <MasonryWrapper options={{ gutter: 32 }}>
      {cardList}
    </MasonryWrapper>
  </Wrapper>
);

export default CardList;