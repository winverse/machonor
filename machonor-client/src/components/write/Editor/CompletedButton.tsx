import * as React from 'react';
import styled from 'styled-components';
import { MdCreate } from 'react-icons/md';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-top: 2rem;
  background-color: rgba(230, 0, 19, 0.949);
  padding: 0.375rem 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  outline: none;
  svg {
    margin-right: 0.25rem;
    font-size: 0.9rem;
  }
  &:hover {
    background-color: rgba(230, 0, 19, 0.849);
  }
  &:active {
    background-color: rgba(230, 0, 19, 1);
  }
`;

const Text = styled.div`
  color: white;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: -2px;
`;

interface IProps {
  text: string;
  onClick(e: any): void;
}

const CompletedButton: React.SFC<IProps> = ({ onClick, text }) => (
  <Wrapper className="CompletedButton" onClick={onClick}>
    <MdCreate/>
    <Text>{text}</Text>
  </Wrapper>
);

export default CompletedButton;