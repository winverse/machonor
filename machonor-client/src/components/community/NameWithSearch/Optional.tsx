import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  background-color: #F9FAFC;
  border: 1px solid #e1e2e6;
  font-size: 0.87rem;
  color: #23242b;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  @media ${media.xxMobile} {
    white-space: nowrap;
  }
`;

interface IProps {
  option: string;
  onClick(): void;
}

const Optional: React.SFC<IProps> = ({ 
  option, 
  onClick,
}) => (
  <Positioner className="Optional" onClick={onClick}>
    {option}
  </Positioner>
);

export default Optional;