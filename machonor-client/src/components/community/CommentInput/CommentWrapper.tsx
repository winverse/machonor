import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';

const Positioner = styled.div`
  margin-top: 1rem;
  background-color: white;
  width: 100%;
  padding: 2rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border-radius: 5px;
  ${shadow(0)};
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

interface IProps {
  CommentInput: React.ReactNode;
}

const CommentWrapper: React.SFC<IProps> = ({ children, CommentInput }) => (
  <React.Fragment>
    {CommentInput}
    <Positioner className="CommentWrapper">
      {children}
    </Positioner>
  </React.Fragment>
);

export default CommentWrapper;