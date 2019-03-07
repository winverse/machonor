import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'styles/styleUtils';

const Positioner = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-flow: row wrap;
  background-color: white;
  border-radius: 5px;
  ${shadow(0)};
  padding: 1rem;
  border: 1px solid ${oc.gray[2]};
  @media ${media.xxMobile} {
    background-color: transparent;
    box-shadow: none;
    border: none;
    padding: 0;
  }
`;

interface IProps {
  list: any[];
  children: React.ReactNode;
}

const PagenationWrapper: React.SFC<IProps> = ({ children, list }) => {
  const listed = list || [];
  if (listed.length === 0) return null;
  return (
    <Positioner className="PagenationWrapper">
      {children}
    </Positioner>
  );
};

export default PagenationWrapper;