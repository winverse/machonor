import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Positioner = styled.div`
  width: 100%;
  color: #23242b;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #F9FAFC;
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  & + & {
    border-top: 1px solid ${oc.gray[3]};
  }
`;

interface IProps {
  title: string;
  onClick(e: any): void;
}

const OptionItems: React.SFC<IProps> = ({ 
  title,
  children, 
  onClick,
}) => (
  <Positioner className="OptionItems" onClick={onClick} title={title}>
    {children}
  </Positioner>
);

export default OptionItems;