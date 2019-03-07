import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  height: 2px;
  background-color: ${oc.gray[3]};
  margin-top: 1rem;
`;

interface IProps {

}

const Line: React.SFC<IProps> = () => (
  <Wrapper className="Line" />
);

export default Line;