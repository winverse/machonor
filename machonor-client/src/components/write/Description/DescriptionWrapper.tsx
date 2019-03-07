import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  ${shadow(0)};
  margin-top: 2rem;
  width: 100%;
  padding: 2rem;
  border: 1px solid #e9ecef;
`;

interface IProps {
  children: React.ReactNode;
}

const DescriptionWrapper: React.SFC<IProps> = ({ children }) => (
  <Wrapper className="DescriptionWrapper">
    {children}
  </Wrapper>
);

export default DescriptionWrapper;