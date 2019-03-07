import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  border-radius: 5px;
  margin-top: 2rem;
`;

const Button = styled.div`
  background-color: rgba(230, 0, 19, 0.949);
  border-radius: 5px;
  color: white;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  margin-top: auto;
  ${shadow(0)};
  &:hover {
    background-color: ${oc.red[7]};
  }

  &:active {
    transform: translateY(2px);
    background-color: ${oc.red[9]};
  }
  & + & {
    margin-top: 1rem;
  }

  &:last-child {
    background-color: ${oc.gray[6]};
  }
`;

interface IProps {

}

const PostButton: React.SFC<IProps> = () => (
  <Wrapper className="PostButton">
    <Button>정의구매하기</Button>
    <Button>공익제보하기</Button>
  </Wrapper>
);

export default PostButton;