import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(230, 0, 19, 0.949);
  padding-left: 0.85rem;
  padding-right: 0.85rem;
  margin-left: 0.5rem;
  user-select: none;
  cursor: pointer;
`;

const Text = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  @media ${media.xxMobile} {
    font-size: 0.75rem;
    white-space: nowrap;
  }
`;

interface IProps {
  onClick(): void;
}

const Button: React.SFC<IProps> = ({
  onClick,
}) => (
  <Positioner className="Button" onClick={onClick}>
    <Text>검색</Text>
  </Positioner>
);

export default Button;