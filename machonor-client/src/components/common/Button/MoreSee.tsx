import * as React from 'react';
import styled from 'styled-components';
import { MdAddCircleOutline } from 'react-icons/md';
import oc from 'open-color';

import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  ${shadow(0)};
  margin-top: 2rem;
  user-select: none;
  cursor: pointer;
  color: ${oc.gray[6]};
  &:hover{
    background-color: ${oc.gray[1]};
  }
  &:active {
    background-color: ${oc.gray[0]};
  }
  svg {
    margin-right: 0.5rem;
    margin-top: 0.1rem;
  }
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
`;

interface IProps {
  text: string;
}

const MoreSee: React.SFC<IProps> = ({ text }) => (
  <Wrapper className="MoreSee">
    <MdAddCircleOutline />
    <Text>{text}</Text>
  </Wrapper>
);

export default MoreSee;