import * as React from 'react';
import styled from 'styled-components';

import Board from './Board';
import DarkBox from './DarkBox';
import Description from './Description';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 48%;
  border-radius: 5px;
  user-select: none;
  &:nth-child(1) {
    margin-top: 0;
  }

  &:nth-child(2) {
    margin-top: 0;
  }

  &:nth-child(2n) {
    margin-left: auto;
  }
  @media ${media.xxMobile} {
    width: 100%;

    & + & {
      margin-top: 1rem;
    }
  }
`;

interface IProps {
  data: any;
}

const CardWrapper: React.SFC<IProps> = ({ data }) => {
  const {
    amount,
    title,
  } = data;

  return (
    <Wrapper className="CardWrapper">
      <Board amount={amount}>
        <DarkBox />
      </Board>
      <Description title={title} />
    </Wrapper>
  );
};

export default CardWrapper;