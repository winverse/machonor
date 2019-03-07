import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Positioner = styled.h2`
  font-size: 1.79rem;
  color: #2b2b2b;
  padding: 0rem;
  font-weight: 600;
  margin: 0;
  @media ${media.xxMobile} {
    font-size: 1.25rem;
  }
`;

interface IProps {
  name: string;
}

const Name: React.SFC<IProps> = ({ name }) => (
  <Positioner className="Name">
    {name}
  </Positioner>
);

export default Name;