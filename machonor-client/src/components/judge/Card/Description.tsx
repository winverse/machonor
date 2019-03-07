import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';
import oc from 'open-color';

const Wrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding-top: calc((202px - 3rem) + 1rem);
  ${shadow(0)};
  border-radius: 5px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  border: 1px solid #e9ecef;
`;

const Title = styled.div`
  margin-top: 0.5rem;
  font-size: 1.15rem;
  line-height: 1.3rem;
  color: ${oc.gray[8]};
  font-weight: 600;
  border-radius: 5px;
  word-break: keep-all;
`;

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const Description: React.SFC<IProps> = ({ title, children }) => (
  <Wrapper className="Description">
    <Title>{title}</Title>
    {children}
  </Wrapper>
);

export default Description;