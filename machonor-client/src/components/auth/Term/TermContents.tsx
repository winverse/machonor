import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 65px;
  overflow: auto;
  overflow-x: hidden;
  margin-top: 1rem;
`;

const Text = styled.pre`
  display: block;
  line-height: 1.2rem;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  letter-spacing: -1px;
`;

const Pre = styled.div`
  margin: 0;
  overflow-y: scroll;
`;

interface IProps {
  contents: string;
}

const TermContents: React.SFC<IProps> = ({ contents }) => (
  <Wrapper className="TermContents">
    <Text>
      <Pre>{contents}</Pre>
    </Text>
  </Wrapper>
);

export default TermContents;