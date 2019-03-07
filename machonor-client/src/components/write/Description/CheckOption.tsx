import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 1.15rem;
`;

const Option = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  margin-top: 1rem;
`;

interface IProps {
  children: React.ReactNode;
}

const CheckOption: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="CheckOption">
    <Name>작성자 공개여부</Name>
    <Option>
      {children}
    </Option>
  </Wrapper>
);

export default CheckOption;