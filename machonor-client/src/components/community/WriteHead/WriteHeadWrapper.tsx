import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';

const Positioner = styled.div`
  width: 100%;
  background: white;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 5px;
  ${shadow(0)};
  border: 1px solid #e9ecef;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0;
`;

interface IProps {
  title: string;
}

const WriteHeadWrapper: React.SFC<IProps> = ({ title, children }) => (
  <Positioner className="WriteHeadWrapper">
    <Title>{title}</Title>
    {children}
  </Positioner>
);

export default WriteHeadWrapper;