import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  position: relative;
  margin-left: auto;
  @media ${media.xxMobile} {
    display: flex;
    width: 100%;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const SearchWrapper: React.SFC<IProps> = ({ children }) => (
  <Positioner className="SearchWrapper">
    {children}
  </Positioner>
);

export default SearchWrapper;