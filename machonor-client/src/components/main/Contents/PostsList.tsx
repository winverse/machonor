import * as React from 'react';
import styled from 'styled-components';

import { 
  TitleBox,
} from 'components/common/Post';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 100%;
`;

interface IProps {
  title: string;
  sort: boolean;
}

const HotPostsList: React.SFC<IProps> = ({ title, sort }) => (
  <Wrapper className="HotPosts">
    <TitleBox
      title={title}
      sort={sort}
    />
  </Wrapper>
);

export default HotPostsList;