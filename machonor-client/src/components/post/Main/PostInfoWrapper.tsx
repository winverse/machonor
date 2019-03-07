import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 28%;
  margin-left: auto;
  min-height: 100%;
  @media ${media.xxMobile} {
    width: 100%;
    margin-top: 1rem;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const PostInfoWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="PostInfoWrapper">
    {children}
  </Wrapper>
);

export default PostInfoWrapper;