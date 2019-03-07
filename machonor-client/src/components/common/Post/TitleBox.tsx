import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';
import { FaAngleDown } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Title = styled.div`
  transform: translateY(50%);
  color: black;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Sort = styled.select`
  position: relative;
  margin-left: auto;
  display: flex;
  justify-content: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  padding: 0.25rem 0.5rem;
  padding-right: 2rem;
  outline: none;
  border: none;
  ${shadow(0)};

  &::-ms-expand {
    display: none;
  }
`;

const Option = styled.option`
  margin: 0 auto;
`;

const Arrow = styled(FaAngleDown)`
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  font-size: 1rem;
  color: black;
`;

interface IProps {
  title: string;
  sort: boolean;
}

const TitleBox: React.SFC<IProps> = ({ title, sort }) => {
  const sorting = (
    <Sort>
      <Option value="recently">최신정의</Option>
      <Option value="particiant">참여자</Option>
      <Option value="amount">금액</Option>
    </Sort>
  );
  return (
    <Wrapper className="TitleBox">
      <Title>{title}</Title>
      {sort && sorting}
      {sort && <Arrow/>}
    </Wrapper>
  );
};

export default TitleBox;