import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  color: ${oc.gray[5]};
  font-size: 0.9rem;
`;

const Text = styled.span`
  margin-right: 0.5rem;
`;

const To = styled.span`
  color: ${oc.red[5]};
  border-bottom: 1px solid ${oc.red[4]};
  cursor: pointer;
`;

interface IProps {
  text: string;
  to: string;
  onClick(): void;
}

const AleadyQuestion: React.SFC<IProps> = ({
  text,
  to,
  onClick,
}) => (
  <Wrapper className="AleadyQuestion" onClick={onClick}>
    <Text>{text}</Text>
    <To>{to}</To>
  </Wrapper>
);

export default AleadyQuestion;