import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Positioner = styled.div`
  width: 300px;
  background-color: white;
  padding: 1rem;
  color: ${oc.gray[9]};
  ${shadow(0)};
`;

const Text = styled.div`
  font-size: 1rem;
  color: ${oc.gray[8]};
  letter-spacing: -1px;
`;

interface IProps {
  text: string;
}

const ModalWrapper: React.SFC<IProps> = ({ 
  children,
  text,
 }) => (
  <Positioner className="ModalWrapper">
    <Text>{text}</Text>
    {children}
  </Positioner>
);

export default ModalWrapper;