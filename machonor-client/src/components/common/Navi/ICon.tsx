import * as React from 'react';
import styled from 'styled-components';
import { TiCreditCard, TiMortarBoard, TiLockClosed, TiDocument } from 'react-icons/ti';
// import { FiChevronsLeft } from 'react-icons/fi';
import { FaAngleDoubleLeft } from 'react-icons/fa';

export const Wrapper = styled.div`
  color: white;
  background-color: #E70D1E;
  text-align: center;
  svg {
    font-size: 1.3rem;
    line-height: 1.1rem;
    &:hover {
    cursor: pointer;
    }
  }
  & + & {
    padding-top: 0.5rem;
  }
  &:first-child {
    padding-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    svg {
      display: inline-block;
      margin: 0 auto;
      padding: 0.1rem;
      font-size: 1.2rem;
      border: 1px solid white;
      border-radius: 3px;
    }
  }
  &:nth-child(2) {
    width: 100%;
    display: flex;
    padding-top: 1rem;
    justify-content: center;
    svg {
      display: inline-block;
      margin: 0 auto;
      padding: 0.1rem;
      font-size: 1.2rem;
      border: 1px solid white;
      border-radius: 3px;
    }
  }
  &:nth-child(3) {
    padding-top: 3rem;
  }
  &:nth-child(5)  {
    position: relative;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 0.7rem;
  padding-top: 0.2rem;
  margin-left: -0.1rem;
  width: 100%;
  line-height: 0.7rem;
`;

const providers = {
  buying: {
    icon: TiCreditCard,
  },
  judging: {
    icon: TiMortarBoard,
  },
  completed: {
    icon: TiLockClosed,
  },
  proposal: {
    icon: TiDocument,
  },
  arrow: {
    icon: FaAngleDoubleLeft,
  },
};

interface IProps {
  type: 'buying' | 'judging' | 'completed' | 'proposal' | 'arrow';
  text?: string;
  visible?: boolean;
  onClick?(): void;
}

const ICon: React.SFC<IProps> = ({ type, text, onClick }) => {
  const { icon: Icon } = providers[type];
  return (
    <Wrapper className="ICon" onClick={onClick}>
      <Icon />
      {text === '' ? null : <Text>{text}</Text>}
    </Wrapper>
  );
};

export default ICon;