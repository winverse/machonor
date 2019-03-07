import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import oc from 'open-color';

const Positioner = styled.div`
  margin-top: 2rem;
  width: 100%;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  ${shadow(0)};
  border: 1px solid ${oc.gray[2]};
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

interface IProps {

}

const PostsWrapper: React.SFC<IProps> = ({ children }) => (
  <Positioner className="PostsWrapper">
    {children}
  </Positioner>
);

export default PostsWrapper;