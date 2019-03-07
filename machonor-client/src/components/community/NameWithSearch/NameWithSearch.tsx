import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  @media ${media.xxMobile} {
    flex-flow: column nowrap;
    width: 100%;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const NameWithSearch: React.SFC<IProps> = ({ children }) => (
  <Positioner className="NameWithSearch">
    {children}
  </Positioner>
);

export default NameWithSearch;