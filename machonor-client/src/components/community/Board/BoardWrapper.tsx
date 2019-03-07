import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import oc from 'open-color';

const Positioner = styled.div`
  margin-top: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  ${shadow(0)};
  padding: 2rem;
  border: 1px solid ${oc.gray[2]};
  @media ${media.xxMobile} {
    padding: 1rem 0.5rem;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const BoardWrapper: React.SFC<IProps> = ({ children }) => (
  <Positioner className="Board">
    {children}
  </Positioner>
);

export default BoardWrapper;