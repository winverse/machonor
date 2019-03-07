import * as React from 'react';
import styled from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import oc from 'open-color';

const Wrapper = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 5px;
  width: 100%;
  ${shadow(0)};
  @media ${media.xxMobile} {
    padding: 0.5rem;
  }
`;

const Box = styled.div`
  width: 100%;
  & + & {
    margin-top: 2rem;
  }
`;

const Text = styled.div`
  font-size: 0.95rem;
  color: ${oc.gray[5]};
  font-weight: 500;
  margin-bottom: 0.6rem;
`;

const Number = styled.span`
  font-size: 1.9rem;
  color: ${oc.gray[7]};
  letter-spacing: 0px;
  font-weight: 600;
`;

const Unit = styled.span`
  color: ${oc.gray[7]};
  font-size: 0.8rem;
  margin-left: 0.1rem;
`;

interface IProps {
  
}

const PostState: React.SFC<IProps> = () => (
  <Wrapper className="PostState">
    <Box>
      <Text>모인금액</Text>
      <Number>999,990,000</Number><Unit>원</Unit>
    </Box>
    <Box>
      <Text>구매자</Text>
      <Number>213,223</Number><Unit>명</Unit>
    </Box>
  </Wrapper>
);

export default PostState;