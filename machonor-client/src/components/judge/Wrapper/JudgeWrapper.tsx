import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

interface IProps {
  children: React.ReactNode;
}

const JudgeWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="JudgeWrapper">
    {children}
  </Wrapper>
);

export default JudgeWrapper;